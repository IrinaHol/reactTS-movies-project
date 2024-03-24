import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {Genre} from "./Genre";
import css from './Genres.module.css'

const Genres = () => {
    const {genres} =  useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getAllGenres())
    }, []);

    return (
        <div className={css.genreContainer}>
            {genres?.genres.map(genre => (
                <div className={css.navGenreBox} key={genre.id}>
                    <Genre genre={genre} />
                </div>
            ))}
        </div>
    );
};

export {Genres};