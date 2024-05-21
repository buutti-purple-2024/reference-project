import "./chat.scss";
//import fakeUsers from "../../tempData/fakeUsers";
//import MessageType from "../../types/MessageType";
//import fakeMessages from "../../tempData/fakeMessages";
import ChatBanner from "../../components/chat banner/ChatBanner";
import MessageContext from "../../contexts/MessagesContext";
import UsersContext from "../../contexts/UsersContext";
import Messages from "../../components/messages/Messages";
//import ChatLeftBar from "../../components/chat leftbar/ChatLeftBar";
import { useContext } from "react";


const Chat = () => {
    
    const messages = useContext(MessageContext);
    const users = useContext(UsersContext);

    
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
        profileBanner: "https://images.pexels.com/photos/17045504/pexels-photo-17045504/free-photo-of-cute-gray-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        profileImage: "https://images.pexels.com/photos/18866393/pexels-photo-18866393/free-photo-of-woman-wearing-straw-hat-on-a-field-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        posts: 2,
        follows: 6
      }

      
    

    return (
        <div className="chat-cont">
            <ChatBanner
                username={user.username}
                profileImage={user.profileImage}
            />
            <hr />

            {/* <ChatLeftBar/> */}

            <div className="chat-messages">
            
                <Messages messages={messages} setMessages={() => {}} users={users} />
            </div>
        </div>
    
    );
};

export default Chat;