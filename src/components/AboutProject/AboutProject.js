import Calendar from '../Calendar/Calendar';

export default AboutProject;

function AboutProject(props){
    return(
        <section id="linkAboutProject" className="about-project">
            <h2 className="main__header">
                О проекте
            </h2>
            <div className="about-project__description">
                <div className="about-project__item">
                    <h3 className="about-project__title">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__item">
                    <h3 className="about-project__title">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__text">
                       У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься. 
                    </p>
                </div>
            </div>
           
            <Calendar />
        </section>
    )
}