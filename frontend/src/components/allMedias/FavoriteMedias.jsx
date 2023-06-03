import React from 'react';
import { useSelector } from 'react-redux';
import Media from '../media/MediaFigure';

const FavoriteMovies = (props) => {
    const user = useSelector((state) => state.user.value);
    const category = props.category;
    const mediaType = props.mediaType;
    const mediaList = mediaType === 'movie' ? user.followedMovies : mediaType === 'serie' ? user.followedSeries : '';
    // TODO Voir pour afficher message quand liste vide
    return (
        <section className='favorite-movies'>
            <h2>Tes {mediaType === 'movie' ? 'films favoris' : mediaType === 'serie' ? 'séries favorites' : ''}</h2>
            <section className="carroussel">
                {
                    mediaList ?
                        mediaList.length > 0
                            ? mediaList.map((media, id) =>
                                category ?
                                    media.categories ?
                                        media.categories.includes(props.categoryId)
                                            ?
                                            <Media key={id} media={media} mediaType={mediaType} />
                                            : ""
                                        : ""
                                    :
                                    <Media key={id} media={media} mediaType={mediaType} />
                            )
                            : ''
                        : ''
                }
            </section >
        </section >
    );
};

export default FavoriteMovies;