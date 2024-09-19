import React from 'react';
import { useState } from 'react';
import Media from '../media/MediaFigure';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MediaList = (props) => {
    const medias = props.medias;
    const [listLength, setListLength] = useState(18)

    const showMore = () => {
        const more = listLength + 18;
        setListLength(more);
    }

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
        <section className="movies-container">
            <h2>Listes des {props.mediaType === 'serie' ? 'séries' : props.mediaType === 'movie' ? 'films' : ''} </h2>
            <Slider {...settings} className='media_carrousel'>
                {
                    medias ?
                        medias.slice(0, listLength).map((media, id) =>
                            <Media media={media} key={id} mediaType={props.mediaType} />
                        )
                        : ''
                }
            </Slider>
            {
                medias ?
                    medias.length > listLength ?
                        <FontAwesomeIcon icon={faPlus} className='more' onClick={showMore} />
                        : ''
                    : ''
            }
        </section>
    );
};

export default MediaList;