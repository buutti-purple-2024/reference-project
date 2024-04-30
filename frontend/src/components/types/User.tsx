interface UserData {
    id: number;
    username: string;
    password: string;
    role?: string;
    token?: string;
    tokenExpire?: string;
    createdAt: string;
    profileText?: string;
    profileImage?: string;
    posts: number;
    follows: number; 
}

export default UserData;