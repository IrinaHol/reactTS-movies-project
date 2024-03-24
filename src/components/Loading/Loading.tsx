import {Stack} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <Stack sx={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress sx={{color: 'black'}} />
        </Stack>
    );
};

export {Loading};