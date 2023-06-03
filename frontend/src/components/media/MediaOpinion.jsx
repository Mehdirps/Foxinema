import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const Opinion = (props) => {
    let opinion = props.opinion;
    const user = props.user;
    const note = [];
    const [opinionOwner, setOpinionOwner] = useState([]);
    const arrayFilter = props.arrayFilter;
    const mediaType = props.mediaType;

    for (let i = 0; i < opinion.note; i++) {
        note.push(<FontAwesomeIcon icon={faStar} className='star' key={i} />)
    }
    const noStar = 5 - note.length

    const emptyStar = []
    for (let i = 0; i < noStar; i++) {
        emptyStar.push(<FontAwesomeIcon icon={faStar} className='not-star' key={i} />)
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}user/${opinion.owner}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((res) => {
            setOpinionOwner(res.data)
        })
    }, [opinion.owner, setOpinionOwner])

    const handleDeleteOpinion = () => {
        if (mediaType === 'movie') {
            axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_API_URL}opinion/movieOpinion/${opinion._id}`,
                data: {
                    owner: user._id,
                    movie: opinion.movie
                },
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then((res) => {
                arrayFilter(opinion._id, user._id)
            })
        } else if (mediaType === 'serie') {
            axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_API_URL}opinion/serieOpinion/${opinion._id}`,
                data: {
                    owner: user._id,
                    serie: opinion.serie
                },
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then((res) => {
                arrayFilter(opinion._id, user._id)
            })
        }
    }

    return (
        <div className="opinion">
            {

                opinion.owner === user._id
                    ?
                    <FontAwesomeIcon icon={faTrash} className='trash' onClick={handleDeleteOpinion} />
                    : ''
            }
            {
                opinionOwner ?
                    <>
                        <figure>
                            <img src={`${process.env.REACT_APP_API_URL + opinionOwner.avatar}`} alt={'Avatar de ' + opinionOwner.userName} />
                        </figure>
                        <div className="infos">
                            <h3 className='name'>{opinionOwner.userName}</h3>
                            <p>{opinion.comment}</p>
                            <div className="note">
                                {note}{emptyStar}
                            </div>
                        </div>
                    </>
                    : ""
            }

        </div>
    );
};

export default Opinion;