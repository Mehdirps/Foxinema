import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Log from '../components/log'

const Welcome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.jwt) {
            navigate('/accueil');
        }
    })
    return (
        <section className="welcome">
            <section className="infos">
                <h1>Bienvenue sur <span className="title-color">Foxinema</span></h1>
                <figure>
                    <img src="./Banniere-Foxinema2-600.png" alt="Logo de l'application Foxinema" />
                </figure>
                <p className="text">Connectez ou inscrivez vous pour discuter avec d’autres fans de vos
                    séries et films préférés
                </p>
                <Log />
            </section>
        </section>
    );
};

export default Welcome;