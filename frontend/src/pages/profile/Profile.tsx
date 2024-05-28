import ChangePassword from "../../components/changePassword/ChangePassword";
import DeleteAccount from "../../components/deleteAccount/DeleteAccount";
import ProfileContent from "../../components/profileContent/ProfileContent";
import UserType from "../../types/UserType";
import "./profile.scss"

interface ProfileProps {
    currentUser: UserType | null;
}

const Profile: React.FC<ProfileProps> = ({currentUser}) => {
    let userIsLoggedIn = document.cookie.split("; ").find((row) => row.startsWith("refreshtoken"))?.split("=")[1]
    
    if (!currentUser) {
        return <div>No user logged in</div>;
  }
    return (
        <div className="profilePage">
            <ProfileContent currentUser={currentUser}/>
            <ChangePassword/>
            { userIsLoggedIn && <ChangePassword/>}
            { userIsLoggedIn && <DeleteAccount/>} 

    )
}

export default Profile;