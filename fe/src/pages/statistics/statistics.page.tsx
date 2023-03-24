import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { userInfo } from '../../store/user.slice';
import classes from './statistics.module.scss';
import { TextField, Button } from '@mui/material';
import { isValidCSV, parseCSV } from '../../util/utils';
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useGetStatistics from '../../hooks/useGetStatistics';
import Piechart from '../../components/piechart/piechart.component';
interface IProps { }

const Statisitics = (props: IProps) => {
    const statisitics = useGetStatistics()
    const userData = useAppSelector(userInfo);

    return (
        <div className={classes.container}>
            {
                statisitics.statistics.map((item: any) => <Piechart data={item.data} owner={item.owner} communityName={item.communityName} userRole={userData.info.role} userId={userData.info.id}/>)
            }
                        {
                statisitics.statistics.map((item: any) => <Piechart data={item.data} owner={item.owner} communityName={item.communityName} userRole={userData.info.role} userId={userData.info.id}/>)
            }
                        {
                statisitics.statistics.map((item: any) => <Piechart data={item.data} owner={item.owner} communityName={item.communityName} userRole={userData.info.role} userId={userData.info.id}/>)
            }
        </div>
    );
}

export default Statisitics;