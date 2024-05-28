import "./chat.scss";
import ChatComponent from "../../components/chatComponent/ChatComponent";
import UserType from "../../types/UserType";
import ChatType from "../../types/ChatType";
import fakeChats from "../../tempData/fakeChats";


interface ChatProps {
	currentUser: UserType;
	selectedUser: UserType | null;
	users: UserType[];
	chats: ChatType[];
}

const Chat: React.FC<ChatProps> = ({ currentUser, selectedUser }) => {


	return (
		<div className="chat"> 
            {currentUser && (
			<ChatComponent 
				currentUser={currentUser} 
				selectedUser={selectedUser} 
				chats={fakeChats}
			/>
            )}
		</div>
	);
};

export default Chat;
