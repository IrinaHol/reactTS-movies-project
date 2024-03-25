import {FC} from "react";
import {Rating} from "@mui/material";

import css from './StarsRating.module.css'

interface IProps {
    rating: number
}

const StarsRating: FC<IProps> = ({rating}) => {

    const rate = Math.round(rating * 2) / 2;

    return (
        <div>
            <Rating
                className={css.rating}
                name="movie-rating"
                size="small"
                value={rate}
                precision={0.5}
                max={10}
                readOnly
            />
        </div>
    );
};

export {StarsRating};