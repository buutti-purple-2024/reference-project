import "./profile.scss";
import Posts from "../../components/posts/Posts";
import Banner from "../../components/banner/Banner";
//import PostData from "../../components/types/Post";
import profileUserPosts from "../../tempData/profileUserPosts";
import fakeUsers from "../../tempData/fakeUsers";

const Profile: React.FC = () => {
    // temp data
    const user = {
        id: 1,
        username: 'TestUser',
        password: 'password',
        role: 'user',
        token: null,
        tokenExpire: null,
        createdAt: new Date().toISOString(),
        profileText: "this is profile text",
        bannerImage: "https://images.pexels.com/photos/17045504/pexels-photo-17045504/free-photo-of-cute-gray-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        profileImage: "https://images.pexels.com/photos/18866393/pexels-photo-18866393/free-photo-of-woman-wearing-straw-hat-on-a-field-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        posts: 2,
        follows: 6
      }

    
    return (
        <div className="profile">
            <Banner
                username={user.username}
                profileText={user.profileText}
                bannerImage={user.bannerImage}
                profileImage={user.profileImage}
            />

            <Posts posts={profileUserPosts} users={fakeUsers}/>
        </div>
    );
};

export default Profile;