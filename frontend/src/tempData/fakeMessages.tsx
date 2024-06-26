import MessageType from "../types/MessageType";

const fakeMessages: MessageType[] = 
[
    {
        message_id: 1,
        chat_id: 1,
        sender_id: 1,
        content: "message 1 from user 1",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 2,
        chat_id: 1,
        sender_id: 1,
        content: "message 2 from user 1",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 3,
        chat_id: 1,
        sender_id: 2,
        content: "message 1 from user 2",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 4,
        chat_id: 1,
        sender_id: 2,
        content: "message 2 from user 2 message 2 from user 2 message 2 from user 2 message 2 from user 2 message 2 from user 2 message 2 from user 2 message 2 from user 2",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 5,
        chat_id: 2,
        sender_id: 4,
        content: "message 1 from user 4",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 6,
        chat_id: 2,
        sender_id: 4,
        content: "message 2 from user 4",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 7,
        chat_id: 2,
        sender_id: 3,
        content: "message 1 from user 3",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 8,
        chat_id: 2,
        sender_id: 3,
        content: "message 2 from user 3",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 9,
        chat_id: 2,
        sender_id: 4,
        content: "message 3 from user 4 message 3 from user 4 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 10,
        chat_id: 2,
        sender_id: 4,
        content: "message 4 from user 4 message 4 from user 4 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 11,
        chat_id: 3,
        sender_id: 2,
        content: "message 1 from user 2 to user 3",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 12,
        chat_id: 3,
        sender_id: 3,
        content: "message 1 from user 3 to user 2 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 13,
        chat_id: 4,
        sender_id: 1,
        content: "message 1 from user 1 to user 4 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 14,
        chat_id: 4,
        sender_id: 4,
        content: "message 1 from user 4 to user 1 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 15,
        chat_id: 5,
        sender_id: 1,
        content: "message 1 from user 1 to user 3 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 16,
        chat_id: 5,
        sender_id: 3,
        content: "message 1 from user 3 to user 1 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 17,
        chat_id: 6,
        sender_id: 2,
        content: "message 1 from user 2 to user 4 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 18,
        chat_id: 6,
        sender_id: 4,
        content: "message 1 from user 4 to user 2 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 19,
        chat_id: 7,
        sender_id: 2,
        content: "message 1 from user 2 to user 5 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 20,
        chat_id: 7,
        sender_id: 5,
        content: "message 1 from user 5 to user 2 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 21,
        chat_id: 8,
        sender_id: 4,
        content: "message 1 from user 4 to user 5 ",
        created_at: new Date().toISOString(),
    },
    {
        message_id: 22,
        chat_id: 8,
        sender_id: 5,
        content: "message 1 from user 5 to user 4 ",
        created_at: new Date().toISOString(),
    }
]

export default fakeMessages;