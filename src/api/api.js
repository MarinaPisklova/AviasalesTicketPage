export function getSearchResponse() {
    return fetch("https://front-test.beta.aviasales.ru/search");
}

export function getTicketsResponse(searchID) {
    return fetch("https://front-test.beta.aviasales.ru/tickets?searchId=" + searchID);
}

