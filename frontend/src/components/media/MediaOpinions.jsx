import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import Opinion from './MediaOpinion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';

const Opinions = (props) => {
    let opinions = props.media.opinions;
    const user = useSelector((state) => state.user.value)
    const owner = user._id;
    const [comment, setComment] = useState('');
    const [note, setNote] = useState('');
    const number = parseInt(note);
    const [showForm, setShowForm] = useState('none');
    const [OpinionListLenght, setOpinionListLenght] = useState(6)
    const [userList, setUserList] = useState('');
    const [opinionList, setOpinionList] = useState(props.media.opinions);
    const mediaType = props.mediaType;

    let OpinionsUserList = useMemo(() => [], []);


    useEffect(() => {
        if (opinions) {
            opinions.map((opinions) =>
                OpinionsUserList.push(opinions.owner)
            )

        }
        setOpinionList(opinions)
        setUserList(OpinionsUserList)
    }, [OpinionsUserList, opinions])

    const setOpinionsListFiltered = (opinionId, userId) => {
        opinions = opinionList.filter(function (opinion) {
            return opinion._id !== opinionId
        })
        OpinionsUserList = OpinionsUserList.filter(function (user) {
            return user !== userId
        })

        setOpinionList(opinions);
        setUserList(OpinionsUserList);
        setComment('');
        setNote('')
    }

    const handleForm = () => {
        showForm === 'none' ? setShowForm('flex') : setShowForm('none');
    }

    const handleCreateOpinion = (e) => {
        e.preventDefault();

        if (mediaType === 'movie') {
            const movie = props.media._id;
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}opinion/movie`,
                data: {
                    owner,
                    movie,
                    comment,
                    note: number
                },
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then((res) => {
                const newOpinionsList = opinionList;
                newOpinionsList.push(res.data.opinion)
                OpinionsUserList.push(owner);
                setUserList(OpinionsUserList);
                setOpinionList(newOpinionsList)
                setShowForm('none')
                setComment('');
                setNote('');
            }).catch((err) => {
                console.log(err)
            })
        } else if (mediaType === 'serie') {
            const serie = props.media._id
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}opinion/serie`,
                data: {
                    owner,
                    serie,
                    comment,
                    note: number
                },
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then((res) => {
                const newOpinionsList = opinionList;
                newOpinionsList.push(res.data.opinion)
                OpinionsUserList.push(owner);
                setUserList(OpinionsUserList);
                setOpinionList(newOpinionsList)
                setShowForm('none')
                setComment('');
                setNote('');
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    const stars = [];
    for (let i = 0; i < number; i++) {
        stars.push(<FontAwesomeIcon icon={faStar} className='star' key={i} />)
    }
    const noStar = 5 - stars.length

    const emptyStar = []
    for (let i = 0; i < noStar; i++) {
        emptyStar.push(<FontAwesomeIcon icon={faStar} className='not-star' key={i} />)
    }

    const showMore = () => {
        setOpinionListLenght(OpinionListLenght + 6)
    }

    return (
        <div className="opinions">
            <h2>Avis</h2>
            {
                !userList.includes(user._id) ?
                    <div className='create-opinion'>
                        <p className='button' onClick={handleForm}> {showForm === 'none' ? 'Je donne mon avis' : showForm === 'flex' ? 'Annuler' : null}</p>
                        <div className="opinion" style={{ display: showForm }}>
                            <figure>
                                <img src={`${process.env.REACT_APP_API_URL + user.avatar}`} alt="" />
                            </figure>
                            <div className="infos">
                                <h3 className='name'>{user.userName}</h3>
                                <div className="comment">

                                    <p>{comment}</p>
                                </div>
                                <div className="note">
                                    {stars}{emptyStar}
                                </div>
                            </div>
                        </div>
                        <form action="" onSubmit={handleCreateOpinion} style={{ display: showForm }}>
                            <label htmlFor="comment">Commentaire :</label>
                            <textarea
                                name="comment"
                                id="comment"
                                cols="30"
                                rows="10"
                                maxLength={1024}
                                onChange={(e) => setComment(e.target.value)}
                            >
                            </textarea>
                            <label htmlFor="note">Note :</label>
                            <input
                                type="number"
                                max={5}
                                min={1}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <button type='submit' className='button'>Valider</button>
                        </form>
                    </div>
                    : ""
            }
            <div className="opinions-container">
                {
                    opinionList ?
                        opinionList.length > 0 ?
                            opinionList.slice(0, OpinionListLenght).map((opinion, id) =>
                                <Opinion opinion={opinion} key={id} user={user} arrayFilter={setOpinionsListFiltered} mediaType={mediaType} />
                            )
                            : <p className='no-opinions'>Aucun avis n'est disponible pour le moment. Soit le premier à en donner un !</p>
                        : ''
                }
            </div>
            {
                opinionList ?
                    opinionList.length > OpinionListLenght ? <FontAwesomeIcon icon={faPlus} className='more' onClick={showMore} />
                        : ''
                    : ""
            }
        </div>
    );
};

export default Opinions;