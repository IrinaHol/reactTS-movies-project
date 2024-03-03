import {FC} from "react";
import {NavLink} from "react-router-dom";

import css from './MovieCard.module.css'
import {PosterPreview} from "../../PosterPreview";
import {StarsRating} from "../../StarsRating";
import {IMovie} from "../../../interfaces";
import {useAppContext} from "../../../hooks";

interface IProps {
    id: number,
    state: IMovie,
    poster_path: string,
    title: string,
    rating: number
}

const MovieCard: FC<IProps> = ({poster_path, rating, title, state, id}) => {
    const {theme,} = useAppContext();

    return (
        <div className={theme ? css.movieCardContainerWhite : css.movieCardContainer}>
            <NavLink to={`/movie/${id}`} state={state}>
                <div className={css.poster}><PosterPreview poster_path={poster_path} title={title}/></div>
                <div className={css.infoMovie}>
                    <h4 className={css.titleMovie}>{title}</h4>
                    <StarsRating rating={rating}/>
                </div>
            </NavLink>
        </div>
    );
};

export {MovieCard};