import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {ISearch} from "../../interfaces";
import css from './SearchMovie.module.css';
import {TextField} from '@mui/material';


const SearchMovie = () => {
    const {reset, handleSubmit, register} = useForm<ISearch>();
    const navigate = useNavigate();
    const [state, setState] = useState('');

    useEffect(() => {
        if (state) {
            navigate(`movieSearch/${state}`)
        }
    }, [state, navigate]);
    const onSubmit: SubmitHandler<ISearch> = async ({search}) => {
        setState(search);
        reset()
    }

    return (
        <div className={css.searchContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Find movie..."
                    type="search"
                    autoComplete="search"
                    variant="outlined"
                    {...register('search')}
                />
            </form>
        </div>
    );
};

export {SearchMovie};