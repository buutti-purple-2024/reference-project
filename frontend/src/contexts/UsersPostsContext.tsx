import allUsersPosts from "../tempData/allUsersPosts";
import PostType from "../types/PostType";
import{ createContext} from "react";

const UsersPostsContext = createContext<PostType[]>(allUsersPosts);

export default UsersPostsContext;