using System.ComponentModel.DataAnnotations;

namespace NguyenDuyTuong_2122110008.DTOs.Category
{
    public class CategoryUpdateDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
