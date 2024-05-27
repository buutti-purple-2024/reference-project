import ChangePassword from "../../components/changePassword/ChangePassword";
import ProfileContent from "../../components/profileContent/ProfileContent";
import UserType from "../../types/UserType";
import "./profile.scss"

interface ProfileProps {
    currentUser: UserType | null;
}

const Profile: React.FC<ProfileProps> = ({currentUser}) => {
    if (!currentUser) {
        return <div>No user logged in</div>;
  }
    return (
        <div className="profilePage">
            <ProfileContent currentUser={currentUser}/>
            <ChangePassword/>
        </div>
    )
}

export default Profile;