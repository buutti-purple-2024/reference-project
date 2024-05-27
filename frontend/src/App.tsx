import { ReactNode, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	useNavigate,
} from "react-router-dom";
import LeftBar from "./components/left bar/LeftBar";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Friends from "./pages/friends/Friends";
import Chat from "./pages/chat/Chat";
import axios from "axios";
import "./style.scss";
import ProfileUpdate from "./components/profileUpdate/ProfileUpdate";
import UserType from "./types/UserType";
import ChatLeftBar from "./components/chatLeftBar/ChatLeftBar";
import Users from "./pages/users/Users";
import ChatType from "./types/ChatType";



function App() {
	const [currentUser, setCurrentUser] = useState<UserType | null>(null); // Initialize as null
	const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
	const [chatId, setChatId] = useState<string | null>(null);
	const [users, setUsers] = useState<UserType[]>([]);
	const [chats, setChats] = useState<ChatType[]>([]);

	//const user: UserType = fakeUsers.find(user => user.id === 4);

	const handleUserSelect = (user: UserType) => {
        setSelectedUser(user);
    };


	const baseurl = "http://localhost:3001";

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const response = await axios.get(`${baseurl}/users/4`);
				setCurrentUser(response.data);
			} catch (error) {
				console.error("Error fetching current user:", error);
			}
		};

		fetchCurrentUser();
	}, []);
	/* useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`${baseurl}/users/4`);
				setCurrentUser(response.data); 
				const chatResponse = await axios.get(`${baseurl}/messages/chatId`, 
				{
					params: { user1: response.data.id, user2: selectedUser?.id }
				});
				setChatId(chatResponse.data.chatId);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser(); 

	}, [selectedUser]); */

	useEffect(() => {
		const fetchChat = async () => {
			if (currentUser && selectedUser) {
				try {
					const response = await axios.get(`${baseurl}/chats`, {
						params: { user1: currentUser.id, user2: selectedUser.id },
					});
					setChatId(response.data.chatId);
				} catch (error) {
					console.error("Error fetching chat:", error);
				}
			}
		};

		fetchChat();
	}, [currentUser, selectedUser]);

	const Layout = ({ children }: { children?: ReactNode }) => {
		return (
			<div className="theme-light">
				{currentUser && <NavBar currentUser={currentUser} />} {/* Render NavBar only if currentUser is defined */}
				<div style={{ display: "flex" }}>
					<LeftBar />
					<div style={{ flex: 6 }}>
						<Outlet />
						{children}
					</div>
				</div>
			</div>
		);
	};

	const ChatLayout = ({ children }: { children?: ReactNode }) => {
		return (
			<div className="theme-light">
				{currentUser && <NavBar currentUser={currentUser} />} 
				<div style={{ display: "flex" }}>
					{currentUser && (<ChatLeftBar  
						currentUser={currentUser} 
						onUserSelect={handleUserSelect} 
						/>
					)}
					<div style={{ flex: 6 }}>
						<Outlet />
						{currentUser && (
						<Chat 
							currentUser={currentUser} 
							selectedUser={selectedUser}
							chats={chats}
							users={users} 
						/> 
						)}
						{children}
					</div>
				</div>
			</div> 
		);
	};

	const ProtectedRoute = ({ children }: { children: ReactNode }) => {
		const navigate = useNavigate();
		useEffect(() => {
			if (!currentUser) {
				navigate("/login");
			}
		}, [/* currentUser, */ navigate]);
	
		return currentUser ? children : null;
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="profile/:id" element={<Profile currentUser={currentUser} />} />
					<Route path="friends" element={<Friends />} />
					<Route path="users" element={<Users />} />
					<Route path="profileUpdate" element={<ProfileUpdate />} />
					<Route path="*" element={<div>Not Found</div>} />
				</Route>

				<Route path="/chat/*" element={
					<ProtectedRoute>
						<ChatLayout />
					</ProtectedRoute>
				}>
					{/* <Route path=":id" element={<Chat  />} /> */}
				</Route>
				
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Routes>
		</Router>
	);
}

export default App;