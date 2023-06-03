export default Footer;

function Footer(){
    return(
        <footer className="footer">
            <h2 className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__bottom">
                <p className="footer__year">© 2023</p>
                <div className="footer__links">
                    <a target="_blank" rel="noopener noreferrer" href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/" className="footer__link">Github</a>
                </div>
            </div>
        </footer>
    )
}