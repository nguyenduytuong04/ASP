using System.ComponentModel.DataAnnotations;

namespace NguyenDuyTuong_2122110008.DTOs.Category
{
    public class CategoryCreateDTO
    {
        [Required]
        public string Name { get; set; }

        //public string UserCreate { get; set; }
    }
}
