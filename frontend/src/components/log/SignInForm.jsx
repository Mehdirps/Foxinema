import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../stores/UserSlice';
import { useDispatch } from 'react-redux'

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}user/login`,
            data: {
                email,
                password
            },
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Content-Type": "application/json",
            }
        })
            .then((res) => {
                if (res.data.errors) {
                    setEmailError(res.data.errors.email)
                    setPasswordError(res.data.errors.password)
                    return;
                }

                localStorage.jwt = res.data.token
                dispatch(addUser(res.data.user));
                navigate('/accueil');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className='login'>
            <h2>Je me connecte</h2>
            <form action="" method="post" onSubmit={handleLogin}>
                <div className="user">
                    <label htmlFor="email">Pseudo</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="foxinema@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                    <br />
                    <div className="email error">{emailError}</div>
                </div>
                <div className="password">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <br />
                    <div className="password error">{passwordError}</div>
                </div>
                <button type="submit" className="button">Me connecter</button>
            </form>
        </div>
    );
};

export default SignInForm;