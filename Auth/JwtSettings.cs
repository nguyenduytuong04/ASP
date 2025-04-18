namespace NguyenDuyTuong_2122110008.Auth
{
    public class JwtSettings
    {
        public string SecretKey { get; set; } = "THIS_IS_A_SUPER_SECRET_KEY_1234567890_32";
        public string Issuer { get; set; } = "NguyenDuyTuong_2122110008App";
        public string Audience { get; set; } = "NguyenDuyTuong_2122110008Users";
        public int ExpirationMinutes { get; set; } = 60;
    }
}
