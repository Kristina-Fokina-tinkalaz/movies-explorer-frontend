import React, {useEffect, useState} from "react";

function ProfileForm(props){

    const [name, setName] = useState(props.userName);
    const [email, setEmail] = useState(props.userEmail);
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (errorName === '' && errorEmail === '' && name !== '' && email !== '' && (name !== props.userName || email !== props.userEmail) ){
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [errorName, errorEmail, name, email, props.userName, props.userEmail])

    function handleNameChange(e){
        setName(e.target.value);
        setErrorName(e.target.validationMessage);
    }
    function handleEmailChange(e){
        setEmail(e.target.value);
        setErrorEmail(e.target.validationMessage);
    }
    function clickSubmitProfileForm(){
        props.submitProfileForm(name, email);
    }

    return(
        <form className="profile-form" method="patch">
                <label className="profile-form__label profile-form__line">
                    <span className="profile-form__input-header">Имя</span>
                    <input className="profile-form__input" type="text" value={name} onChange={handleNameChange} name="name" required/>
                    <span className="auth__massage-error" id="name-error">
                        {errorName}
                    </span>
                </label>
                <label className="profile-form__label">
                    <span className="profile-form__input-header">E-mail</span>
                    <input className="profile-form__input" type="email" value={email} onChange={handleEmailChange} name="email" required/>
                    <span className="auth__massage-error" id="name-error">
                        {errorEmail}
                    </span>
                </label>
                <button onClick={clickSubmitProfileForm} disabled={!formValid} type="button" className={`profile-form__edit-button ${formValid ? '' : 'profile-form__edit-button_disabled' } `} >
                Редактировать</button>
                <button onClick={props.handleExit} type="button" className="profile-form__logout-button">Выйти из аккаунта</button>
            </form>
    )
}
export default ProfileForm;