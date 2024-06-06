
import "./myProfile.scss"
import ChangePassword from "../../components/changePassword/ChangePassword";
import CreateTopic from "../../components/createTopic/CreateTopic";
import DeleteAccount from "../../components/deleteAccount/DeleteAccount";
import ProfileContent from "../../components/profileContent/ProfileContent";
import UserType from "../../types/UserType";
//import CurrentUserProfile from "../../components/profile/CurrentUserProfile";


interface ProfileProps {
    currentUser: UserType | null;
}

const Profile: React.FC<ProfileProps> = ({currentUser}) => {
    const userIsLoggedIn = document.cookie.split("; ").find((row) => row.startsWith("refreshtoken"))?.split("=")[1]
    
    if (!currentUser) {
        return <div>No user logged in</div>;
  }
    return (
        <div className="profilePage">
            <ProfileContent user={currentUser} />
            {/* <CurrentUserProfile currentUser={currentUser}/> */}
            <CreateTopic/>
            { userIsLoggedIn && <ChangePassword/>}
            { userIsLoggedIn && <DeleteAccount/>} 
            </div>

    )
}

export default Profile;