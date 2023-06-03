/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import MediaFigure from '../media/MediaFigure';
import { useSelector } from 'react-redux';

const FavoriteMedias = (props) => {
    const mediaName = props.medias;

    const medias = useSelector((state) => mediaName === 'serie' ? state.medias.favoriteSerieList : mediaName === 'movie' ? state.medias.favoriteMovieList : '')

    return (
        <section className="carroussel">
            {
                medias ?
                    medias.length > 0
                        ? medias.map((media, id) =>
                            <MediaFigure key={id} media={media} mediaType={mediaName} />
                        )
                        : mediaName === 'movie' ? <p className='empty-list'>Tu n'as aucuns films dans ta listes. Clique ici si tu souhaites en ajouter !</p>
                            // TODO AJouter lien quand page movie faite
                            : mediaName === 'serie' ? <p className='empty-list'>Tu n'as aucunes séries dans ta listes. Clique ici si tu souhaites en ajouter !</p>
                                : ''
                    : ''
            }
        </section >
    );
};

export default FavoriteMedias;