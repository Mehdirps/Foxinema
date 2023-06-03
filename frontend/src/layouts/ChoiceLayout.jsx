import React from 'react';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { addUser } from '../stores/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChoiceLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value)
    
    useEffect(() => {
        if (!localStorage.jwt) {
            navigate('/')
            return;
        }

        if (user.firstLogin === false) {
            navigate('/accueil');
            return;
        }
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}jwtid`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.jwt,
            }
        })
            .then((res) => {
                dispatch(addUser(res.data));
            })
            .catch((err) => console.log('No Token' + err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, navigate, user])
    return (
        <section className="main">
            <section className="choice-container">
                <figure className="logo">
                    <img src="./Banniere-Foxinema2-600.png" alt="Logo de l'application Foxinema" />
                </figure>
                <Outlet />
            </section>
        </section >
    );
};

export default ChoiceLayout;