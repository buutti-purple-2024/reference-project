import ChangePassword from "../../components/changePassword/ChangePassword";
import ProfileContent from "../../components/profileContent/ProfileContent";
import "./profile.scss"

const Profile = () => {
    return (
        <div className="profilePage">
            <ProfileContent />
            <ChangePassword/>
        </div>
    )
}

export default Profile;