import React from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addUser } from '../../stores/UserSlice';   

const Avatar = () => {
    const user = useSelector((state) => state.user.value)

    const [display, setDisplay] = useState('none');
    const [avatar, setAvatar] = useState('');
    const dispatch = useDispatch();


    const handleDisplayButton = () => {
        setAvatarLog('')
        setDisplay('initial');
    }

    const [avatarLog, setAvatarLog] = useState('');
    const handleAvatarUpload = (e) => {
        e.preventDefault();

        if (avatar === '') {
            setDisplay('none');
            setAvatarLog('Tu n\'as pas séléctionné d\'avatar')
            return;
        }

        const userId = user._id
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
                setDisplay('none');
                setAvatarLog(res.data.errors.avatar)
                return;
            }
            setDisplay('none');
            setAvatarLog('Ton avatar à bien été changé');
            dispatch(addUser(res.data));

        }).catch((err) => {
            setDisplay('none');
            setAvatarLog('Format d\'image incorrect ou image trop volumineuse');
        })
    }


    return (
        <figure className="avatar">
            {
                user.avatar ? <img src={`${process.env.REACT_APP_API_URL + user.avatar}`}
                    alt={`Avatar de ${user.userName}`} /> : ''
            }
            <form action="" method='POST' onSubmit={handleAvatarUpload}>
                <label htmlFor="avatar" onClick={handleDisplayButton}><FontAwesomeIcon icon={faPencil} className="pencil" /></label>
                <input
                    type="file"
                    id='avatar'
                    name='avatar'
                    onChange={(e) => setAvatar(e.target.files[0])} />
                <button type='submit' className='button' style={{ display: display }}>Changer mon avatar</button>
                <div className="empty-avatar">{avatarLog}</div>
            </form>
        </figure>

    );
};

export default Avatar;