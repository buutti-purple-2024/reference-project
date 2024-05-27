import ChatType from "../types/ChatType";

/* interface ChatType {
    chat_id: number;
    created_at: string;
    updated_at: string;
}

export default ChatType; */

const fakeChats: ChatType[] = 
[
    {
        chat_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        chat_id: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),  
    },
    {
        chat_id: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),  
    }
]

export default fakeChats;