import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect } from 'react';
import axios from 'axios';
import { addUser } from '../stores/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.jwt) {
            navigate('/')
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
                axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_URL}user/${res.data._id}`,
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                    }
                }).then((res) => {
                    dispatch(addUser(res.data));
                }).catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => console.log('No Token'))
    }, [dispatch, navigate])
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;