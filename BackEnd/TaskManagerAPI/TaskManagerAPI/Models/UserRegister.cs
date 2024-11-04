using System.ComponentModel.DataAnnotations;
using TaskManagerAPI.DTOs;

namespace TaskManagerAPI.Models
{
    public class UserRegister
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public UserRole Roles { get; set; }
    }


   
}
