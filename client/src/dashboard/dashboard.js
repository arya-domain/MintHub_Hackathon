import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import bg from './assets/bg.svg'

export const Dash = () => {
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
        <div className="bg-black " >
            <div className='relative hover:bg-black w-screen h-screen my-2'>
                <h1 className='italic subpixel-antialiased my-2 bg-gradient-to-l from-purple-500 to-black  text-white w-1/2 text-5xl flex items-center justify-center text-center  h-screen font-extrabold '>
                    Haven't Joined Us Yet ? <br /> Register Now !! <br />
                </h1>
                <a href='/register'>
                    <button className='text-white absolute top-1/2 left-2/3  rounded-lg text-6xl  hover:bg-gradient-to-r from-black via-purple-500 to-black  hover:scale-110 font-extrabold'>
                        Register
                    </button>
                </a>
            </div>
            <div className='text-white bg-gradient-to-r from-black via-purple-500 to-black p-4 '>
                {articles.length > 0 && (
                    <div className="d-flex justify-content-center align-items-center h-screen ">
                        <Card style={{ width: '900px', height: '600px' }} className='text-white bg-purple-800 border-1 border-black shadow-2xl shadow-black bg-opacity-10'>
                            <Card.Img variant="top" src={articles[activeIndex].image_url} />
                            <h1 className="text-center text-black font-bold text-4xl  ">Latest News</h1>
                            <Card.Body>
                                <Card.Title className='font-bold text-2xl'>{articles[activeIndex].title}</Card.Title>
                                <Card.Text className='ease-in-out delay-200 text-lg'>
                                    {limitContent(articles[activeIndex].content)}
                                </Card.Text>
                                <Button variant="primary" href={articles[activeIndex].url} target="_blank" className='bg-black border-none my-1' >Read More</Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-gray-800 font-bold pl-40 ml-40 text-xl ">
                                    {new Date(articles[activeIndex].published_at).toLocaleString()}
                                </small>
                            </Card.Footer>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

