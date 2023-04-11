import { Card, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const News = () => {
    const [articles, setArticles] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                'https://data.messari.io/api/v1/news'
            );
            setArticles(response.data.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex => (activeIndex + 1) % articles.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [articles.length]);

    const limitContent = content => {
        const words = content.split(' ');
        if (words.length > 160) {
            return words.slice(0, 160).join(' ') + '...';
        } else {
            return content;
        }
    };
    return (
        <div className='p-4 text-white bg-gradient-to-r from-black via-purple-500 to-black '>
                {articles.length > 0 && (
                    <div className="d-flex justify-content-center align-items-center ">
                        <Card style={{ width: '900px', height: '600px' }} className='text-white bg-purple-800 border-black shadow-2xl border-1 shadow-black bg-opacity-10'>
                            <Card.Img variant="top" src={articles[activeIndex].image_url} />
                            <h1 className="text-4xl font-bold text-center text-black ">Latest News</h1>
                            <Card.Body>
                                <Card.Title className='text-2xl font-bold'>{articles[activeIndex].title}</Card.Title>
                                <Card.Text className='text-lg ease-in-out delay-200'>
                                    {limitContent(articles[activeIndex].content)}
                                </Card.Text>
                                <Button variant="primary" href={articles[activeIndex].url} target="_blank" className='my-1 bg-black border-none' >Read More</Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="pl-40 ml-40 text-xl font-bold text-gray-800 ">
                                    {new Date(articles[activeIndex].published_at).toLocaleString()}
                                </small>
                            </Card.Footer>
                        </Card>
                    </div>
                )}
            </div>
        
    )
}