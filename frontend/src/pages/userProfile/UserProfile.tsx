
import "./userProfile.scss"
import UserType from "../../types/UserType";
import ProfileComponent from "../../components/profile/ProfileComponent";



interface UserProfileProps {
    user: UserType | null;
}

const UserProfile: React.FC<UserProfileProps> = ({user}) => {
    if (!user) {
        return <div>There is no such user</div>;
  }
    return (
        
        <div className="userProfilePage">
            <h1>{user.username}'s Profile</h1>
            <ProfileComponent user={user}/>
        </div>
        
    )
}

export default UserProfile;