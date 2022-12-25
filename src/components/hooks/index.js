const useAddFilmToFavorite = (store, emitter) => {
  return function (film) {
    const status = store.value.addFilm(film);
    if (status === false) {
      const name = film['nameRu'] || film['nameEn'] || film['originalName'];
      alert(`Фильм: ${name} уже добавлен в избранное!`);
    }
    emitter.emit('updateCounter', store.value.getFilms().length);
  };
};

const useGetFilmId = () => {
  return function (film) {
    return film['kinopoiskId'] || film['filmId'];
  };
};

export { useAddFilmToFavorite, useGetFilmId };
