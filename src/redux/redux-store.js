import { combineReducers, createStore } from "redux";
import ticketReducer from "./ticket-reducer";

let reducers = combineReducers({
    ticketPage: ticketReducer, 
})

let store = createStore(reducers);

export default store;