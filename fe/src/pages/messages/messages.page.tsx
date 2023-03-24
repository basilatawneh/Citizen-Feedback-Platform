import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import Header from '../../components/header/header.component';
import { useAppSelector } from '../../app/hooks';
import { userInfo } from '../../store/user.slice';
import axios from 'axios';


const Messages = () => {
  const userData = useAppSelector(userInfo);
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const res = await axios.get(`${process.env.REACT_APP_ENDPOINT}/message/${userData.info.id}`);
    setMessages(res.data)
  };

  useEffect(()=>{
    getMessages()
  }, []);

  return (
    <>
    <Header backPath='/home' header='Messages'/>
      <List>
        {messages.map((message: any) => (
          <>
            <ListItem key={message.id}>
              <ListItemText primary={message.message} />
            </ListItem>
            <Divider variant="inset" component="li" style={{ marginLeft: 0 }} />
          </>
        ))}
      </List>
    </>
  );
};

export default Messages;