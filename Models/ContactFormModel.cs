using System.ComponentModel.DataAnnotations;

namespace EvolutionTechnology.Models;

public class ContactFormModel
{
    [Required(ErrorMessage = "Full name is required.")]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Organization is required.")]
    [MaxLength(150)]
    public string Organization { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email address is required.")]
    [EmailAddress(ErrorMessage = "A valid email address is required.")]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Phone(ErrorMessage = "Invalid phone number format.")]
    [MaxLength(30)]
    public string? Phone { get; set; }

    [Required(ErrorMessage = "Subject is required.")]
    [MaxLength(200)]
    public string Subject { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please select a project type.")]
    public string ProjectType { get; set; } = string.Empty;

    [Required(ErrorMessage = "Message is required.")]
    [MinLength(20, ErrorMessage = "Message must be at least 20 characters.")]
    [MaxLength(2000)]
    public string Message { get; set; } = string.Empty;
}

public class ContactFormModelAr
{
    [Required(ErrorMessage = "الاسم الكامل مطلوب.")]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "اسم المنظمة مطلوب.")]
    [MaxLength(150)]
    public string Organization { get; set; } = string.Empty;

    [Required(ErrorMessage = "البريد الإلكتروني مطلوب.")]
    [EmailAddress(ErrorMessage = "يرجى إدخال عنوان بريد إلكتروني صحيح.")]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Phone(ErrorMessage = "صيغة رقم الهاتف غير صحيحة.")]
    [MaxLength(30)]
    public string? Phone { get; set; }

    [Required(ErrorMessage = "الموضوع مطلوب.")]
    [MaxLength(200)]
    public string Subject { get; set; } = string.Empty;

    [Required(ErrorMessage = "يرجى تحديد نوع المشروع.")]
    public string ProjectType { get; set; } = string.Empty;

    [Required(ErrorMessage = "الرسالة مطلوبة.")]
    [MinLength(20, ErrorMessage = "يجب أن تحتوي الرسالة على 20 حرفاً على الأقل.")]
    [MaxLength(2000)]
    public string Message { get; set; } = string.Empty;
}
