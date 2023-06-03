import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from '../stores/UserSlice';
import { useDispatch } from 'react-redux'
import Avatar from '../components/profil/Avatar';
import Biographie from '../components/profil/Biographie';

const Profil = () => {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        if (window.confirm('Etes-vous sur de vouloir vous déconnecter ?')) {
            dispatch(deleteUser());
            localStorage.removeItem('jwt');
            navigate('/');
        } else {
            return;
        }
    }

    return (
        <section className="profil">
            <section className="container">
                <Avatar />
                <Biographie />
                <h1>Bonjour <span className="name">{user.userName}</span> !
                </h1>
                <div className="links">
                    <Link exact="true" to='mes-films'>Mes films favoris</Link>
                    <Link exact="true" to='mes-series'>Mes séries favorites</Link>
                    <Link exact="true" to='/'>Mes ami(e)s</Link>
                    <Link exact="true" to='informations'>Mes
                        informations</Link>
                </div >
                <div className="account-actions">
                    <p onClick={handleLogout}>Me déconnecter</p>
                    <p>Supprimer mon compte</p>
                </div >
            </section >
        </section >
    );
};

export default Profil;