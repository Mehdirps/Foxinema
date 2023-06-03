import React from 'react';
import { NavLink } from 'react-router-dom';
import { faSearch, faMessage, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
    return (
        <header>
            <NavLink exact="true" to="/accueil">
                <figure>
                    <img src="../Banniere-Foxinema2-600.png" alt="Logo du site Foxinema" />
                </figure>
            </NavLink>
            <p className="name">Foxinema</p>
            <section className="icons-container">
                <div className="icon" id="search">
                    <FontAwesomeIcon icon={faSearch} />
                    <p>Rechercher</p>
                </div>
                <div className="icon" id="converstions">
                    <FontAwesomeIcon icon={faMessage} />
                    <p>Discutions</p>
                </div>
                <NavLink exact="true" to="/profil">
                    <div className="icon" id="account">
                        <FontAwesomeIcon icon={faUserAlt} />
                        <p>Mon compte</p>
                    </div>
                </NavLink>
            </section >
        </header >
    );
};

export default Header;