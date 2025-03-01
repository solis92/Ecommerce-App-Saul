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
    public class DetailsController : ControllerBase
    {
        private readonly DBContext _dbContext;
        public DetailsController(DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetails(int id)
        {
            var lista = await _dbContext.OrderDetails.FromSqlInterpolated($"exec [dbo].[GetOrderDetails] {id};").ToListAsync();
            return StatusCode(StatusCodes.Status200OK, new { value = lista });
        }

        [HttpPost]
        [Route("CreateOrderDetail")]
        public async Task<IActionResult> CreateOrderDetail(OrderDetail orderDetails)
        {
            var detail = await _dbContext.OrderDetails.FromSqlInterpolated($"exec [dbo].[InsertOrderDetail] {orderDetails.IdOrden},{orderDetails.IdProducto},{orderDetails.Cantidad},{orderDetails.Costo},{orderDetails.SubTotal};").ToListAsync();
            return StatusCode(StatusCodes.Status200OK, new { value = detail });
        }

        
    }
}
