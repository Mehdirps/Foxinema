import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = () => {
    const [SigninModal, setSignInModal] = useState(true);
    const [SignUpModal, setSignUpModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true)
        }
    }
    const setSignIn = () => {
        setSignUpModal(false);
        setSignInModal(true)
    }
    return (
        <div className='log-container'>
            <div className="buttons-container">
                <p className={SigninModal ? 'active-btn' : 'button'} onClick={handleModals} id="login">Je me
                    connecte</p>
                <p className={SignUpModal ? 'active-btn' : 'button'} onClick={handleModals} id="register">Je
                    m'inscris</p>
            </div>
            {SignUpModal && <SignUpForm onSignUp={setSignIn} />}
            {SigninModal && <SignInForm />}
        </div>
    );
};

export default Log;