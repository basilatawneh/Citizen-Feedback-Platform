import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { userInfo } from '../../store/user.slice';
import classes from './statistics.module.scss';
import { TextField, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { isValidCSV, parseCSV } from '../../util/utils';
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useGetStatistics from '../../hooks/useGetStatistics';
import Piechart from '../../components/piechart/piechart.component';
import Header from '../../components/header/header.component';
interface IProps { }

const Statisitics = (props: IProps) => {
    const userData = useAppSelector(userInfo);
    const [option, setOption] = useState(1);
    const statisitics = useGetStatistics(option)
    const optionhandleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setOption(parseInt(value))
    };
    return (
        <>
            <Header backPath='/home' header='Statistics' />
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={`${option}`}
                name="role"
                label="Role"
                onChange={optionhandleChange}
            >
                <MenuItem value={1}>all data of all communities</MenuItem>
                <MenuItem value={2}>group by community name</MenuItem>
            </Select>
            <div className={classes.container}>
                {
                    statisitics.statistics.map((item: any) => <Piechart
                        data={item.data}
                        owner={item.owner}
                        communityName={item.communityName}
                        userRole={userData.info.role}
                        userId={userData.info.id}
                        option={option}
                    />)
                }
            </div>
        </>
    );
}

export default Statisitics;