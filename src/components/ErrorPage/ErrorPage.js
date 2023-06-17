
function ErrorPage(props){
    return(
        <div className="error-page">
            <h1 className="error-page__header">404</h1>
            <p className="error-page__text">Страница не найдена</p>
            <button onClick={props.clickGoBack} className="error-page__link-back">Назад</button>
        </div>
    )
}
export default ErrorPage;