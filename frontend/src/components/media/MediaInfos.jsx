import React from 'react';
import FollowMedia from './FollowMedia';
import MediaNote from './MediaNote';

const Synopsis = (props) => {
    const media = props.media;
    const releaseDate = new Date(media.releaseDate).toLocaleDateString('fr-FR');
    const mediaType = props.mediaType;
    return (
        <div className="infos-container">
            <FollowMedia id={media._id} mediaType={mediaType} />
            <figure className="image">
                <img src={`${process.env.REACT_APP_API_URL + media.banner}`} alt={`Affiche ${mediaType === 'serie' ? 'de la série' : mediaType === 'movie' ? 'du film' : ''} ${media.name}`} />
            </figure>
            <div className="infos">
                <h1 className="name">{media.name}</h1>
                <div className="details">
                    <MediaNote opinions={media.opinions} />
                    <p><span className='info-name'>Date de sortie :</span> {releaseDate}</p>
                    {
                        mediaType === 'movie' ?
                            <p><span className='info-name'>Durée :</span> {media.durable} min</p>
                            : ''
                    }
                    <p><span className='info-name'>Age requis :</span> {media.ageRequired} ans</p>
                    <div className="categories-container">
                        <p className='info-name'>Categories :</p>
                        <div className="category-list">
                            {
                                media.categories ?
                                    media.categories.map((category, id) =>
                                        <p key={id}>{category.name}</p>
                                    )
                                    : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="synopsis">
                <h2>Synopsis</h2>
                <div className="text">
                    <p>{media.synopsis}</p>
                </div>
            </div>
        </div>
    );
};

export default Synopsis;