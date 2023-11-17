import React from 'react';
import { useSelector } from 'react-redux';
import Media from '../media/MediaFigure';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FavoriteMovies = (props) => {
    const user = useSelector((state) => state.user.value);
    const category = props.category;
    const mediaType = props.mediaType;
    const mediaList = mediaType === 'movie' ? user.followedMovies : mediaType === 'serie' ? user.followedSeries : '';
    // TODO Voir pour afficher message quand liste vide

    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1900,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1650,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1224,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className='favorite-movies'>
            <h2>Tes {mediaType === 'movie' ? 'films favoris' : mediaType === 'serie' ? 'séries favorites' : ''}</h2>
           <Slider {...settings} className='media_carrousel'>
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
             </Slider>
        </section >
    );
};

export default FavoriteMovies;