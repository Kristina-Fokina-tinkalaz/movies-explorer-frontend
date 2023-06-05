export default Techs ;

function Techs(){
    return (
        <section id="linkTechs" className="techs">
            <h2 className="main__header">Технологии</h2>
            <h3 className="techs__description">7 технологий</h3>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__lables">
                <li className="techs__lable">HTML</li>
                <li className="techs__lable">CSS</li>
                <li className="techs__lable">JS</li>
                <li className="techs__lable">React</li>
                <li className="techs__lable">Git</li>
                <li className="techs__lable">Express.js</li>
                <li className="techs__lable">mongoDB</li>
            </ul>
        </section>
    )
}
