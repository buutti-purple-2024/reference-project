import "./chat.scss";
import ChatComponent from "../../components/chatComponent/ChatComponent";
import UserType from "../../types/UserType";
import ChatType from "../../types/ChatType";


interface ChatProps {
	currentUser: UserType;
	selectedUser: UserType | null;
	users: UserType[];
	chats: ChatType[];
}

const Chat: React.FC<ChatProps> = ({ currentUser, selectedUser, chats }) => {


	return (
		<div className="chat"> 
            {currentUser && (
			<ChatComponent 
				currentUser={currentUser} 
				selectedUser={selectedUser} 
				chats={chats}
			/>
            )}
            chat from chat here
		</div>
	);
};

export default Chat;
