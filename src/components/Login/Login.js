import { Link } from "react-router-dom";

function Login(){
    return(
        <div className="register">
            <Link to="/" className="register__logo"/>
            <h1 className="register__header">Рады видеть!</h1>
            <form className="register__form">
                <span className="register__input-header">E-mail</span>
                <input type="text" className="register__input" name="email" value="pochta@yandex.ru" required/>
                <span className="register__input-header">Пароль</span>
                <input type="password" className="register__input" name="password" required />
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