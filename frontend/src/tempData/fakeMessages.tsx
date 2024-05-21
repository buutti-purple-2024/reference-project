import MessageType from "../types/MessageType";

const fakeMessages: MessageType[] = 
[
    {
        message_id: 1,
        user_id: 1,
        content: "message 1 from user 1",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 2,
        user_id: 1,
        content: "another message 1 from user 1",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 3,
        user_id: 2,
        content: "message 2 from user 2",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 4,
        user_id: 3,
        content: "message 3 from user 3 message 3 from user 3 message 3 from user 3 message 3 from user 3 message 3 from user 3 message 3 from user 3 message 3 from user 3",
        created_at: new Date().toISOString(),
    }
]

export default fakeMessages;