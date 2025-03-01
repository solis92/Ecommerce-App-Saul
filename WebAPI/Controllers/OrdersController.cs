using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Models.DTOs;
using Microsoft.Data.SqlClient;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DBContext _dbContext;
        public OrdersController(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllOrders()
        {
            var lista = await _dbContext.Orders.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, new { value = lista });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            Order lista = await _dbContext.Orders.FirstOrDefaultAsync(x => x.IdOrden == id);
            return StatusCode(StatusCodes.Status200OK, new { value = lista });
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateOrders(Order order)
        {
            var orders = _dbContext.Orders.FromSqlInterpolated($"exec [dbo].[InsertOrder] {order.IdUsuario};").ToListAsync();
            return StatusCode(StatusCodes.Status200OK, new { value = order });
        }

        [HttpPatch]
        [Route("Update")]
        public IActionResult UpdateOrder(int id)
        {
            var order =  _dbContext.Orders.FromSqlInterpolated($"exec [dbo].[UpdateOrder] {id};").ToListAsync();
            return StatusCode(StatusCodes.Status200OK, new { value = order });
        }        
    }
}
