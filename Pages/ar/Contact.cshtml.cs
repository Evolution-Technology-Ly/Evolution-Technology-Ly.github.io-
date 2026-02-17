using EvolutionTechnology.Models;
using EvolutionTechnology.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace EvolutionTechnology.Pages.Ar;

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
        new SelectListItem("— اختر فئة —",                         ""),
        new SelectListItem("هندسة الأنظمة والبنية التحتية",         "System Architecture & Engineering"),
        new SelectListItem("تطوير الأنظمة المؤسسية",               "Enterprise System Development"),
        new SelectListItem("تحديث الأنظمة والتكامل",               "System Modernization & Integration"),
        new SelectListItem("الاستشارات التقنية والتدقيق",           "Technical Consulting & Auditing"),
        new SelectListItem("استفسار عام",                           "General Inquiry"),
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
