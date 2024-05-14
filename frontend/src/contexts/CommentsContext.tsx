import fakeComments from "../tempData/fakeComments";
import{ createContext} from "react";
import CommentType from "../types/CommentType";

const CommentsContext = createContext<CommentType[]>(fakeComments);

export default CommentsContext;
