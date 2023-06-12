import myphoto from '../../images/my-photo.jpeg';
export default AboutMe;

function AboutMe(){
    return(
        <section id="linkAboutMe" className="about-me">
            <h2 className="main__header">Студент</h2>
            <img src={myphoto} className="about-me__photo" alt="MyPhoto"/>
            <h3 className="about-me__name">Кристина</h3>
            <h3 className="about-me__job">Фронтенд-разработчик, 29 лет</h3>
            <p className="about-me__description">Я родилась и живу в Санкт-Петербурге, получила степень бакалавра по специальности "Прикладная математика" в СПБГАСУ. Цель моей дипломной работы была создание сайта с использованием технологий HTML, Css, JS. У меня есть муж и двое детей. После прохождения обучения в Яндекс Практикуме планирую пройти стажировку с дальнейшим трудоустройством.</p>
            <a target="_blank" rel="noopener noreferrer" className="about-me__link-github" href="https://github.com/Kristina-Fokina-tinkalaz?tab=repositories">Github</a>    
        </section>
    )
}