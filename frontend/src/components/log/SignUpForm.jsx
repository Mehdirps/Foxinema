import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faEye } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addUser } from '../../stores/UserSlice';


const SignUpForm = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setdateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [rgpd, setRgpd] = useState(false);
    const [showPassword, setShowPassword] = useState('password');

    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [dateOfBirthError, setDateOfBirthError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [avatarError, setAvatarError] = useState('');
    const [rgpdError, setRgpdError] = useState('');
    const [ageError, setAgeError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dateOfBirthYear = new Date(dateOfBirth).getFullYear();
    const newDate = new Date().getFullYear();
    const age = newDate - dateOfBirthYear;

    const handleRegister = (e) => {
        e.preventDefault();

        if (userName.length < 3) {
            setUserNameError("Le pseudo saisi est trop court ou non saisi, 3 caratères minimum");
            return;
        }
        setUserNameError('')
        if (!email) {
            setEmailError("Aucune addresse e-mail saisie");
            return;
        }
        setEmailError('')
        if (age < 13) {
            setAgeError("Tu n'a pas l'âge nécessaire pour utiliser cette application !");
            return;
        }
        setAgeError("");
        if (!dateOfBirth) {
            setDateOfBirthError("Aucune date de naissance saisie");
            return;
        }
        setDateOfBirthError('');
        if (!password) {
            setPasswordError("Aucun mot de passe saisi");
            return;
        }
        setPasswordError('');

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}user/register`,
            data: {
                userName,
                email,
                password,
                dateOfBirth,
                rgpd, 
                age
            },
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Content-Type": "application/json",
            }
        })
            .then((res) => {
                if (res.data.errors) {
                    setUserNameError(res.data.errors.userName);
                    setEmailError(res.data.errors.email);
                    setPasswordError(res.data.errors.password);
                    setDateOfBirthError(res.data.errors.dateOfBirth);
                    setAvatarError(res.data.errors.avatar);
                    setRgpdError(res.data.errors.rgpd);
                    return;
                }

                if (!avatar) {
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
                            localStorage.jwt = res.data.token
                            dispatch(addUser(res.data.user));
                            navigate('/choix-des-films');
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    return;
                }

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
                        localStorage.jwt = res.data.token
                        dispatch(addUser(res.data.user));

                        const userId = res.data.user._id;
                        const data = new FormData();
                        data.append('file', avatar);
                        data.append('userId', userId);

                        axios({
                            method: 'POST',
                            url: `${process.env.REACT_APP_API_URL}user/upload`,
                            data: data,
                            headers: {
                                'Access-Control-Allow-Credentials': true,
                                "Content-Type": "multipart/form-data",
                                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                            }
                        }).then((res) => {
                            if (res.data.errors) {
                                setAvatarError(res.data.errors.avatar);
                                return;
                            }
                            navigate('/choix-des-films');
                        })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleShowPassword = () => {
        if (showPassword === 'text') {
            setShowPassword('password');
            return;
        }
        setShowPassword('text');
    }

    return (
        <div className='register'>
            <div className='age-error'>{ageError}</div>
            <h2>Je m'inscris</h2>
            <div className='error'>{Error}</div>
            <form action="" method="post"
                encType="multipart/form-data" onSubmit={handleRegister}>
                <div className="user">
                    <label htmlFor="userName">Pseudo</label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Foxinema"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    />
                    <br />
                    <div className='error'>{userNameError}</div>
                </div>
                <div className="email">
                    <label htmlFor="email">Adresse e-mail</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="contact@foxinema.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <br />
                    <div className='error'>{emailError}</div>
                </div>
                <div className="birth">
                    <label htmlFor="dateOfBirth">Date de naissance</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        placeholder="18/09/1994"
                        onChange={(e) => setdateOfBirth(e.target.value)}
                        value={dateOfBirth}
                    />
                    <br />
                    <div className='error'>{dateOfBirthError}</div>
                </div>
                <div className="password">
                    <label htmlFor="password">Mot de passe</label>
                    <div className="password-container">
                        <FontAwesomeIcon icon={faEye} onClick={handleShowPassword} className='showPassword' />
                        <input
                            type={showPassword}
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        ></input>
                    </div>
                    <br />
                    <div className='error'>{passwordError}</div>
                </div>
                <div className="avatar">
                    <label htmlFor="avatar">Avatar
                        <FontAwesomeIcon icon={faFileImport} /></label>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                    <br />
                    <div className='error'>{avatarError}</div>
                </div>
                <div className="rgpd">
                    <input
                        type="checkbox"
                        name="rgpd"
                        id="rgpd"
                        onClick={(e) => setRgpd(!rgpd)}
                        value={rgpd}
                    />
                    <br />
                    <label htmlFor="rgpd">J'accepte la
                        collecte de mes
                        données
                        personnelles dans le cadre de mon
                        inscription, la navigation sur l'application et
                        la gestion
                        de mon compte. Je certifie également avoir au moins 13 ans.</label>
                </div>
                <div className='error'>{rgpdError}</div>
                <button type="submit" className="button">M'inscrire</button>
            </form>
        </div>
    );
};

export default SignUpForm;