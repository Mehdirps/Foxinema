import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='not-found'>
            <div className="container">
                <figure>
                    <img src="./404.png" alt="" />
                </figure>
                <h1>Page introuvable... Cliquer pour revenir à l'accueil !</h1>
                <NavLink excat='true' to={'/accueil'}>Accueil</NavLink>
            </div>
        </div>
    );
};

export default NotFound;