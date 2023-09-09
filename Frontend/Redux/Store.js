import {legacy_createStore} from "redux";
import MyReducer from "./MyReducer";

let store=legacy_createStore(MyReducer);

export default store;