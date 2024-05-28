import ChatType from "../types/ChatType";


const fakeChats: ChatType[] = 
[
    {
        chat_id: 1,
        user1_id: 1,
        user2_id: 2,
        created_at: new Date().toISOString(),
    },
    {
        chat_id: 2,
        user1_id: 4,
        user2_id: 3,
        created_at: new Date().toISOString(), 
    },
    {
        chat_id: 3,
        user1_id: 2,
        user2_id: 3,
        created_at: new Date().toISOString(), 
    },
    {
        chat_id: 4,
        user1_id: 1,
        user2_id: 4,
        created_at: new Date().toISOString(), 
    },
    {
        chat_id: 5,
        user1_id: 1,
        user2_id: 3,
        created_at: new Date().toISOString(), 
    },
    {
        chat_id: 6,
        user1_id: 2,
        user2_id: 4,
        created_at: new Date().toISOString(), 
    },
    {
        chat_id: 7,
        user1_id: 2,
        user2_id: 5,
        created_at: new Date().toISOString(), 
    },
    {
        chat_id: 8,
        user1_id: 4,
        user2_id: 5,
        created_at: new Date().toISOString(), 
    },
]

export default fakeChats;