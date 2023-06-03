import { Link } from "react-router-dom";
import { useState } from "react";

function Register(){
    const [name, setName] = useState("Виталий");
    const [email, setEmail] = useState("pochta@yandex.ru");
    const [password, setPassword] = useState("");

    function handleNameChange(e){
        setName(e.target.value);
    }
      function handleEmailChange(e){
        setEmail(e.target.value);
    }
      function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    return(
        <div className="register">
            <Link to="/" className="register__logo"/>
            <h1 className="register__header">Добро пожаловать!</h1>
            <form className="register__form" method="post">
                <span className="register__input-header">Имя</span>
                <input type="text" className="register__input" name="name" value={name} onChange={handleNameChange} required/>
                <span className="register__input-header">E-mail</span>
                <input type="text" className="register__input" name="email" value={email} onChange={handleEmailChange} required/>
                <span className="register__input-header">Пароль</span>
                <input type="password" className="register__input" name="password" value={password} onChange={handlePasswordChange} required/>
                    <button className="register__button-submit">Зарегистрироваться</button>
                    <div className="register__link-signup-block">
                        <span className="register__link-signup-text">Уже зарегистрированы?</span>
                        <Link to="/signin" className="register__link-signup">Войти</Link>
                    </div>
            </form>
        </div>
        )
}
export default Register;