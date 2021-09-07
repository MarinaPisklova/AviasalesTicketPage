import { getSearchResponse, getTicketsResponse } from "../api/api"
import { getSortedTickets } from './../js/sort';

const SORT_TICKETS = "SORT_TICKETS";
const GET_TICKETS = "GET_TICKETS";
const SHOW_MORE_TICKETS = "SHOW_MORE_TICKETS";
const CHANGE_CHECKBOX = "CHANGE_CHECKBOX";
const CLICK_TABS = "CLICK_TABS";

let initialState = {
    tickets: [],
    sortedTickets: [],
    addTicketsButton: {
        numTickets: 0,
        disabled: true,
    },
    sortValues: {
        Filters: [
            { name: "Все", value: true, number: 4 },
            { name: "Без пересадок", value: true, number: 0 },
            { name: "1 пересадка", value: true, number: 1 },
            { name: "2 пересадки", value: true, number: 2 },
            { name: "3 пересадки", value: true, number: 3 },
        ],
        Tabs: [
            { name: "Самый дешевый", value: true },
            { name: "Самый быстрый", value: false },
            { name: "Оптимальный", value: false },
        ]
    },
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case SORT_TICKETS: {
            let newSortedTickets = getSortedTickets(state.tickets, state.sortValues);
            let newAddTicketsButton = {
                numTickets: newSortedTickets.length < 5 ? newSortedTickets.length : 5,
                disabled: false,
            };

            if (newAddTicketsButton.numTickets === newSortedTickets.length) {
                newAddTicketsButton.disabled = true;
            }

            return Object.assign({}, state, { sortedTickets: newSortedTickets, addTicketsButton: newAddTicketsButton });
        }
        case GET_TICKETS: {
            let newTickets = [...state.tickets, ...action.tickets.map(item => {
                return {
                    ...item,
                    segments: item.segments.map(seg => {
                        return {
                            ...seg,
                            stops: [...seg.stops],
                        }
                    })
                }
            })];

            return Object.assign({}, state, { tickets: newTickets });
        }
        case SHOW_MORE_TICKETS: {
            let newNumTickets = state.addTicketsButton.numTickets + 5;
            newNumTickets = newNumTickets > state.tickets.length ? newNumTickets = state.tickets.length : newNumTickets;
            let disabledFlag = newNumTickets === state.tickets.length ? true : false;

            let newAddTicketsButton = {
                numTickets: newNumTickets,
                disabled: disabledFlag,
            }

            return Object.assign({}, state, { addTicketsButton: newAddTicketsButton });
        }
        case CHANGE_CHECKBOX: {
            let newFilters = [];
            if (action.name === "Все") {
                let newValue = !state.sortValues.Filters[0].value;
                newFilters = state.sortValues.Filters.map(elem => {
                    return {
                        name: elem.name,
                        value: newValue,
                        number: elem.number,
                    }
                });
            }
            else {
                let isAllChoice = true;
                newFilters = state.sortValues.Filters.map(elem => {
                    let newValue = action.name === elem.name ? !elem.value : elem.value;
                    if (elem.name !== "Все") {
                        if (newValue === false)
                            isAllChoice = false;
                    }
                    return {
                        name: elem.name,
                        value: newValue,
                        number: elem.number,
                    }
                });
                newFilters[0].value = isAllChoice;
            }

            let newSortValues = Object.assign({}, state.sortValues, { Filters: newFilters });
            let newSortedTickets = getSortedTickets(state.tickets, newSortValues);
            let newAddTicketsButton = {
                numTickets: newSortedTickets.length < 5 ? newSortedTickets.length : 5,
                disabled: false,
            };

            if (newAddTicketsButton.numTickets === newSortedTickets.length) {
                newAddTicketsButton.disabled = true;
            }

            return Object.assign({}, state, { sortValues: newSortValues, sortedTickets: newSortedTickets, addTicketsButton: newAddTicketsButton });
        }
        case CLICK_TABS: {
            let newTabs = state.sortValues.Tabs.map(item => {
                let newValue = action.name === item.name;

                return {
                    name: item.name,
                    value: newValue,
                }
            });

            let newSortValues = Object.assign({}, state.sortValues, { Tabs: newTabs });
            let newSortedTickets = getSortedTickets(state.tickets, newSortValues);
            let newAddTicketsButton = {
                numTickets: newSortedTickets.length < 5 ? newSortedTickets.length : 5,
                disabled: false,
            };

            if (newAddTicketsButton.numTickets === newSortedTickets.length) {
                newAddTicketsButton.disabled = true;
            }

            return Object.assign({}, state, { sortValues: newSortValues, sortedTickets: newSortedTickets, addTicketsButton: newAddTicketsButton });
        }
        default: {
            return state;
        }
    }
}

export const sortTickets = () => ({ type: SORT_TICKETS });
export const aggregateTickets = (tickets) => ({ type: GET_TICKETS, tickets });
export const showMoreTickets = () => ({ type: SHOW_MORE_TICKETS });
export const onChangeCheckbox = (name) => ({ type: CHANGE_CHECKBOX, name });
export const onClickTabs = (name) => ({ type: CLICK_TABS, name });

export const getTickets = (props) => {
    return (dispatch) => {
        initSearchTickets(props);

        async function initSearchTickets(props) {
            let searchResponse = await getSearchResponse();

            if (searchResponse.status !== 200) {
                await initSearchTickets();
            }
            else {
                let searchData = await searchResponse.json();
                await getChunkOfTickets(searchData, props);
            }
        }

        async function getChunkOfTickets(searchData, props) {
            let ticketsResponse = await getTicketsResponse(searchData.searchId);

            if (ticketsResponse.status !== 200) {
                await getChunkOfTickets(searchData, props);
            }
            else {
                let ticketsData = await ticketsResponse.json();
                dispatch(aggregateTickets(ticketsData.tickets));
                if (ticketsData.stop === false) {
                    await getChunkOfTickets(searchData, props);
                }
                else {
                    dispatch(sortTickets());
                }
            }
        }
    }
}

export default ticketReducer;