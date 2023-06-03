import React from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addUser } from '../../stores/UserSlice';

const Biographie = () => {

    const user = useSelector((state) => state.user.value)
    const [bio, setBio] = useState(user.bio);
    const [formDisplay, setFormDisplay] = useState('none');
    const [bioDisplay, setBioDisplay] = useState('initial');
    const dispatch = useDispatch();


    const changeBio = () => {
        setBio(user.bio);
        setFormDisplay('flex');
        setBioDisplay('none');
    }
    const cancelChange = () => {
        setFormDisplay('none');
        setBioDisplay('initial');
        setBio(user.bio);
    }
    const handleChange = (e) => {
        e.preventDefault();

        axios({
            method: 'PATCH',
            url: `${process.env.REACT_APP_API_URL}user/` + user._id,
            data: {
                bio
            },
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then((res) => {
                dispatch(addUser(res.data));
                setFormDisplay('none');
                setBioDisplay('initial');
            })
            .catch((err) => {
                console.log('bug')
                console.log(err);
            })
    }

    return (
        <div className="biographie">
            <div className="label-container">
                <div className="info" style={{ display: bioDisplay }}>
                    <p className="label">Biographie :</p>
                    <p>{user.bio}</p>
                    <FontAwesomeIcon icon={faPencil} className="pencil" onClick
                        ={changeBio} />
                </div>
                <form action="" method='PATCH' onSubmit={handleChange} style
                    ={{ display: formDisplay }}>
                    <textarea
                        id='bio'
                        type="text"
                        name='bio'
                        defaultValue={user.bio}
                        onChange={(e) =>
                            setBio(e.target.value)}
                        rows="5"
                        maxLength={1024}
                    />
                    <button type='submit' className='button'>Changer ma bio</button>
                    <div className='button' onClick={cancelChange} style
                        ={{ display: formDisplay }}>Annuler</div>
                </form>
            </div>
        </div>
    );
};

export default Biographie;