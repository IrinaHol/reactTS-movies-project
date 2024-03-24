import {FC, useEffect, useState} from "react";
import {Badge, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";

import {IGenre} from "../../interfaces";
import css from "./Genres.module.css";
import {genreService} from "../../services";

interface IProps {
    genre: IGenre
}

const Genre: FC<IProps> = ({genre}) => {
    const {id, name} = genre;
    const [movieCount, setMovieCount] = useState(0);

    useEffect(() => {
        genreService.getMoviesCountByGenre(id)
            .then(({data}) => {
                const {total_results} = data;
                setMovieCount(total_results);
            })
    }, [id]);

    return (
        <div>
            <NavLink to={`/moviesByGenre/${id}`}>
                <Stack spacing={6} direction="row"><Badge color="secondary" badgeContent={movieCount} max={1000000}> <span
                    className={css.titleGenre}>{name} </span></Badge></Stack>
            </NavLink>
        </div>
    );
};

export {Genre};