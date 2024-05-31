import "./friends.scss";
import UserType from "../../types/UserType";
//import ProfileComponent from "../../components/profile/ProfileComponent";


interface FP {
    user: UserType | null;
}

const Friends: React.FC<FP> = ({user}) => {
    if (!user) {
        return <div>Please log in to see your friends.</div>;
      }
    return (
        <div className="friends">
            
            <h2>My friends here, add friends</h2>

            {/* <ProfileComponent user={user}/> */}
        </div>
    )
}

export default Friends;