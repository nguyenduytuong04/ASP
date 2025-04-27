using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NguyenDuyTuong_2122110008.Model
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        //public string UserCreate { get; set; }

        [JsonIgnore]
        public List<Product> Products { get; set; }
    }

}
