/* eslint-disable jsx-a11y/no-access-key */
import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addUser } from '../../stores/UserSlice';
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';

const ChoiceSeries = () => {
    const [serieList, setSerieList] = useState([]);
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}serie/choiceSerie`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((res) => {
            setSerieList(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }, [setSerieList, user])

    const followSerie = (e) => {
        const serieId = e.target.accessKey;
        const userId = user._id;

        if (user.followedSeries.includes(serieId)) {
            axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_URL}user/unfollowSerie/${userId}`,
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                data: {
                    idToUnfollowMedia: serieId
                }
            }).then((res) => {
                dispatch(addUser(res.data));
            }).catch((err) => {
                console.log(err)
            })
            return;
        }

        axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API_URL}user/followSerie/${userId}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: {
                idToFollowMedia: serieId
            }
        }).then((res) => {
            dispatch(addUser(res.data));
        }).catch((err) => {
            console.log(err)
        })
    }
    const endChoice = (e) => {
        e.preventDefault();
        axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API_URL}user/${user._id}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: {
                firstLogin: false
            }
        }).then((res) => {
            dispatch(addUser(res.data));
            navigate('/accueil');
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <h1>Bienvenue <span className='name'>{user.userName}</span>, tu peux maintenant choisir tes séries préférées parmis ces quelques séries</h1>
            <section className="carroussel">
                {
                    user.followedSeries
                        ?
                        serieList.map((serie, id) =>
                            serie.active ?
                                user.age >= serie.ageRequired ?
                                    <figure className={user.followedSeries.includes(serie._id) ? 'selected' : 'image'} key={id} onClick={followSerie}>
                                        <img src={`${process.env.REACT_APP_API_URL + serie.banner}`} alt={`Affiche de la série ${serie.name}`} accessKey=
                                            {serie._id} />
                                    </figure>
                                    : ''
                                : ''
                        )
                        : ''
                }
            </section>
            <div className="links">
                <NavLink exact="true" to="/accueil" className='button' onClick={endChoice}>Terminer</NavLink>
            </div>
        </div>

    );
};

export default ChoiceSeries;