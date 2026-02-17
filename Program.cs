using EvolutionTechnology.Services;

var builder = WebApplication.CreateBuilder(args);

// ── Razor Pages ────────────────────────────────────────────────────────────────
builder.Services.AddRazorPages();

// ── Application services ───────────────────────────────────────────────────────
builder.Services.AddTransient<IEmailService, EmailService>();

// ── HSTS ──────────────────────────────────────────────────────────────────────
builder.Services.AddHsts(options =>
{
    options.Preload           = true;
    options.IncludeSubDomains = true;
    options.MaxAge            = TimeSpan.FromDays(365);
});

var app = builder.Build();

// ── Pipeline ───────────────────────────────────────────────────────────────────
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages().WithStaticAssets();

// Root redirect: / → /en
app.MapGet("/", () => Results.Redirect("/en", permanent: false));

app.Run();
