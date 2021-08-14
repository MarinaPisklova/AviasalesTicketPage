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
            let selectedStops = [];
            state.sortValues.Filters.forEach(item => {
                if (item.value) {
                    selectedStops.push(item.number);
                }
            })

            let numTicket = 0;
            let newState = {
                ...state,
                tickets: state.tickets.map(item => {
                    return {
                        ...item,
                        segments: item.segments.map(seg => {
                            return {
                                ...seg,
                                stops: seg.stops.slice(),
                            }
                        })
                    }
                }),
                sortedTickets: state.tickets.filter(ticket => {
                    let numStops = [];
                    ticket.segments.forEach(seg => { numStops.push([...seg.stops].length); });

                    var innerJoin = numStops.filter(el => { return selectedStops.includes(el) });
                    return innerJoin.length ? true : false;
                }).map(ticket => {
                    let newTicket = {
                        ...ticket,
                        segments: ticket.segments.map(seg => {
                            return {
                                ...seg,
                                stops: [...seg.stops],
                            }
                        })
                    };
                    numTicket++;
                    return newTicket;
                }),
                addTicketsButton: {
                    numTickets: numTicket < 5 ? numTicket : 5,
                    disabled: false,
                },
                sortValues: {
                    Filters: [...state.sortValues.Filters],
                    Tabs: [...state.sortValues.Tabs],
                }
            }

            if (newState.addTicketsButton.numTickets === newState.tickets.length) {
                newState.addTicketsButton.disabled = true;
            }

            if (state.sortValues.Tabs[0].value === true) {
                function byFieldPrice() {
                    return (a, b) => a.price > b.price ? 1 : -1;
                }
                newState.sortedTickets.sort(byFieldPrice());
            }
            else if (state.sortValues.Tabs[1].value === true) {
                function byFieldSpeed() {
                    return (a, b) => {
                        let durationA = a.segments.reduce((sum, item) => sum + item.duration, 0);
                        let durationB = b.segments.reduce((sum, item) => sum + item.duration, 0);
                        return durationA > durationB ? 1 : -1
                    };
                }
                newState.sortedTickets.sort(byFieldSpeed());
            }
            else if (state.sortValues.Tabs[2].value === true) {
                function optimalSort() {
                    return (a, b) => {
                        return a.weight > b.weight ? 1 : -1
                    };
                }

                //Find min of price and duration
                let minPrice = Infinity, minDuration = Infinity;
                (function () {
                    newState.sortedTickets.forEach(ticket => {
                        let sumDuration = ticket.segments.reduce((sum, item) => sum + item.duration, 0);
                        minDuration = sumDuration < minDuration ? sumDuration : minDuration;
                        minPrice = ticket.price < minPrice ? ticket.price : minPrice;
                    });
                }());

                //calc optimal weight
                newState.sortedTickets.forEach(ticket => {
                    let sumDuration = ticket.segments.reduce((sum, item) => sum + item.duration, 0);
                    ticket.weight = ticket.price / minPrice + sumDuration / minDuration;
                })

                newState.sortedTickets.sort(optimalSort());
                newState.sortedTickets.forEach(ticket => {
                    delete ticket.weight;
                });
            }

            return newState;
        }
        case GET_TICKETS: {
            let newState = {
                ...state,
                ...state.addTicketsButton,
                tickets: [...state.tickets, ...action.tickets.map(item => {
                    return {
                        ...item,
                        segments: item.segments.map(seg => {
                            return {
                                ...seg,
                                stops: [...seg.stops],
                            }
                        })
                    }
                })],
                sortedTickets: [...state.sortedTickets],
                sortValues: {
                    Filters: [...state.sortValues.Filters],
                    Tabs: [...state.sortValues.Tabs],
                }
            }
            return newState;
        }
        case SHOW_MORE_TICKETS: {
            let newNumTickets = state.addTicketsButton.numTickets + 5;
            newNumTickets = newNumTickets > state.tickets.length ? newNumTickets = state.tickets.length : newNumTickets;
            let disabledFlag = newNumTickets === state.tickets.length ? true : false;

            let newState = {
                ...state,
                tickets: state.tickets.map(ticket => {
                    return {
                        ...ticket,
                        segments: ticket.segments.map(seg => {
                            return {
                                ...seg,
                                stops: [...seg.stops],
                            }
                        })
                    }
                }),
                sortedTickets: state.sortedTickets.map(ticket => {
                    return {
                        ...ticket,
                        segments: ticket.segments.map(seg => {
                            return {
                                ...seg,
                                stops: [...seg.stops],
                            }
                        })
                    }
                }),
                addTicketsButton: {
                    numTickets: newNumTickets,
                    disabled: disabledFlag,
                },
                sortValues: {
                    Filters: [...state.sortValues.Filters],
                    Tabs: [...state.sortValues.Tabs],
                }
            }
            return newState;
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

            let newState = {
                ...state,
                tickets: state.tickets.map(ticket => {
                    return {
                        ...ticket,
                        segments: ticket.segments.map(seg => {
                            return {
                                ...seg,
                                stops: [...seg.stops],
                            }
                        })
                    }
                }),
                sortedTickets: state.sortedTickets.map(ticket => {
                    return {
                        ...ticket,
                        segments: ticket.segments.map(seg => {
                            return {
                                ...seg,
                                stops: [...seg.stops],
                            }
                        })
                    }
                }),
                ...state.addTicketsButton,
                sortValues: {
                    Filters: [...newFilters],
                    Tabs: [...state.sortValues.Tabs],
                }
            }

            return newState;
        }
        case CLICK_TABS: {
            let newState = {
                ...state,
                tickets: state.tickets.map(ticket => {
                    return {
                        ...ticket,
                        segments: ticket.segments.map(seg => {
                            return {
                                ...seg,
                                stops: [...seg.stops],
                            }
                        })
                    }
                }),
                sortedTickets: state.sortedTickets.map(ticket => {
                    return {
                        ...ticket,
                        segments: ticket.segments.map(seg => {
                            return {
                                ...seg,
                                stops: [...seg.stops],
                            }
                        })
                    }
                }),
                ...state.addTicketsButton,
                sortValues: {
                    Filters: [...state.sortValues.Filters],
                    Tabs: state.sortValues.Tabs.map(item => {
                        if (action.name === item.name) {
                            return {
                                name: item.name,
                                value: true,
                            }
                        }
                        else {
                            return {
                                name: item.name,
                                value: false,
                            }
                        }
                    }),
                }
            }
            return newState;
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
            let searchResponse = await fetch("https://front-test.beta.aviasales.ru/search");

            if (searchResponse.status !== 200) {
                await initSearchTickets();
            }
            else {
                let searchData = await searchResponse.json();
                await getChunkOfTickets(searchData, props);
            }
        }

        async function getChunkOfTickets(searchData, props) {
            let ticketsResponse = await fetch("https://front-test.beta.aviasales.ru/tickets?searchId=" + searchData.searchId);

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