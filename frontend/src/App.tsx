import { ReactNode, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	useNavigate,
} from "react-router-dom";
import LeftBar from "./components/leftbar/LeftBar";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserProfile from "./pages/userProfile/UserProfile";
import MyProfile from "./pages/myProfile/MyProfile";
import Register from "./pages/register/Register";
import Friends from "./pages/friends/Friends";
import Chat from "./pages/chat/Chat";
import ProfileUpdate from "./components/profileUpdate/ProfileUpdate";
import axios from "axios";
import "./style.scss";
import UserType from "./types/UserType";
import ChatLeftBar from "./components/chatLeftBar/ChatLeftBar";
import Users from "./pages/users/Users";
import ChatType from "./types/ChatType";
import Topic from "./pages/topic/Topic";
import Community from "./pages/community/Community";


function App() {
	const [currentUser, setCurrentUser] = useState<UserType | null>(null); 
	const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
	const [chatId, setChatId] = useState<string | null>(null);
	const [users, setUsers] = useState<UserType[]>([]);
	const [chats, setChats] = useState<ChatType[]>([]);
	const [clickedUser, setClickedUser] = useState<UserType | null>(null);

	const handleUserSelect = (user: UserType) => {
        setSelectedUser(user);
    };

	const handleUserClick = (user: UserType) => {
		setClickedUser(user);
	};


	const baseurl = "http://localhost:3001";

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const response = await axios.get(`${baseurl}/users/2`);
				setCurrentUser(response.data);
			} catch (error) {
				console.error("Error fetching current user:", error);
			}
		};

		fetchCurrentUser();
	}, []);

	/* useEffect(() => {
		const fetchClickedUser = async () => {
			try {
				const response = await axios.get(`${baseurl}/users/4`);
				setClickedUser(response.data);
			} catch (error) {
				console.error("Error fetching current user:", error);
			}
		};

		fetchClickedUser();
	}, []); */

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
				{currentUser && <NavBar currentUser={currentUser} onUserSelect={handleUserClick}/>} {/* Render NavBar only if currentUser is defined */}
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
				{currentUser && <NavBar currentUser={currentUser} onUserSelect={handleUserClick} />} 
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
					<Route path="profile/my" 
						element={<MyProfile currentUser={currentUser} />} />
					<Route path="profile/:id" 
						element={<UserProfile user={clickedUser} />} />
					<Route path="friends" element={<Friends user={clickedUser}/>} />
					<Route path="users" element={<Users onUserSelect={handleUserClick} /* user={currentUser} *//>} />
					<Route path="profileUpdate" element={<ProfileUpdate />} />
					<Route path="*" element={<div>Not Found</div>} />
					<Route path="topic" element={< Topic />} />
					<Route path="community/*" element={<Community/>} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>

				<Route path="/chat/*" element={
					<ProtectedRoute>
						<ChatLayout />
					</ProtectedRoute>
				}>
					{/* <Route path=":id" element={<Chat  />} /> */}
				</Route>
				
			</Routes>
		</Router>
	);
}

export default App;