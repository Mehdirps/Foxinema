import React from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addUser } from '../../stores/UserSlice';


const UserName = (props) => {
    const [userName, setUserName] = useState(props.user.userName);
    const [display, setDisplay] = useState('none');
    const [userNameDisplay, setUserNameDisplay] = useState('flex');
    const [userNameLog, setUserNameLog] = useState('');
    const dispatch = useDispatch();

    const showForm = () => {
        setDisplay('flex')
        setUserNameDisplay('none')
    }

    const handleChangeUserName = (e) => {
        e.preventDefault();
        if (userName === props.user.userName) {
            setUserNameLog('Le pseudo saisi est identique à celui enregistré');
            setDisplay('none');
            setUserNameDisplay('flex')
            return;
        }
        axios({
            method: 'PATCH',
            url: `${process.env.REACT_APP_API_URL}user/${props.user._id}`,
            data: {
                userName
            },
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((res) => {
            setDisplay('none');
            setUserName(userName);
            setUserNameLog('Ton pseudo a bien été changé');
            setUserNameDisplay('flex')
            dispatch(addUser(res.data));

        }).catch((err) => {
            setDisplay('none');
            setUserNameLog('Le pseudo saisi est déjà pris ou non valide');
            setUserNameDisplay('flex')
            setUserName(props.user.userName);
            return
        })
    }

    return (
        <div className="info">
            <div className="label-container">
                <p className="label" style={{ display: userNameDisplay }} >Pseudo :</p>
                {
                    props.user.userName ? <p style={{ display: userNameDisplay }}>{props.user.userName}</p> : ''
                }
                <FontAwesomeIcon icon={faPencil} className="pencil" onClick={showForm} style={{ display: userNameDisplay }} />
            </div>
            <form action="" method='POST' onSubmit={handleChangeUserName} style={{ display: display }}>
                <input
                    type="text"
                    id='userName'
                    name='userName'
                    onChange={(e) => setUserName(e.target.value)}
                    defaultValue={props.user.userName}
                />
                <button type='submit' className='button'>Changer mon pseudo</button>
            </form>
            <div className="empty-data">{userNameLog}</div>
        </div>
    );
};

export default UserName;