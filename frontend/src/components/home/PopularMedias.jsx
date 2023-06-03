import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MediaFigure from '../media/MediaFigure' // TODO Faire la suite avec movieFigure et details

const PopularMedias = (props) => {
    const [mediaList, setMediaList] = useState('');

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL + props.medias}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((res) => {
            setMediaList(res.data)
        })
    }, [setMediaList, props.medias])
    return (
        <section className="popular-container">
            <h3>Les {props.medias === 'serie' ? 'series' : props.medias === 'movie' ? 'films' : ''} les plus polupaires</h3>
            <section className="container">
                {
                    mediaList ?
                        mediaList.slice(0, 9).map((media, id) =>
                            <MediaFigure key={id} media={media} mediaType={props.medias} />

                        )
                        : ""
                }
            </section>
        </section >
    );
};

export default PopularMedias;