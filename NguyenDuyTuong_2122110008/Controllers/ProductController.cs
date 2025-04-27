using NguyenDuyTuong_2122110008.Model;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using NguyenDuyTuong_2122110008.Data;
    using NguyenDuyTuong_2122110008.DTOs.Product;
    using NguyenDuyTuong_2122110008.Mapper;
using Microsoft.AspNetCore.Authorization;

    namespace NguyenDuyTuong_2122110008.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class ProductController : ControllerBase
        {
            private readonly AppDbContext _context;

            public ProductController(AppDbContext context)
            {
                _context = context;
            } 

            // GET: api/product
            [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
            {
                var products = await _context.Products
                                             .Include(p => p.Category)
                                             .ToListAsync();
                return Ok(products);
            }

            // GET: api/product/5
            [HttpGet("{id}")]
            public async Task<ActionResult<Product>> GetById(int id)
            {
                var product = await _context.Products
                                            .Include(p => p.Category)
                                            .FirstOrDefaultAsync(p => p.Id == id);

                if (product == null)
                    return NotFound();

                return Ok(product);
            }

        // POST: api/product
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Product>> Create([FromForm] ProductCreateDTO productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Xử lý file ảnh
            if (productDto.Image != null && productDto.Image.Length > 0)
            {
                // Đặt tên file ảnh (có thể thay đổi theo yêu cầu)
                var fileName = Path.GetFileNameWithoutExtension(productDto.Image.FileName);
                var extension = Path.GetExtension(productDto.Image.FileName);
                var newFileName = $"{Guid.NewGuid()}{extension}";

                // Đường dẫn lưu ảnh
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", newFileName);

                // Lưu ảnh vào thư mục
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await productDto.Image.CopyToAsync(stream);
                }

                // Gán đường dẫn ảnh vào thuộc tính imageUrl trong sản phẩm
                productDto.ImageUrl = $"/images/{newFileName}";
            }

            // Dùng mapper để chuyển DTO thành entity
            var product = ProductMapper.ToProduct(productDto);

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }
        // GET: api/product/category/5
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategoryId(int categoryId)
        {
            var products = await _context.Products
                                         .Include(p => p.Category)
                                         .Where(p => p.CategoryId == categoryId)
                                         .ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm thuộc danh mục này." });
            }

            return Ok(products);
        }


        // PUT: api/product/5
        [HttpPut("{id}")]

        public async Task<ActionResult<Product>> Update(int id, [FromForm] ProductUpdateDTO productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound("Sản phẩm không tồn tại.");
            }

            // Xử lý ảnh mới nếu có
            if (productDto.Image != null && productDto.Image.Length > 0)
            {
                // Xóa ảnh cũ nếu tồn tại
                if (!string.IsNullOrEmpty(existingProduct.ImageUrl))
                {
                    var oldPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", existingProduct.ImageUrl.TrimStart('/'));
                    if (System.IO.File.Exists(oldPath))
                    {
                        System.IO.File.Delete(oldPath);
                    }
                }

                var extension = Path.GetExtension(productDto.Image.FileName);
                var newFileName = $"{Guid.NewGuid()}{extension}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", newFileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await productDto.Image.CopyToAsync(stream);
                }

                productDto.ImageUrl = $"/images/{newFileName}";
            }
            else
            {
                // Không thay đổi ảnh
                productDto.ImageUrl = existingProduct.ImageUrl;
            }

            // Cập nhật thông tin
            existingProduct.Name = productDto.Name;
            existingProduct.Description = productDto.Description;
            existingProduct.Price = productDto.Price;
            existingProduct.StockQuantity = productDto.StockQuantity;
            existingProduct.Brand = productDto.Brand;
            existingProduct.IsAvailable = productDto.IsAvailable;
            existingProduct.Rating = productDto.Rating;
            existingProduct.UserUpdate = productDto.UserUpdate;
            existingProduct.CategoryId = productDto.CategoryId;
            existingProduct.ImageUrl = productDto.ImageUrl;

            await _context.SaveChangesAsync();

            return Ok(existingProduct);
        }

        // DELETE: api/product/5?userDelete=admin
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                    return NotFound();

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Đã xoá sản phẩm." });
            }
        }
    }
