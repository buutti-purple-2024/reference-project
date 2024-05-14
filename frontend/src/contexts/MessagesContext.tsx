import fakeMessages from "../tempData/fakeMessages";
import{ createContext} from "react";
import MessageType from "../types/MessageType";

const MessageContext = createContext<MessageType[]>(fakeMessages);


export default MessageContext;
