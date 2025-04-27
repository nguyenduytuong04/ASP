import React, { useEffect, useState } from 'react';
import NewsService from '../services/NewsService';
import { IMAGE_URL } from '../config'; // Nếu tin tức có ảnh

function NewsList() {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await NewsService.getAllNews();
            setNewsList(data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tin tức:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Danh Sách Tin Tức</h1>

            {newsList.length === 0 ? (
                <p>Không có tin tức nào.</p>
            ) : (
                newsList.map((news) => (
                    <div key={news.id} style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '16px'
                    }}>
                        {/* Nếu có ảnh */}
                        {news.imagePath && (
                            <img
                                src={`${IMAGE_URL}${news.imagePath}`}
                                alt={news.title}
                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                            />
                        )}

                        <h2>{news.title}</h2>
                        <p>{news.content}</p>
                        <p><small>Ngày đăng: {new Date(news.createdAt).toLocaleString()}</small></p>
                    </div>
                ))
            )}
        </div>
    );
}

export default NewsList;
