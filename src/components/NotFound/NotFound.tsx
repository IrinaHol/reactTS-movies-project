import {useNavigate} from "react-router-dom";
import {Box, Typography, Button} from '@mui/material';
import {yellow} from '@mui/material/colors';

const primary = yellow[500];
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                backgroundColor: primary,
            }}
        >
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="h4">
                The page you’re looking for doesn’t exist.
            </Typography>

            <Button variant="contained" style={{color: 'white', backgroundColor: 'black', marginTop: '18px'}}
                    onClick={() => navigate('movies')}>Back Home</Button>
        </Box>
    );
};

export {NotFound};