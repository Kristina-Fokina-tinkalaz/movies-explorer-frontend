import { Link } from "react-router-dom";

function Register(){
    return(
        <div className="register">
            <Link to="/" className="register__logo"/>
            <h1 className="register__header">Добро пожаловать!</h1>
            <form className="register__form">
                <span className="register__input-header">Имя</span>
                <input type="text" className="register__input" name="name" value="Виталий" required/>
                <span className="register__input-header">E-mail</span>
                <input type="text" className="register__input" name="email" value="pochta@yandex.ru" required/>
                <span className="register__input-header">Пароль</span>
                <input type="password" className="register__input" name="password" required/>
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