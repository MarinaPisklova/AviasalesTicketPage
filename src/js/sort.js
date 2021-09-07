
export function getSortedTickets (tickets, sortValues) {
    let selectedStops = [];
    sortValues.Filters.forEach(item => {
        if (item.value) {
            selectedStops.push(item.number);
        }
    })

    let newTickets = tickets.filter(ticket => {
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
        return newTicket;
    });


    if (sortValues.Tabs[0].value === true) {
        function byFieldPrice() {
            return (a, b) => a.price > b.price ? 1 : -1;
        }
        newTickets.sort(byFieldPrice());
    }
    else if (sortValues.Tabs[1].value === true) {
        function byFieldSpeed() {
            return (a, b) => {
                let durationA = a.segments.reduce((sum, item) => sum + item.duration, 0);
                let durationB = b.segments.reduce((sum, item) => sum + item.duration, 0);
                return durationA > durationB ? 1 : -1
            };
        }
        newTickets.sort(byFieldSpeed());
    }
    else if (sortValues.Tabs[2].value === true) {
        function optimalSort() {
            return (a, b) => {
                return a.weight > b.weight ? 1 : -1
            };
        }

        //Find min of price and duration
        let minPrice = Infinity, minDuration = Infinity;
        (function () {
            newTickets.forEach(ticket => {
                let sumDuration = ticket.segments.reduce((sum, item) => sum + item.duration, 0);
                minDuration = sumDuration < minDuration ? sumDuration : minDuration;
                minPrice = ticket.price < minPrice ? ticket.price : minPrice;
            });
        }());

        //calc optimal weight
        newTickets.forEach(ticket => {
            let sumDuration = ticket.segments.reduce((sum, item) => sum + item.duration, 0);
            ticket.weight = ticket.price / minPrice + sumDuration / minDuration;
        })

        newTickets.sort(optimalSort());
        newTickets.forEach(ticket => {
            delete ticket.weight;
        });
    }

    return newTickets;
}