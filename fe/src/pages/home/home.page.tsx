import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface IProps { }

const theme = createTheme();

const Home = (props: IProps) => {

    const navigate = useNavigate();

    return (
        <div>
            <Button variant="contained" type='submit' onClick={() => navigate("/upload-data")}>upload data</Button>
            <Button variant="contained" type='submit' onClick={() => navigate("/statistics")}>Review statistics</Button>
            <Button variant="contained" type='submit' onClick={() => navigate("/upload-data")}>upload data</Button>

        </div>
    );
}

export default Home;