import { Link } from "react-router-dom";
import { useState } from "react";


function Auth(props){
    const [name, setName] = useState("Виталий");
    const [email, setEmail] = useState("pochta@yandex.ru");
    const [password, setPassword] = useState("");

    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
        function handleNameChange(e){
        setName(e.target.value);
    }
    return(
        <main className="auth">
            <Link to="/" className="auth__logo"/>
            <h1 className="auth__header">{props.loginPage ? "Рады видеть!" : "Добро пожаловать!"}</h1>
            <form className="auth__form" method="post">
                {props.loginPage ? "" : (
                    <>
                        <span className="auth__input-header">Имя</span>
                        <input type="text" className="auth__input" name="name" value={name} onChange={handleNameChange} required/>
                    </>
                )}
                <span className="auth__input-header">E-mail</span>
                <input type="text" className="auth__input" name="email" value={email} onChange={handleEmailChange} required/>
                <span className="auth__input-header">Пароль</span>
                <input type="password" className="auth__input" name="password" value={password} onChange={handlePasswordChange} required />
                <button className={props.loginPage ? "auth__button-login" : "auth__button-register"}>{props.loginPage ? "Войти" : "Зарегистрироваться"}</button>
                <div className="auth__link-block">
                    <span className="auth__link-text">{props.loginPage ? "Ещё не зарегистрированы?" : "Уже зарегистрированы?"}</span>
                    <Link to={props.loginPage ? "/signup" : "/signin"} className="auth__link">{props.loginPage ? "Регистрация" : "Войти"}</Link>
                </div>
            </form>
        </main>
        )
}
export default Auth;