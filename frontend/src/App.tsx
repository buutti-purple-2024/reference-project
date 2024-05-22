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
import ChatLeftBar from "./components/chat leftbar/ChatLeftBar";
import MessageType from "./types/MessageType";
import ChatComp from "./components/chatComp/ChatComp";
import fakeUsers from "./tempData/fakeUsers";


function App() {
	const [currentUser, setCurrentUser] = useState<UserType | null>(null); // Initialize as null
	//const [users, setUsers] = useState<UserType[]>([]); // Initialize as an empty array
	const [messages, setMessages] = useState<MessageType[]>([]);
	const users = fakeUsers


	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("/api/user/1"); // Replace '/api/user' with your actual endpoint
				setCurrentUser(response.data); // Set the current user state with the fetched user data
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		/* const fetchUsers = async () => {
			try {
				const response = await axios.get('/api/user'); 
				const userData = response.data;
				if (Array.isArray(userData)) {
					setUsers(userData); // Set users state with the fetched user data
				} else {
					console.error("Invalid user data format:", userData);
				}
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		}; */

		fetchUser(); // Call the fetchUser function when the component mounts
		//fetchUsers(); // Call the fetchUsers function when the component mounts
	}, []);

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
				{currentUser && <NavBar currentUser={currentUser} />} {/* Render NavBar only if currentUser is defined */}
				<div style={{ display: "flex" }}>
					<ChatLeftBar users={users} currentUser={currentUser!} /> 
					<div style={{ flex: 6 }}>
						<Outlet />
						{currentUser && (
						<ChatComp 
							currentUser={currentUser} 
							messages={messages} 
							users={users} 
							setMessages={setMessages}
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
		}, /* [currentUser, navigate] */);
	
		return currentUser ? children : null;
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="profile/:id" element={<Profile />} />
					<Route path="friends" element={<Friends />} />
					<Route path="profileUpdate" element={<ProfileUpdate />} />
					<Route path="*" element={<div>Not Found</div>} />
				</Route>

				<Route path="/chat/*" element={
					<ProtectedRoute>
						<ChatLayout />
					</ProtectedRoute>
				}>
					<Route path=":id" element={<Chat />} />
				</Route>
				
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Routes>
		</Router>
	);
}

export default App;
