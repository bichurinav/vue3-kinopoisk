function storeFavorite() {
    let state = {
        films: JSON.parse(localStorage.getItem('favoriteFilms')) || [],
        filter: localStorage.getItem('favoriteFilter') || 'Все фильмы',
    }
    state.counter = state.films.length;
    return {
        addFilm(film) {
            if (state.length !== 0) {
                const equalFilm = state.films.find((item) => {
                    return (film['kinopoiskId'] || film['filmId']) === (item['kinopoiskId'] || item['filmId'])
                })
                if (equalFilm) return false;
            }
            const changedData = [...state.films, {...film, isFavorite: true, isWatched: false}];
            state.films = changedData;
            localStorage.setItem('favoriteFilms', JSON.stringify(changedData))
        },
        getFilms() {
            return state.films;
        },
        getState() {
            return state
        },
        saveFilter(filter) {
            state.filter = filter;
            localStorage.setItem('favoriteFilter', filter)
        },
        markFilm(id) {
          const films = state.films.map(film => {
              if ((film['filmId'] || film['kinopoiskId']) === id) {
                return {...film, isWatched: !film['isWatched']}
              }
              return film;
          })
          state = films;
          localStorage.setItem('favoriteFilms', JSON.stringify(films))
        },
        delFilm(id) {
            const films = state.films.filter((film) => {
                return (film['filmId'] || film['kinopoiskId']) !== id
            })
            state = films;
            localStorage.setItem('favoriteFilms', JSON.stringify(films))
        }
    }
}

export default storeFavorite;