import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <p className="name">
                Foxinema
            </p>
            <section className="links">
                <NavLink to="/">Nous contacter</NavLink>
                <NavLink to="/">Mentions légales</NavLink>
                <NavLink to="/">CGU et confidentialité</NavLink>
            </section >
            <div className="copyright">&copy;2023 - <span>Foxinema</span></div>
            <div className="social">
                <a href="https://www.instagram.com/foxinema.fr/" rel="noppener noreferrer" target="_blank">
                    <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/foxinema/" rel="noppener noreferrer" target="_blank">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
            </div>
        </footer >

    );
};

export default Footer;