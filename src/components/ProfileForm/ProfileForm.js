import React, {useState} from "react";

function ProfileForm(props){

     const [name, setName] = useState(props.userName);
    const [email, setEmail] = useState(props.userEmail);

    function handleNameChange(e){
        setName(e.target.value);
    }
    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    return(
        <form className="profile-form" method="patch">
                <label className="profile-form__label profile-form__line">
                    <span className="profile-form__input-header">Имя</span>
                    <input className="profile-form__input" type="text" value={name} onChange={handleNameChange} name="name"/>
                </label>
                <label className="profile-form__label">
                    <span className="profile-form__input-header">E-mail</span>
                    <input className="profile-form__input" type="text" value={email} onChange={handleEmailChange} name="email"/>
                </label>
                <button type="button" className="profile-form__edit-button" 
                
                >Редактировать</button>
                <button type="button" className="profile-form__logout-button">Выйти из аккаунта</button>
            </form>
    )
}
export default ProfileForm;