import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

import {genreService} from "../../services";
import {IGenre, IGenres} from "../../interfaces";
import css from './GenreBadge.module.css';

const GenreBadge = () => {
    const [genres, setGenres] = useState<IGenres<IGenre[]>>({
        genres: []
    })

    useEffect(() => {
        genreService.getAllGenres().then(({data}) => setGenres(data))
    }, []);

    return (
            <div className={css.genreContainer}>
                {genres.genres.map(item => (
                    <div key={item.id} className={css.navGenreBox}>
                        <NavLink to={`/moviesByGenre/${item.id}`}>
                            <Stack spacing={3} direction="row"><Badge color="secondary" badgeContent={item.name}> <span
                                className={css.titleGenre}>{item.name} </span></Badge></Stack></NavLink>
                    </div>
                ))}
            </div>
    );
};

export {GenreBadge};