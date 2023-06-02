import {Link} from 'react-router-dom';

function ErrorPage(){
    return(
        <div className="error-page">
            <h1 className="error-page__header">404</h1>
            <p className="error-page__text">Страница не найдена</p>
            <Link to="/" className="error-page__link-back">Назад</Link>
        </div>
    )
}
export default ErrorPage;