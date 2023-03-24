import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { userInfo } from '../store/user.slice';
import { EUsersTypes } from '../types/user.type';

const useGetStatistics = (option: number) => {
    const [statistics, setStatistics] = useState([])
    const userData = useAppSelector(userInfo);

    const getData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_ENDPOINT}/feedback/${option === 1 ? 'true' : 'false'}${userData.info.role === EUsersTypes.SOCIAL_WORKER ? '/' + userData.info.id : ''}`)
        const finalData = res.data.map((item: any) => ({
            owner: { ...item.owner[0], id: item.owner[0]._id },
            communityName: item._id,
            data: [
                { name: 'Family', value: item.famil_total },
                { name: 'health', value: item.health_total },
                { name: 'Unknown', value: item.unknown_total }
            ]
        }));

        setStatistics(finalData)
    }
    useEffect(() => {
        getData()
    }, [option])
    return { statistics, setStatistics, getData }
}

export default useGetStatistics;