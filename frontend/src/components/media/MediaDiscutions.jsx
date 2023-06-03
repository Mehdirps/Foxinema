import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const Discutions = (props) => {

    const media = props.media
    const mediaType = props.mediaType;
    const [posts, setPosts] = useState([]);
    console.log(`${process.env.REACT_APP_API_URL}post/${mediaType}/${media._id}`);
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}post/${mediaType}/${media._id}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((res) => {
            setPosts(res.data);
        })
    }, [media._id, mediaType]);

    return (
        <div className="discussions">
            <h2>Discussions</h2>
            <p className='button'>Je crée un nouveau poste</p>
            <div className="discussions-container">

                {
                    posts.length > 0 ?
                        posts.map((post, id) =>

                            <div key={id} className="discussion">
                                <figure>
                                    <img src={`${process.env.REACT_APP_API_URL + post.owner.avatar}`} alt="" />
                                </figure>
                                <div className="infos">
                                    <h3>{post.title}</h3>
                                    <div className="others-infos">
                                        <p>{post.comments.length} commentaires</p>
                                        <p>{post.createdAt.substring(0, 10)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                        : <p className='empty-discution-message'>Aucune discustions pour le moment. Soit le premier à en créer une !</p>
                }
            </div>
            {posts.length > 0 ?
                <FontAwesomeIcon icon={faPlus} className='more' />
                : ''
            }
        </div>
    );
};

export default Discutions;