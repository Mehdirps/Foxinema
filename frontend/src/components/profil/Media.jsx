import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addUser } from '../../stores/UserSlice';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Media = (props) => {
    const media = props.media;
    const user = useSelector((state) => state.user.value);
    const mediaType = props.mediaType;
    const dispatch = useDispatch();

    const unFollowMedia = (e) => {
        const mediaId = e.target.attributes.media.value;
        axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API_URL}user/unfollow${mediaType === 'serie' ? 'Serie' : mediaType === 'movie' ? 'Movie' : ''}/${user._id}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: {
                idToUnfollowMedia: mediaId
            }
        }).then(() => {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}user/${user._id}`,
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then((res) => {
                dispatch(addUser(res.data));
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            {
                media.active ?
                    user.age >= media.ageRequired ?
                        <figure className="image">
                            <span className="trash" onClick={unFollowMedia} media={media._id}>&#10006;</span>
                            <NavLink exact="true" to={`/${mediaType === 'movie' ? 'film' : mediaType}/${media._id}`}>
                                <img src={`${process.env.REACT_APP_API_URL + media.banner}`} alt={`Affiche de la série ${media.name}`} />
                            </NavLink>
                        </figure>
                        : ""
                    : ""
            }
        </>
    );
};

export default Media;