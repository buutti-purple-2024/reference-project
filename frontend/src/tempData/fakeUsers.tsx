import UserType from "../types/UserType"

const fakeUsers: UserType[] =
    [
        {
            id: 1,
            username: "Jane Doe",
            password: "password1",
            role: "user",
            token: "",
            tokenExpire: "",
            createdAt: new Date().toISOString(),
            profileText: "this is user 1",
            profileImage: "https://images.pexels.com/photos/12160702/pexels-photo-12160702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            profileBanner: "https://images.pexels.com/photos/629162/pexels-photo-629162.jpeg", 
            posts: 1,
            follows: 0,
        },
        {
            id: 2,
            username: "John Doe",
            password: "password2",
            role: "user",
            token: "",
            tokenExpire: "",
            createdAt: new Date().toISOString(),
            profileText: "this is user 2",
            profileImage: "https://images.pexels.com/photos/21391541/pexels-photo-21391541/free-photo-of-parakeet-on-winter-morning.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            profileBanner: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            posts: 1,
            follows: 0,
        },
        {
            id: 3,
            username: "Jeremy Doe",
            password: "password3",
            role: "user",
            token: "",
            tokenExpire: "",
            createdAt: new Date().toISOString(),
            profileText: "this is user 3",
            profileImage: "https://images.pexels.com/photos/19932535/pexels-photo-19932535/free-photo-of-bride-in-wedding-dress-with-hand-raised.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            profileBanner: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg",
            posts: 1,
            follows: 0,
        },
        {
            id: 4,
            username: 'TestUser',
            password: 'password',
            role: 'user',
            token: "",
            tokenExpire: "",
            createdAt: new Date().toISOString(),
            profileText: "this is profile text",
            profileImage: "https://images.pexels.com/photos/18866393/pexels-photo-18866393/free-photo-of-woman-wearing-straw-hat-on-a-field-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            profileBanner: "https://images.pexels.com/photos/17045504/pexels-photo-17045504/free-photo-of-cute-gray-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            posts: 2,
            follows: 6,
        }
    ]

export default fakeUsers;