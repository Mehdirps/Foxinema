/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Serie = (props) => {
    const media = props.media;
    const mediaType = props.mediaType;
    const user = useSelector((state) => state.user.value)
    return (
        <>
            {
                media ?
                    media.active ?
                        user.age >= media.ageRequired ?
                            <NavLink exact="true" to={`/${mediaType === 'serie' ? mediaType : mediaType === 'movie' ? 'film' : ''}/${media._id}`}>
                                <figure className="image">
                                    <img src={`${process.env.REACT_APP_API_URL + media.banner}`} alt={`Image de la série ${media.name}`} />
                                </figure>
                            </NavLink>
                            : ""
                        : ""
                    : ""
            }
        </>
    );
};

export default Serie;