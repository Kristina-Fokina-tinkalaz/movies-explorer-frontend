
export default Portfolio;

function Portfolio(){
    return(
        <div className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <a target="_blank" href="https://yandex.ru/search/?text=%D0%BF%D0%BE%D1%80%D1%82%D1%84%D0%BE%D0%BB%D0%B8%D0%BE&search_source=dzen_desktop_safe&lr=155382" rel="noopener noreferrer" className="portfolio__link">
                Статичный сайт <span className="portfolio__link-arrow">↗</span>
            </a>
            <a target="_blank" href="https://yandex.ru/search/?text=%D0%BF%D0%BE%D1%80%D1%82%D1%84%D0%BE%D0%BB%D0%B8%D0%BE&search_source=dzen_desktop_safe&lr=155382" rel="noopener noreferrer" className="portfolio__link">
                Адаптивный сайт <span className="portfolio__link-arrow">↗</span>
            </a>
            <a target="_blank" href="https://yandex.ru/search/?text=%D0%BF%D0%BE%D1%80%D1%82%D1%84%D0%BE%D0%BB%D0%B8%D0%BE&search_source=dzen_desktop_safe&lr=155382" rel="noopener noreferrer" className="portfolio__link">
                Одностраничное приложение <span className="portfolio__link-arrow">↗</span>
            </a>
        </div>
    )
}