using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Custom;
using WebAPI.Models;
using WebAPI.Models.DTOs;
using Microsoft.AspNetCore.Authorization;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly DBContext _dbContext;
        private readonly Utilities _utilities;
        public AccessController(DBContext dbContext, Utilities utilities)
        {
            _dbContext = dbContext;
            _utilities = utilities;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(UserDTO objeto)
        {

            var modeloUsuario = new User
            {
               Nombre = objeto.Nombre,
               Correo = objeto.Correo,
               Clave = _utilities.encryptSHA256(objeto.Clave)
            };

            await _dbContext.Usuarios.AddAsync(modeloUsuario);
            await _dbContext.SaveChangesAsync();

            if(modeloUsuario.IdUsuario != 0) 
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
            else
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDTO objeto)
        {
            var usuarioEncontrado = await _dbContext.Usuarios
                                                    .Where(u => 
                                                        u.Correo == objeto.Correo &&
                                                        u.Clave == _utilities.encryptSHA256(objeto.Clave)
                                                      ).FirstOrDefaultAsync();

            if (usuarioEncontrado == null)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            else
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _utilities.createJWT(usuarioEncontrado)});
        }
    }
}
