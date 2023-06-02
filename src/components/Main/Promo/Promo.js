
import NavTab from "../NavTab/NavTab";

export default Promo;
function Promo(props){
    return(
        <div className="promo">
            <h1 className="promo__header">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <NavTab />
        </div>
    )
}