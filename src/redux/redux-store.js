import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import ticketReducer from "./ticket-reducer";

let reducers = combineReducers({
    ticketPage: ticketReducer,
})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;