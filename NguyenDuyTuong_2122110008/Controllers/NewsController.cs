using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NguyenDuyTuong_2122110008.Model; // nơi chứa class News
using NguyenDuyTuong_2122110008.Data;   // nơi chứa AppDbContext

namespace NguyenDuyTuong_2122110008.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NewsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/News
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetNews()
        {
            return await _context.News.ToListAsync();
        }

        // GET: api/News/5
        [HttpGet("{id}")]
        public async Task<ActionResult<News>> GetNews(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null) return NotFound();
            return news;
        }

        // POST: api/News
        [HttpPost]
        public async Task<ActionResult<News>> PostNews(News news)
        {
            news.CreatedAt = DateTime.Now;
            _context.News.Add(news);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNews), new { id = news.Id }, news);
        }

        // PUT: api/News/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNews(int id, News news)
        {
            if (id != news.Id) return BadRequest();
            _context.Entry(news).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/News/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null) return NotFound();
            _context.News.Remove(news);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
