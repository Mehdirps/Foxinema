import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Medias from '../components/home/Medias';
import { useDispatch } from 'react-redux';
import { setFavoriteMovieList, setFavoriteSerieList } from '../stores/home/MediasSlice';

const Home = () => {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFavoriteMovieList(user.followedMovies));
        dispatch(setFavoriteSerieList(user.followedSeries));
    })
    return (
        <section className='home'>
            <h1>Bonjour <span className='name'>{user.userName}</span> ! Discute ici avec des passionnés sur tes films et séries préférés</h1>
            <div className="buttons-container">
                <NavLink exact="true" to={'/films'} className='button'>Films</NavLink>
                <NavLink exact="true" to={'/series'} className='button'>Séries</NavLink>
            </div>
            {
                user.followedSeries ? <Medias series={true} /> : ''
            }
            {
                user.followedMovies ? <Medias movies={true} /> : ''
            }
        </section>
    );
};

export default Home;