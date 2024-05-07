interface UserType {
    id: number;
    username: string;
    password: string;
    role?: string;
    token?: string;
    tokenExpire?: string;
    createdAt: string;
    profileText?: string;
    profileImage?: string;
    bannerImage?: string; // add to database
    posts: number;
    follows: number; 
}

export default UserType;