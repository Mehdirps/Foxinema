/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import MediaFigure from '../media/MediaFigure';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const FavoriteMedias = (props) => {
    const mediaName = props.medias;

    const medias = useSelector((state) => mediaName === 'serie' ? state.medias.favoriteSerieList : mediaName === 'movie' ? state.medias.favoriteMovieList : '')
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
                    slidesToShow: 1,
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
        <section className="carrousel_container">
            <Slider {...settings} className='media_carrousel'>
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
            </Slider>
        </section>
    );
};

export default FavoriteMedias;