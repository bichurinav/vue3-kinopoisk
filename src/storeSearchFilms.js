function storeSearchFilms() {
    let state = {
        films: JSON.parse(localStorage.getItem('searchFilms')) || [],
    }
    return {
        addSearchFilms(films) {
            const changedData = [...state.films, ...films];
            state.films = changedData;
            localStorage.setItem('searchFilms', JSON.stringify(changedData));
        },
        getSearchFilms() {
            return state.films
        },
        delSearchFilms() {
            state.films = [];
            localStorage.setItem('searchFilms', JSON.stringify([]));
        }
    }
}

export default storeSearchFilms;