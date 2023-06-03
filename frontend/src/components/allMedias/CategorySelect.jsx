import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const CategorySelect = (props) => {

    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}category`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.jwt
            }
        }).then((res) => {
            setCategoryList(res.data)
        })
    }, [setCategoryList])

    return (
        <select name="categories" className='categories-select' id="cateogories" onChange={(e) => props.getMedias(e.target.value)}>
            <option value="" className='category all-movies'>{props.mediaType === 'movie' ? 'Tous les films' : props.mediaType === 'serie' ? 'Toutes les séries' : ''}</option>
            {
                categoryList.map((category, id) =>
                    <option value={category._id} key={id} className='category'>{category.name}</option>
                )
            }
        </select>
    );
};

export default CategorySelect;