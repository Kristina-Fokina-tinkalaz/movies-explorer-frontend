
import Header from "../Header/Header";
import ProfileForm from "../ProfileForm/ProfileForm";


function Profile(props){

    return(
        <>
        <Header loggedIn={props.loggedIn}/>
        <div className="profile">
            <h1 className="profile__header">Привет, {props.userName}!</h1>
            <ProfileForm userName={props.userName} userEmail={props.userEmail} submitProfileForm={props.submitProfileForm} handleExit={props.handleExit}/>
        </div>
        
        </>
    )
}
export default Profile;