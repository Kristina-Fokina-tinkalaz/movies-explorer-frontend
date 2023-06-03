
export default AboutProject;

function AboutProject(props){
    return(
        <section id="linkAboutProject" className="about-project">
            <h2 className="main__header">
                О проекте
            </h2>
            <div className="about-project__description">
                <div className="about-project__description_item">
                    <h1 className="about-project__description_header">
                        Дипломный проект включал 5 этапов
                    </h1>
                    <p className="about-project__description_text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__description_item">
                    <h1 className="about-project__description_header">
                        На выполнение диплома ушло 5 недель
                    </h1>
                    <p className="about-project__description_text">
                       У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься. 
                    </p>
                </div>
            </div>
            <div className="about-project__calendar">
                <div className="about-project__calendar_line">
                    <div className="about-project__calendar_line_green">1 неделя</div>
                    <div className="about-project__calendar_line_white">4 недели</div>
                </div>
                <div className="about-project__calendar_header">
                    <h3 class="about-project__calendar_header_green">Back-end</h3>
                    <h3 class="about-project__calendar_header_white">Front-end</h3>
                </div>
            </div>

        </section>
    )
}