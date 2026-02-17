using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EvolutionTechnology.Pages;

public class IndexModel : PageModel
{
    public IActionResult OnGet() => RedirectPermanent("/en");
}
