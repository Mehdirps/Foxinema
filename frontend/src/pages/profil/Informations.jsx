/* eslint-disable eqeqeq */
import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../components/profil/Avatar';
import UserName from '../../components/profil/UserName';
import Email from '../../components/profil/Email';

const Informations = () => {
    const user = useSelector((state) => state.user.value)
    const birth = new Date(user.dateOfBirth).toLocaleDateString();
    const createdDate = new Date(user.createdAt).toLocaleDateString();
    const roles = user.roles;

    return (
        <section className="informations">
            <h1><span className="name">{user.userName}</span>, voici les informations de ton compte !</h1>
            <section className="informations-container">
                <div className="info">
                    <Avatar />
                </div>
                <UserName user={user} />
                <Email user={user} />
                <div className="info">
                    <div className="label-container">
                        <p className="label">Age :</p>
                        <p>{user.age} ans</p>
                    </div>
                </div>
                <div className="info">
                    <div className="label-container">
                        <p className="label">Date d'anniversaire :</p>
                        <p>{birth}</p>
                    </div>
                </div>
                <div className="info">
                    <div className="label-container">
                        <p className="label">Date de création :</p>
                        <p>{createdDate}</p>
                    </div>
                </div>
                <div className="info">
                    <div className="label-container">
                        <p>Roles :</p>
                        <div className="roles">
                            <p className="role">
                                {
                                    roles ?
                                        roles.includes('ROLE_USER') ? 'Utilisateur' : ''
                                        : ''
                                }
                            </p>
                            <p className="role">
                                {
                                    roles ?
                                        roles.includes('ROLE_ADMIN') ? 'Administrateur' : ''
                                        : ''
                                }
                            </p>
                            <p className="role">
                                {
                                    roles ?
                                        roles.includes('ROLE_MODERATEUR') ? 'MOdérateur' : ''
                                        : ''
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Informations;