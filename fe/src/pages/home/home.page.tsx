import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { userInfo } from '../../store/user.slice';
import { EUsersTypes } from '../../types/user.type';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 8 * 2,
    },
    button: {
        marginBottom: '10px !important',
        fontWeight: 600,
        fontSize: '24px !important',
        borderRadius: 8 * 2,
        padding: 1.5 * 3,

    },
    logout: {
        color: '#ffffff',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        '&:hover': {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        },
    },
    statisticsButton: {
        color: '#ffffff',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        '&:hover': {
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        },
    },
}));

const Home = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const userData = useAppSelector(userInfo);

    // import React from 'react';
    return (
        <div className={classes.root}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                    <Typography variant="h3" align="center" gutterBottom>
                        Welcome to Citizen Feedback Platform App!
                    </Typography>
                </Grid>
                <div className={classes.buttonContainer}>

                    {userData.info.role === EUsersTypes.SOCIAL_WORKER && <>
                        <Button variant="contained" className={`${classes.button} ${classes.statisticsButton}`} onClick={() => navigate("/upload-data")}>upload data</Button>
                    <Button variant="contained" className={`${classes.button} ${classes.statisticsButton}`} onClick={() => navigate("/messages")}>Messages</Button>
                    </>}
                    {[EUsersTypes.SOCIAL_WORKER, EUsersTypes.PUBLIC_OFFICIAL].includes(userData.info.role) &&
                        <Button variant="contained" className={`${classes.button} ${classes.statisticsButton}`} onClick={() => navigate("/statistics")}>Review statistics</Button>}
                    {userData.info.role === EUsersTypes.ADMIN &&
                        <Button variant="contained" className={`${classes.button} ${classes.statisticsButton}`} onClick={() => navigate("/users")}>Users</Button>}
                    <Button variant="contained" className={`${classes.button} ${classes.logout}`} onClick={() => navigate("/login")}>Logout</Button>
                </div>
            </Grid>
        </div>
    );
};

export default Home;
