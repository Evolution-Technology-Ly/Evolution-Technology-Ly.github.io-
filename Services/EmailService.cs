using EvolutionTechnology.Models;
using System.Net;
using System.Net.Mail;

namespace EvolutionTechnology.Services;

public sealed class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task<bool> SendContactInquiryAsync(ContactFormModel form)
    {
        var smtpHost = _config["CompanySettings:SmtpHost"];
        var toAddress = _config["CompanySettings:Email"];

        // SMTP not configured — log and return true in development
        if (string.IsNullOrWhiteSpace(smtpHost) || string.IsNullOrWhiteSpace(toAddress))
        {
            _logger.LogInformation(
                "Contact inquiry received (SMTP not configured). From: {Name} <{Email}> | Org: {Org} | Subject: {Subject}",
                form.FullName, form.Email, form.Organization, form.Subject);
            return true;
        }

        try
        {
            var port = int.TryParse(_config["CompanySettings:SmtpPort"], out var p) ? p : 587;
            var fromAddress = _config["CompanySettings:SmtpFromAddress"] ?? toAddress;

            using var client = new SmtpClient(smtpHost, port)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(
                    _config["CompanySettings:SmtpUser"],
                    _config["CompanySettings:SmtpPassword"])
            };

            var body = $"""
                New contact inquiry received via evolutiontechnology.ly

                Name         : {form.FullName}
                Organization : {form.Organization}
                Email        : {form.Email}
                Phone        : {form.Phone ?? "—"}
                Project Type : {form.ProjectType}
                Subject      : {form.Subject}

                Message:
                {form.Message}
                """;

            var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = $"[Inquiry] {form.Subject} — {form.Organization}",
                Body = body,
                IsBodyHtml = false,
                ReplyToList = { new MailAddress(form.Email, form.FullName) }
            };

            await client.SendMailAsync(message);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact inquiry email from {Email}", form.Email);
            return false;
        }
    }
}
