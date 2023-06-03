import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const MovieNote = (props) => {
    const opinions = props.opinions
    const [note, setNote] = useState(0);
    const noteListCopy = useMemo(() => [], []);

    const noteStar = useMemo(() => [], []);
    const emptyStar = useMemo(() => [], []);

    useEffect(() => {
        if (opinions) {
            opinions.map((opinion) =>
                noteListCopy.push(opinion.note)
            )
            const noteAddition = noteListCopy.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const noteCopy = parseInt(noteAddition / noteListCopy.length);
            setNote(noteCopy);

        }
    }, [opinions, noteListCopy, setNote, note, noteStar, emptyStar])
    if (note > 0) {

        for (let i = 0; i < note; i++) {
            noteStar.push(<FontAwesomeIcon icon={faStar} className='star' key={i} style={{ color: 'gold' }} />)
        }
        const noStar = 5 - note;

        for (let i = 0; i < noStar; i++) {
            emptyStar.push(<FontAwesomeIcon icon={faStar} className='not-star' key={i} />)

        }
    }

    return (
        <>
            {
                note ?
                    <div className='note'>
                        {noteStar}{emptyStar}
                    </div>
                    : ''
            }
        </>
    );
};

export default MovieNote;