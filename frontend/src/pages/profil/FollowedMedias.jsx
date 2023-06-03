import React from 'react';
import { useSelector } from 'react-redux';
import Media from '../../components/profil/Media';
import { NavLink } from 'react-router-dom';

const FollowedMedias = (props) => {
    const user = useSelector((state) => state.user.value);
    const followedMedias = props.mediaType === 'movie' ? user.followedMovies : props.mediaType === 'serie' ? user.followedSeries : '';

    return (
        <section className="favorites-container">
            <h1><span className="name">{user.userName}</span>, voici tes {props.mediaType === 'movie' ? 'films préférés' : props.mediaType === 'serie' ? 'séries préférées' : ''} !</h1>
            <section className="container">
                {
                    followedMedias ?
                        followedMedias.length === 0
                            ?
                            props.mediaType === 'serie' ?
                                <p className='emptyList'>Tu n'as pas de séries dans tes favorites <br />Clique sur le lien pour aller voir les séries
                                    si tu souhaites en ajouter !
                                    <br />
                                    <NavLink exact="true" to='/series' className='link'> Voir toutes les séries</NavLink>
                                </p>
                                : props.mediaType === 'movie' ?
                                    <p className='emptyList'>Tu n'as pas de films dans tes favoris <br />Clique sur le lien pour aller voir les films
                                        si tu souhaites en ajouter !
                                        <br />
                                        <NavLink exact="true" to='/films' className='link'> Voir tous les films</NavLink>
                                    </p> : ''
                            : followedMedias.map((media, id) =>
                                <Media media={media} key={id} mediaType={props.mediaType} />
                            )
                        : ''
                }
            </section>
            {/* <a href="#" className="button">Voir tous les films</a> */}
            {/* TODO Mettre lien vers tous les films */}
        </section>
    );
};

export default FollowedMedias;