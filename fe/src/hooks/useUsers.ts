import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { userInfo } from '../store/user.slice';
import { EUsersTypes, IUserInfo } from '../types/user.type';

const useUsers = () => {
    const [users, setUsers] = useState<Partial<IUserInfo>[]>([])

    const getData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_ENDPOINT}/user`)
        console.log(res)
        setUsers(res.data)
    }

    const createUser = async (user: Partial<IUserInfo>) => {
        const res = await axios.post(`${process.env.REACT_APP_ENDPOINT}/user`, user)
        return res
    }

    useEffect(() => {
        getData()
    }, [])
    return { users, setUsers, getData, createUser }
}

export default useUsers;