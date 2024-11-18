using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegisterController : ControllerBase
    {
        private TaskContext _taskContext;
        private IConfiguration _configuration;

        public UserRegisterController(TaskContext taskContext , IConfiguration configuration)
        {
            _taskContext = taskContext;
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> AddUserRegistration(UserRegisterDTO userRegisterDTO)
        {            
            var Req = new UserRegister
            {
                FullName = userRegisterDTO.FullName,
                Email = userRegisterDTO.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userRegisterDTO.Password),
                Roles = userRegisterDTO.Roles,
            };
            var data = await _taskContext.UsersRegister.AddAsync(Req);

            await _taskContext.SaveChangesAsync();
            
            var res = new UserRegisterDTO
            {
                Id = data.Entity.Id,
                FullName = data.Entity.FullName,
                Email = data.Entity.Email,
                Roles = data.Entity.Roles,
            };
            var token = CreateToken(data.Entity);

            return Ok(token);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> AddLogIn(Login login)
        {
            try
            {
                var user = await _taskContext.UsersRegister.FirstOrDefaultAsync(u => u.Email == login.Email); 
                var password = BCrypt.Net.BCrypt.Verify(login.Password , user.PasswordHash);
                if (password)
                {
                    var token = CreateToken(user);
                    return Ok(token);
                }
                else
                {
                    return BadRequest("User is Not Found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
       public async Task<string> Test()
        {
            var data = User.FindFirst("Roles").Value;

            return data;
        } 

        protected TokenModel CreateToken(UserRegister userRegister) 
        {
            var claimList = new List<Claim>();
            claimList.Add(new Claim("Id", userRegister.Id.ToString()));
            claimList.Add(new Claim("FullName", userRegister.FullName));
            claimList.Add(new Claim("Email", userRegister.Email));
            claimList.Add(new Claim("PasswordHash", userRegister.PasswordHash));
            claimList.Add(new Claim("Roles", userRegister.Roles.ToString()));

            var Key = _configuration["Jwt:Key"];
            var secKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
            var credentials = new SigningCredentials(secKey, SecurityAlgorithms.HmacSha256);

            var togen = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claimList,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: credentials
                );

            var res = new TokenModel();
            res.Token = new JwtSecurityTokenHandler().WriteToken(togen);
            return res;

        }


    }
}
