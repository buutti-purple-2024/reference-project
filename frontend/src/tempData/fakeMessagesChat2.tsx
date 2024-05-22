import MessageType from "../types/MessageType";

const fakeMessagesChat2: MessageType[] = 
[
    {
        message_id: 1,
        user_id: 4,
        content: "message 1 from user 4",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 2,
        user_id: 4,
        content: "message 2 from user 4",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 1,
        user_id: 3,
        content: "message 1 from user 3",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 2,
        user_id: 3,
        content: "message 2 from user 3",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 3,
        user_id: 4,
        content: "message 3 from user 4 message 3 from user 4 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 4,
        user_id: 4,
        content: "message 4 from user 4 message 4 from user 4 ",
        created_at: new Date().toISOString(),
    }
]

export default fakeMessagesChat2;