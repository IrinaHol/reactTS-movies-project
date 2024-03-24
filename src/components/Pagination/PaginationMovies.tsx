import {Pagination, Stack} from '@mui/material';
import {FC} from "react";

import css from './PaginationMovies.module.css';
import {useAppSelector} from "../../hooks";

interface IProps {
    page: number,
    onChange: (event: any, value: number) => void,
    count: number
}

const PaginationMovies: FC<IProps> = ({page, onChange, count}) => {
    const {theme} = useAppSelector(state => state.theme);

    return (
        <div className={theme ? css.paginationLight : css.paginationDark}>
            <Stack spacing={2}>
                <Pagination
                    className={css.muiSelected}
                    count={count}
                    page={page}
                    onChange={onChange}
                    variant="outlined"
                    size="large"
                />
            </Stack>
        </div>
    );
};

export {PaginationMovies};