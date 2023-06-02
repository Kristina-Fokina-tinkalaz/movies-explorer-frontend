import React from "react";
import Header from "../Header/Header";

function Profile(props){
    // const [readonly, setReadonly] = useState(true);

    function clickEditInput(){
        // setReadonly(false);
    }
    return(
        <>
        <Header isLoggin="true"/>
        <div className="profile">
            <h1 className="profile__header">Привет, {props.userName}!</h1>
            <form className="profile__form">
                <label className="profile__form_label profile__form_bottom_line">
                    <span className="profile__form_input-header">Имя</span>
                    <input className="profile__form_input" type="text" value={props.userName} name="name"/>
                </label>
                <label className="profile__form_label">
                    <span className="profile__form_input-header">E-mail</span>
                    <input className="profile__form_input" type="text" value={props.userEmail} name="email"/>
                </label>
                <button className="profile__form_edit-button" 
                onClick={clickEditInput}
                >Редактировать</button>
                <button className="profile__form_logout-button">Выйти из аккаунта</button>
            </form>
        </div>
        </>
    )
}
export default Profile;