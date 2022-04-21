import '../styles/Row.css'
import {useState, useEffect} from "react";
import axios from "../API/axios"

const Row = ({title, fetchURL, isLargeRow=false}) => {
    const base_url='https://image.tmdb.org/t/p/original/'

    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchData()
    }, [fetchURL]);

    const fetchData = async ()=>{
        const response = await axios.get(fetchURL)
        response.status = 200 && setMovies(response.data.results)
        return response
    }


    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row_posters">
                {
                    movies.map(movie => (
                        (isLargeRow && movie.poster_path ||
                            !isLargeRow && movie.backdrop_path) && (
                            <img
                                key={movie?.id}
                                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                                src={`${base_url}${isLargeRow? movie.poster_path :
                                    movie.backdrop_path}`}
                                alt={movie?.name}
                            />
                        )

                    ))
                }
            </div>

        </div>
    );
};

export default Row;
