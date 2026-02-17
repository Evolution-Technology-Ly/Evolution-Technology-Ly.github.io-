using EvolutionTechnology.Models;
using EvolutionTechnology.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace EvolutionTechnology.Pages.En;

public class ContactModel : PageModel
{
    private readonly IEmailService _emailService;

    public ContactModel(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [BindProperty]
    public ContactFormModel ContactForm { get; set; } = new();

    public bool SubmitSuccess { get; private set; }

    public List<SelectListItem> ProjectTypes { get; } =
    [
        new SelectListItem("— Select a category —",              ""),
        new SelectListItem("System Architecture & Engineering",    "System Architecture & Engineering"),
        new SelectListItem("Enterprise System Development",        "Enterprise System Development"),
        new SelectListItem("System Modernization & Integration",   "System Modernization & Integration"),
        new SelectListItem("Technical Consulting & Auditing",      "Technical Consulting & Auditing"),
        new SelectListItem("General Inquiry",                      "General Inquiry"),
    ];

    public void OnGet() { }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
            return Page();

        await _emailService.SendContactInquiryAsync(ContactForm);

        SubmitSuccess = true;
        ModelState.Clear();
        ContactForm = new ContactFormModel();

        return Page();
    }
}
