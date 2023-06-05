
export default NavTab;
function NavTab(props){
    return(
        <div className="nav-tab">
            <a href="#linkAboutProject" className="nav-tab__link">О проекте</a>
            <a href="#linkTechs" className="nav-tab__link">Технологии</a>
            <a href="#linkAboutMe" className="nav-tab__link">Студент</a>
        </div>
    )
}