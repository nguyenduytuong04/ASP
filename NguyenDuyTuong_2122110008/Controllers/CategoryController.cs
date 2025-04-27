using NguyenDuyTuong_2122110008.Data;
using NguyenDuyTuong_2122110008.DTOs.Category;
using NguyenDuyTuong_2122110008.Mapper;
using NguyenDuyTuong_2122110008.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace NguyenDuyTuong_2122110008.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAll()
        {
            return await _context.Categories
                .Include(c => c.Products)
                .ToListAsync();
        }

        // GET: api/category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetById(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return NotFound();

            return category;
        }

        // POST: api/category
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CategoryCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = CategoryMapper.ToCategory(dto);
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok(category);
        }

        // PUT: api/category/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] CategoryUpdateDTO dto)
        {
            if (id != dto.Id)
                return BadRequest("ID không khớp.");

            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            CategoryMapper.UpdateCategory(category, dto);
            await _context.SaveChangesAsync();

            return Ok(category);
        }

        // DELETE: api/category/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xoá thành công." });
        }
    }
}
