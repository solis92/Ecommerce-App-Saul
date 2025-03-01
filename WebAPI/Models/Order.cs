using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Order
    {
        [Key]
        [Column("IdOrden")]
        public int IdOrden { get; set; }
        [Column("IdUsuario")]
        public int IdUsuario { get; set; }
        [Column("Total")]
        public decimal Total { get; set; }
    }
}
