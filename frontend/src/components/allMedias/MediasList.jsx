import React from 'react';
import { useState } from 'react';
import Media from '../media/MediaFigure';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MediaList = (props) => {
    const medias = props.medias;
    const [listLength, setListLength] = useState(18)

    const showMore = () => {
        const more = listLength + 18;
        setListLength(more);
    }

    return (
        <section className="movies-container">
            <h2>Listes des {props.mediaType === 'serie' ? 'séries' : props.mediaType === 'movie' ? 'films' : ''} </h2>
            <section className='movies-list'>
                {
                    medias ?
                        medias.slice(0, listLength).map((media, id) =>
                            <Media media={media} key={id} mediaType={props.mediaType} />
                        )
                        : ''
                }
            </section>
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