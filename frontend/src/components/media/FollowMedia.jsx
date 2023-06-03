import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../stores/UserSlice';
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';

const FollowMovie = (props) => {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();
    const [follow, setFollow] = useState(false);
    const idList = useMemo(() => [], []);
    const mediaType = props.mediaType;
    const followedMedia = mediaType === 'movie' ? user.followedMovies : mediaType === 'serie' ? user.followedSeries : '';
    const requestMediaType = mediaType === 'movie' ? 'Movie' : mediaType === 'serie' ? 'Serie' : '';

    if (followedMedia) {
        followedMedia.map((media) =>
            idList.push(media._id)
        )
    }

    useEffect(() => {
        const bool = idList.includes(props.id);
        setFollow(bool)
    }, [idList, props.id])

    function handleFollow(id) {
        if (follow) {
            axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_URL}user/unfollow${requestMediaType}/${user._id}`,
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                data: {
                    idToUnfollowMedia: id
                }
            }).then((res) => {
                dispatch(addUser(res.data));
                setFollow(false)
            }).catch((err) => {
                console.log(err)
            })
            return;
        }

        axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API_URL}user/follow${requestMediaType}/${user._id}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: {
                idToFollowMedia: id
            }
        }).then((res) => {
            dispatch(addUser(res.data));
            setFollow(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            {
                followedMedia ?
                    <div className='follow' onClick={() => handleFollow(props.id)} >
                        <FontAwesomeIcon icon={faHeart} className={follow ? 'active-heart' : 'heart'} />
                    </div>
                    : ""
            }
        </>
    );
};

export default FollowMovie;