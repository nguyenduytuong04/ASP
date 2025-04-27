using NguyenDuyTuong_2122110008.DTOs.Category;
using NguyenDuyTuong_2122110008.Model;

namespace NguyenDuyTuong_2122110008.Mapper
{
    public static class CategoryMapper
    {
        public static Category ToCategory(CategoryCreateDTO dto)
        {
            return new Category
            {
                Name = dto.Name,
                //UserCreate = dto.UserCreate
            };
        }

        public static void UpdateCategory(Category category, CategoryUpdateDTO dto)
        {
            category.Name = dto.Name;
        }
    }
}
