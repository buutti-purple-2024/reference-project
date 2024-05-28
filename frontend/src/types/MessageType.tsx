

interface MessageType {
    message_id: number;
    chat_id: number;
    sender_id: number;
    content: string;
    created_at: string;
}

export default MessageType;