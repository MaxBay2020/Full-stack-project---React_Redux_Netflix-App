import '../styles/HomeScreen.css'
import Navbar from "./Navbar";
import Banner from "./Banner";
import requests from "../API/request";
import Row from "./Row";

const HomeScreen = () => {
    return (
        <div className='homeScreen'>
            <Navbar />
            <Banner />
            <Row title='NETFLIX ORIGINAL' fetchURL={requests.fetchNetflixOriginals} isLargeRow/>
            <Row title='Trending Now' fetchURL={requests.fetchTrending}/>
            <Row title='Top Rated' fetchURL={requests.fetchTopRated}/>
            <Row title='Action Movies' fetchURL={requests.fetchActionMovies}/>
            <Row title='Comedy Movies' fetchURL={requests.fetchComedyMovies}/>
            <Row title='Horror Movies' fetchURL={requests.fetchHorrorMovies}/>
            <Row title='Romance Movies' fetchURL={requests.fetchRomanceMovies}/>
            <Row title='Documentaries' fetchURL={requests.fetchDocumentaries}/>

        </div>
    );
};

export default HomeScreen;
