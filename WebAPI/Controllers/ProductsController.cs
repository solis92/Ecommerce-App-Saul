using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DBContext _dbContext;
        public ProductsController(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAll()
        {
            var lista = await _dbContext.Productos.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, new { value = lista });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            Product lista = await _dbContext.Productos.FirstOrDefaultAsync(x => x.IdProducto == id);
            return StatusCode(StatusCodes.Status200OK, new { value = lista });
        }

    }
}
