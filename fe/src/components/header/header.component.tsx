import { Button } from '@mui/material';
import classes from './header.module.scss'
import { useNavigate } from 'react-router-dom';

interface IProps {
    header: string;
    backPath: string;
}

function Header(props: IProps) {
    const navigate = useNavigate();
    return (
        <div className={classes.container} >
            <div className={classes.back}>
                <Button variant="contained" type='submit' onClick={() => navigate(props.backPath)}>Back</Button>
            </div>
            <div className={classes.header}>
                <h1 >
                    {props.header}
                </h1>
            </div>
        </div>
    );
}

export default Header;
