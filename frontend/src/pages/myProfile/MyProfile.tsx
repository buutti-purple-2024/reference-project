
import "./myProfile.scss"
import ChangePassword from "../../components/changePassword/ChangePassword";
import UserType from "../../types/UserType";
import CurrentUserProfile from "../../components/profile/CurrentUserProfile";


interface ProfileProps {
    currentUser: UserType | null;
}

const Profile: React.FC<ProfileProps> = ({currentUser}) => {
    if (!currentUser) {
        return <div>No user logged in</div>;
  }
    return (
        <div className="myProfilePage">
            <h1>{currentUser.username}'s Profile</h1>
            <CurrentUserProfile currentUser={currentUser}/>
            <ChangePassword />
        </div>
        
    )
}

export default Profile;