import React from 'react';
import FavoriteMedias from './FavoriteMedias';
import PopularMovies from './PopularMedias';
import { Icon } from '@iconify/react';

const Medias = (props) => {

    return (
        <section className='movies-home-container'>
            <h2><Icon icon="game-icons:fox-tail" className='fox' />{props.series ? 'Tes séries favorites !' : props.movies ? 'Tes films favoris' : ''}<Icon icon="game-icons:fox-tail" className='right-fox fox' /></h2>
            <FavoriteMedias medias={props.series ? 'serie' : props.movies ? 'movie' : ''} />
            <PopularMovies medias={props.series ? 'serie' : props.movies ? 'movie' : ''} />
        </section>
    );
};

export default Medias;