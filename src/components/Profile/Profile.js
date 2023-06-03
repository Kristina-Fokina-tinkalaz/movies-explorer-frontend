import React, {useState} from "react";
import Header from "../Header/Header";

function Profile(props){
    const [name, setName] = useState(props.userName);
    const [email, setEmail] = useState(props.userEmail);

    function handleNameChange(e){
        setName(e.target.value);
    }
    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    return(
        <>
        <Header isLoggin="true"/>
        <div className="profile">
            <h1 className="profile__header">Привет, {props.userName}!</h1>
            <form className="profile__form" method="patch">
                <label className="profile__form_label profile__form_bottom_line">
                    <span className="profile__form_input-header">Имя</span>
                    <input className="profile__form_input" type="text" value={name} onChange={handleNameChange} name="name"/>
                </label>
                <label className="profile__form_label">
                    <span className="profile__form_input-header">E-mail</span>
                    <input className="profile__form_input" type="text" value={email} onChange={handleEmailChange} name="email"/>
                </label>
                <button className="profile__form_edit-button" 
                
                >Редактировать</button>
                <button className="profile__form_logout-button">Выйти из аккаунта</button>
            </form>
        </div>
        </>
    )
}
export default Profile;