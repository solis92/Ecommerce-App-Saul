using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class OrderDetail
    {
        [Key]
        [Column("IdOrdenDetalle")]
        public int IdOrdenDetalle { get; set; }
        [Column("IdOrden")]
        public int IdOrden { get; set; }
        [Column("IdProducto")]
        public int IdProducto { get; set; }
        [Column("Cantidad")]
        public int Cantidad { get; set; }
        [Column("Costo")]
        public decimal Costo { get; set; }
        [Column("SubTotal")]
        public decimal SubTotal { get; set; }
    }
}
