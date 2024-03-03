import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {FC} from "react";

import css from './PaginationMovies.module.css';
import {useAppContext} from "../../hooks";

interface IProps {
    page: number,
    onChange: (event: any, value: number) => void,
    count: number
}

const PaginationMovies: FC<IProps> = ({page, onChange, count}) => {
    const {theme,} = useAppContext();
    return (
        <div className={theme ? css.paginationLight : css.paginationDark}>
            <Stack spacing={2}>
                <Pagination count={count} page={page} onChange={onChange}
                            variant="outlined" size="large" color="standard"/>
            </Stack>
        </div>
    );
};

export {PaginationMovies};