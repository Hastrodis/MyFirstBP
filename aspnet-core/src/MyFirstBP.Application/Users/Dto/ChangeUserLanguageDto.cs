using System.ComponentModel.DataAnnotations;

namespace MyFirstBP.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}