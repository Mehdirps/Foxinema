import React from 'react';
import CategorySelect from '../components/allMedias/CategorySelect';
import axios from 'axios';
import { useState } from 'react';
import FavoriteMedias from '../components/allMedias/FavoriteMedias';
import MediasList from '../components/allMedias/MediasList';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AllMedias = (props) => {
    const user = useSelector((state) => state.user.value)
    const [mediaList, setMediaList] = useState([]);
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const mediaType = props.mediaType;

    useEffect(() => {
        if (!category) {

            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL + mediaType}`,
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.jwt
                }
            }).then((res) => {
                setMediaList(res.data);
            })
        }
    }, [category, mediaType])

    const getMedias = (id) => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}category/${id}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.jwt
            }
        }).then((res) => {
            setMediaList(mediaList === 'serie' ? res.data.series : mediaType === 'movie' ? res.data.movies : '');
            setCategory(res.data.name);
            setCategoryId(res.data._id);
        })
    }
    return (
        <section className='all-medias'>
            <h1><span className='name'>{user.userName}</span>, voici tous les films <span className='name'>{category}</span> !</h1>
            <CategorySelect getMedias={getMedias} mediaType={mediaType} />
            <FavoriteMedias category={category} categoryId={categoryId} mediaType={mediaType} />
            <MediasList medias={mediaList} mediaType={mediaType} />
        </section>
    );
};

export default AllMedias;