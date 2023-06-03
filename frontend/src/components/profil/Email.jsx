import React from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addUser } from '../../stores/UserSlice';


const Email = (props) => {
    const [email, setEmail] = useState(props.user.email);
    const [display, setDisplay] = useState('none');
    const [EmailDisplay, setEmailDisplay] = useState('flex');
    const [EmailLog, setEmailLog] = useState('');
    const dispatch = useDispatch();

    const showForm = () => {
        setDisplay('flex')
        setEmailDisplay('none')
    }

    const handleChangeEmail = (e) => {
        e.preventDefault();
        if (email === props.user.email) {
            setEmailLog('L\'email saisi est identique à celui enregistré');
            setDisplay('none');
            setEmailDisplay('flex')
            return;
        }
        axios({
            method: 'PATCH',
            url: `${process.env.REACT_APP_API_URL}user/${props.user._id}`,
            data: {
                email
            },
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((res) => {
            setDisplay('none');
            setEmail(email);
            setEmailLog('Ton e-mail a bien été changé');
            setEmailDisplay('flex')
            dispatch(addUser(res.data));

        }).catch((err) => {
            setDisplay('none');
            setEmailLog('L\'email saisi est déjà pris ou non valide');
            setEmailDisplay('flex')
            setEmail(props.user.email);
            return
        })
    }

    return (
        <div className="info">
            <div className="label-container">
                <p className="label" style={{ display: EmailDisplay }} >E-mail :</p>
                {
                    props.user.email ? <p style={{ display: EmailDisplay }}>{props.user.email}</p> : ''
                }
                <FontAwesomeIcon icon={faPencil} className="pencil" onClick={showForm} style={{ display: EmailDisplay }} />
            </div>
            <form action="" method='POST' onSubmit={handleChangeEmail} style={{ display: display }}>
                <input
                    type="email"
                    id='email'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={props.user.email}
                />
                <button type='submit' className='button'>Changer mon e-mail</button>
            </form>
            <div className="empty-data">{EmailLog}</div>
        </div>
    );
};

export default Email;