function storeFavorite() {
    let state = JSON.parse(localStorage.getItem('favoriteFilms')) || [];

    return {
        addFilm(film) {
            if (state.length !== 0) {
                const equalFilm = state.find((item) => {
                    return (film['kinopoiskId'] || film['filmId']) === (item['kinopoiskId'] || item['filmId'])
                })
                if (equalFilm) return false;
            }
            const changedData = [...state, film];
            state = changedData;
            localStorage.setItem('favoriteFilms', JSON.stringify(changedData))
        },
        getFilms() {
            return state;
        },
        delFilm(id) {
            const films = state.filter((film) => {
                return (film['filmId'] || film['kinopoiskId']) !== id
            })
            state = films;
            localStorage.setItem('favoriteFilms', JSON.stringify(films))
        }
    }
}

export default storeFavorite;