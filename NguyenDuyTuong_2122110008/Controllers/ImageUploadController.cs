using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;


namespace NguyenDuyTuong_2122110008.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        private readonly string _imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

        public ImageUploadController()
        {
            // Tạo thư mục images nếu nó không tồn tại
            if (!Directory.Exists(_imageFolderPath))
            {
                Directory.CreateDirectory(_imageFolderPath);
            }
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            // Kiểm tra xem file có hợp lệ hay không
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // Kiểm tra loại file là ảnh
            if (!file.ContentType.StartsWith("image"))
                return BadRequest("File is not an image.");

            // Tạo tên file duy nhất để tránh trùng
            var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_imageFolderPath, fileName);

            // Lưu file vào thư mục
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Trả về đường dẫn ảnh
            var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{fileName}";
            return Ok(new { FilePath = imageUrl });
        }
    }
}
