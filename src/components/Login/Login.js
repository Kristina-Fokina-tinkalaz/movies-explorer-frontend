import { Link } from "react-router-dom";
import { useState } from "react";


function Login(){

    const [email, setEmail] = useState("pochta@yandex.ru");
    const [password, setPassword] = useState("");

    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    return(
        <div className="register">
            <Link to="/" className="register__logo"/>
            <h1 className="register__header">Рады видеть!</h1>
            <form className="register__form" method="post">
                <span className="register__input-header">E-mail</span>
                <input type="text" className="register__input" name="email" value={email} onChange={handleEmailChange} required/>
                <span className="register__input-header">Пароль</span>
                <input type="password" className="register__input" name="password" value={password} onChange={handlePasswordChange} required />
                <button className="register__button-submit-loggin">Войти</button>
                <div className="register__link-signup-block">
                    <span className="register__link-signup-text">Ещё не зарегистрированы?</span>
                    <Link to="/signup" className="register__link-signup">Регистрация</Link>
                </div>
            </form>
        </div>
        )
}
export default Login;