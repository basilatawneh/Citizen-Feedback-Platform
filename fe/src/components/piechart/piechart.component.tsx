import React, { useState } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';
import { EUsersTypes, IUserInfo } from '../../types/user.type';
import { Button, CircularProgress } from '@mui/material';
import classes from './piechart.module.scss'
import axios from 'axios'
import { toast } from "react-toastify";

const COLORS = ["red", "blue", "green", "orange"]

interface IProps {
    data: { name: string, value: number }[];
    userId: string;
    userRole: number;
    owner?: IUserInfo;
    communityName?: string;
    option: number;
}

function Piechart(props: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const sendMessage = async () => {
        setIsLoading(true)
        const body = {
            "message": `Please revise the data for community ${props.communityName}`,
            "sender": props.userId,
            "reciver": props.owner?.id
        }
        const res = await axios.post(`${process.env.REACT_APP_ENDPOINT}/message`, body)
        if (res.status === 200) {
            toast.success("Message sent successfuly")
        }
        setIsLoading(false)

    }
    console.log(props.communityName)
    return (
        <div className={classes.container} >
            <div >
                <ResponsiveContainer width={300} height={250} className="text-center">
                    <PieChart width={250} height={250}>
                        <Legend layout="horizontal" verticalAlign="bottom" />
                        <Pie
                            data={props.data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {props.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className={classes.messageButton}>
                    {props.option !== 1 && <div className={classes.name}>{props.communityName}</div>}
                    {props.option !== 1 && props.userRole === EUsersTypes.PUBLIC_OFFICIAL && <Button variant="contained" type='submit' onClick={sendMessage}>{isLoading ? <CircularProgress size={24} /> : 'revise data'}</Button>}
                </div>
            </div>
        </div>
    );
}

export default Piechart;
