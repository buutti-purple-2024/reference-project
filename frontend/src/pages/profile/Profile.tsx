import ChangePassword from "../../components/changePassword/ChangePassword";
import DeleteAccount from "../../components/deleteAccount/DeleteAccount";
import ProfileContent from "../../components/profileContent/ProfileContent";

const Profile = () => {
    let userIsLoggedIn = document.cookie.split("; ").find((row) => row.startsWith("refreshtoken"))?.split("=")[1]

    return (
        <div>
            {console.log(userIsLoggedIn)}
            <ProfileContent />
            { userIsLoggedIn && <ChangePassword/>}
            { userIsLoggedIn && <DeleteAccount/>}
        </div>
    )
}

export default Profile;