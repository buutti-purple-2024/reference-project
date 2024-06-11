
import "./myProfile.scss"
import ChangePassword from "../../components/changePassword/ChangePassword";
import CreateTopic from "../../components/createTopic/CreateTopic";
import DeleteAccount from "../../components/deleteAccount/DeleteAccount";
import ProfileContent from "../../components/profileContent/ProfileContent";
import UserType from "../../types/UserType";
import { useUserContext } from "../../contexts/UserContext";
import PostCreate from "../../components/postCreate/PostCreate";
//import CurrentUserProfile from "../../components/profile/CurrentUserProfile";


interface ProfileProps {
    currentUser: UserType | null;
}

const Profile: React.FC<ProfileProps> = (/* {currentUser} */) => {
    const { currentUser, /* setUserId, setContextUsername, userId  */} = useUserContext(); // Add userId here

    const userIsLoggedIn = document.cookie.split("; ").find((row) => row.startsWith("refreshtoken"))?.split("=")[1]
    
    if (!currentUser) {
        return <div>No user logged in</div>;
  }
    return (
        <div className="profilePage">
            <ProfileContent user={currentUser} />
            <PostCreate />
            <CreateTopic/>
            { userIsLoggedIn && <ChangePassword/>}
            { userIsLoggedIn && <DeleteAccount/>} 
        </div>

    )
}

export default Profile;