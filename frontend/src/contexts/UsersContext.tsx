import fakeUsers from "../tempData/fakeUsers";
import{ createContext} from "react";
import UserType from "../types/UserType";

const UsersContext = createContext<UserType[]>(fakeUsers);

export default UsersContext;