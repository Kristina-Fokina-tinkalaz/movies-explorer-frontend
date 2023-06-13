import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


function Auth(props){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (props.loginPage){
             if (errorEmail === '' && errorPassword === '' && email !== '' && password !== ''){
            setFormValid(true);
        } else {
            setFormValid(false);
        }
        } else {
            if (errorName === '' && errorEmail === '' && errorPassword === '' && name !== '' && email !== '' && password !== ''){
            setFormValid(true);
        } else {
            setFormValid(false);
        }
        }
        
    }, [props.loginPage, errorName, errorEmail, errorPassword, name, email, password])
 
    function handleEmailChange(e){
        setEmail(e.target.value);
        setErrorEmail(e.target.validationMessage);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
        setErrorPassword(e.target.validationMessage);
    }
    function handleNameChange(e){
        setName(e.target.value);
        setErrorName(e.target.validationMessage);   
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.loginPage){
            if (!email || !password ) {
                return;
            } else {
                props.onSubmit({email, password});
            }
            
        } else {
            if (!email || !password || !name) {
                return;
            } else {
                props.onSubmit({name, email, password});
            }
            
        }  
  };
 
    return(
        <main className="auth">
            <Link to="/" className="auth__logo"/>
            <h1 className="auth__header">{props.loginPage ? "Рады видеть!" : "Добро пожаловать!"}</h1>
            <form className="auth__form" method="post" onSubmit={handleSubmit}>
                {props.loginPage ? "" : (
                    <>
                        <span className="auth__input-header">Имя</span>
                        <label className="auth__label">
                            <input
                                type="text"
                                className={`auth__input ${(errorName === '') ? '' : "auth__input-error"}`}
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                required/>
                            <span className="auth__massage-error" id="name-error">
                                {errorName}
                            </span>
                        </label>
                    </>
                )}
                <span className="auth__input-header">E-mail</span>
                <label className="auth__label">
                    <input
                        type="email"
                        className={`auth__input ${(errorEmail === '') ? '' : "auth__input-error"}`}
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required/>
                    <span className="auth__massage-error" id="email-error">
                        {errorEmail}
                    </span>
                </label>

                <span className="auth__input-header">Пароль</span>
                <label className="auth__label">
                    <input
                        type="password"
                        className={`auth__input ${(errorPassword === '') ? '' : "auth__input-error"}`}
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required />
                    <span className="auth__massage-error" id="password-error">
                        {errorPassword}
                    </span>
                </label>

                <button
                    disabled={!formValid}
                    type="button"
                    onClick={handleSubmit}
                    className={props.loginPage ? (`auth__button-login ${formValid ? '' : 'auth__button_disabled '}`) : (`auth__button-register ${formValid ? '' : 'auth__button_disabled '}`)}> {props.loginPage ? "Войти" : "Зарегистрироваться"}</button>
                <div className="auth__link-block">
                    <span className="auth__link-text">{props.loginPage ? "Ещё не зарегистрированы?" : "Уже зарегистрированы?"}</span>
                    <Link to={props.loginPage ? "/signup" : "/signin"} className="auth__link">{props.loginPage ? "Регистрация" : "Войти"}</Link>
                </div>
            </form>
        </main>
        )
}

export default Auth;