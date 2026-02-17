using EvolutionTechnology.Models;

namespace EvolutionTechnology.Services;

public interface IEmailService
{
    Task<bool> SendContactInquiryAsync(ContactFormModel form);
}
