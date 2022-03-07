import '../styles/Banner.css'
import {useEffect, useState} from "react"
import requests from '../API/request'
import axios from "../API/axios";

const Banner = () => {
    const base_url='https://image.tmdb.org/t/p/original/'
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async ()=>{
        const response = await axios.get(requests.fetchNetflixOriginals)
        setMovie(response.data.results[Math.floor(Math.random() * response.data.results.length - 1)])
    }


    const truncate = (str, maxLength)=>{
        return str?.length > maxLength ? str.substring(0, maxLength) + '...' : str
    }

    return (
        <header className='banner' style={{
            backgroundImage: `url(${base_url}${movie?.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        }}>
            <div className='banner_contents'>
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My List</button>
                </div>

                <h1 className="banner_description">
                    {truncate(movie?.overview, 100)}
                </h1>
            </div>

            <div className="banner_fadeBottom" />

        </header>
    );
};

export default Banner;
