/* eslint-disable jsx-a11y/no-access-key */
import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addUser } from '../../stores/UserSlice';
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ChoiceMovies = () => {
    const [movieList, setMovieList] = useState([]);
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}movie/choiceMovie`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((res) => {
            setMovieList(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }, [setMovieList, user]);

    const followMovie = (e) => {
        const movieId = e.target.accessKey;
        const userId = user._id;

        if (user.followedMovies.includes(movieId)) {
            axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_URL}user/unfollowMovie/${userId}`,
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                data: {
                    idToUnfollowMedia: movieId
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
            url: `${process.env.REACT_APP_API_URL}user/followMovie/${userId}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: {
                idToFollowMedia: movieId
            }
        }).then((res) => {
            dispatch(addUser(res.data));
        }).catch((err) => {
            console.log(err)
        })
    }

    const skip = (e) => {
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
            <h1>Bienvenue <span className='name'>{user.userName}</span>, tu peux maintenant choisir tes films préférés parmis ces
                quelques films</h1>
            <section className="carroussel">
                {
                    user.followedMovies
                        ?
                        movieList.map((movie, id) =>
                            movie.active ?
                                user.age >= movie.ageRequired ?
                                    <figure className={user.followedMovies.includes(movie._id) ? 'selected' : 'image'} key={id} onClick={followMovie} >
                                        <img src={`${process.env.REACT_APP_API_URL + movie.banner}`} alt={`Affiche du film ${movie.name}`} accessKey=
                                            {movie._id} />
                                    </figure>
                                    : ''
                                : ''
                        )
                        : ''
                }
            </section>
            <div className="links">
                <NavLink exact="true" to="/choix-des-series" className='button'>Suivant</NavLink>
                <NavLink exact="true" to="/accueil" className='skip' onClick={skip}>Passer le choix des films et séries <FontAwesomeIcon icon={faArrowRight} />
                </NavLink>
            </div>
        </div >
    );
};

export default ChoiceMovies;