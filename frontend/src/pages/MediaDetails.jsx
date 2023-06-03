import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Infos from '../components/media/MediaInfos';
import Discutions from '../components/media/MediaDiscutions';
import Opinions from '../components/media/MediaOpinions';

const MediaDetails = (props) => {
    const mediaId = useParams().id;
    const [media, setMedia] = useState({});
    const mediaType = props.mediaType;

    const [showDiscussions, setShowDiscussions] = useState(true);
    const [showOpinions, setShowOpinions] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "discussions") {
            setShowDiscussions(true);
            setShowOpinions(false)
        } else if (e.target.id === "opinions") {
            setShowDiscussions(false);
            setShowOpinions(true)
        }
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL + mediaType}/${mediaId}`,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((res) => {
            setMedia(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [mediaId, mediaType, setMedia])
    return (
        <article className="serie-container">
            <Infos media={media} mediaType={mediaType} />
            <div className="modals-container">
                <div className="modals-links-container">
                    <p onClick={handleModals} className={showDiscussions ? 'active' : ''} id="discussions" >Discussions</p>
                    <p onClick={handleModals} className={showOpinions ? 'active' : ''} id="opinions">Avis</p>
                </div>
                {showDiscussions && <Discutions media={media} mediaType={mediaType} />}
                {showOpinions && <Opinions media={media} mediaType={mediaType} />}
            </div>
        </article>
    );
};

export default MediaDetails;