import "./profile.scss";
import Posts from "../posts/Posts";
import ProfileBanner from "../profileBanner/profileBanner";
import allUsersPosts from "../../tempData/allUsersPosts";
import fakeUsers from "../../tempData/fakeUsers";

const ProfileContent: React.FC = () => {
    
    const profileId = 3; //choose the user id which will be rendered in "profile page"
    const user = fakeUsers.find(user => user.id === profileId); 
    const myposts = allUsersPosts.filter(post => post.user_id === profileId);
    

    if (!user) return null;

    return (
        <div className="profile">
            <ProfileBanner
                username={user.username}
                profileText={user.profileText || ""}
                profileBanner={user.profileBanner || ""}
                profileImage={user.profileImage || ""}
            />
            {myposts.length > 0 
            ? <Posts posts={myposts} users={fakeUsers}/> 
            : <p className="noPosts">This user hasn't posted anything yet</p>}
        </div>
    );
};

export default ProfileContent;