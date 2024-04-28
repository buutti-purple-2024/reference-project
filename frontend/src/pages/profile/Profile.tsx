import "./profile.scss";
import Posts from "../../components/posts/Posts";
import Banner from "../../components/banner/Banner";

const Profile: React.FC = () => {
    const user = {
        username: "LM",
        bannerImage: "https://images.pexels.com/photos/17045504/pexels-photo-17045504/free-photo-of-cute-gray-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        profileImage: "https://images.pexels.com/photos/18866393/pexels-photo-18866393/free-photo-of-woman-wearing-straw-hat-on-a-field-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    };
    return (
        <div className="profile">
            <Banner
                username={user.username}
                bannerImage={user.bannerImage}
                profileImage={user.profileImage}
            />

            <Posts />
        </div>
    );
};

export default Profile;