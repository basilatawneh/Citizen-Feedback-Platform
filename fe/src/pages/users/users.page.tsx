import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem } from '@mui/material';
import { Paper, TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { EUsersTypes, IUserInfo } from '../../types/user.type';
import useUsers from '../../hooks/useUsers';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from "react-toastify";
import Header from '../../components/header/header.component';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: 8 * 4,
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8 * 2,
    '& > *': {
      marginRight: 8 * 2,
    },
  },
  button: {
    marginLeft: 8 * 2,
  },
  tableHead: {
    backgroundColor: "#1976d2",
  },
  tableCell: {
    color: "#fff",
    fontWeight: 'bold',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
  tableFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 8 * 2,
  },
  error: {
    color: "#d32f2f",
    marginTop: 8 * 2,
  },
}));

function User() {
  const classes = useStyles();
  const users = useUsers();
  //   const [users, setUsers] = useState<Partial<IUserInfo>[]>([{ full_name: 'test', username: 'test', password: 'test' }, { full_name: 'test', username: 'test', password: 'test' }]);
  const [newUser, setNewUser] = useState<Partial<IUserInfo>>({ full_name: '', username: '', password: '', role: 1 });
  const [error, setError] = useState<string>('test');
  const [role, setRole] = React.useState(1);

  const rolehandleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setNewUser(prevState => ({ ...prevState, role: parseInt(value) }));

    setRole(parseInt(value));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      users.createUser(newUser)
      console.log(newUser)
      users.setUsers((prevState) => [...prevState, newUser]);
      toast.success("The user added sucessfully")
    }catch(err){
      toast.success("Error")
    }
    setNewUser({ full_name: '', username: '', password: '', role: 1 });

  };

  return (
    <div>
      <Header backPath='/home' header='Users'/>
      <TableContainer component={Paper} className={classes.container}>
        <Table>
          <TableHead className={classes.tableHead} >
            <TableRow>
              <TableCell style={{color: "#fff", fontSize: 18}} className={classes.tableCell}>Full name</TableCell>
              <TableCell style={{color: "#fff", fontSize: 18}} className={classes.tableCell}>Username</TableCell>
              <TableCell style={{color: "#fff", fontSize: 18}} className={classes.tableCell}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.users.map((user, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role === EUsersTypes.ADMIN ? 'Admin' : user.role === EUsersTypes.PUBLIC_OFFICIAL ? 'Public official' : 'Community social worker'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <form className={classes.form} onSubmit={handleCreateUser}>
        <TextField
          required={true}
          name="full_name"
          label="Full name"
          value={newUser.full_name}
          onChange={handleChange}
        />
        <TextField
          required={true}
          name="username"
          label="Username"
          value={newUser.username}
          onChange={handleChange}
        />
        <TextField
          required={true}
          name="password"
          label="Password"
          type="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={`${newUser.role}`}
          name="role"
          label="Role"
          onChange={rolehandleChange}
        >
          <MenuItem value={EUsersTypes.ADMIN}>Admin</MenuItem>
          <MenuItem value={EUsersTypes.PUBLIC_OFFICIAL}>Public official</MenuItem>
          <MenuItem value={EUsersTypes.SOCIAL_WORKER}>Community social worker</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type='submit'
        >
          Create User
        </Button>
      </form>
    </div>)
}
export default User
{/* {error && <Typography variant="body"/> */ }
