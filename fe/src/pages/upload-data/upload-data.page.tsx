import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { userInfo } from '../../store/user.slice';
import classes from './upload-data.module.scss';
import { TextField, Button } from '@mui/material';
import { isValidCSV, parseCSV } from '../../util/utils';
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
interface IProps { }

const UploadData = (props: IProps) => {
    const userData = useAppSelector(userInfo);
    const navigate = useNavigate();

    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [communityName, setCommunityName] = useState<string>("");
    const [communitySize, setCommunitySize] = useState<number>(0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setCsvFile(files[0]);
        }
    };

    const submutHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(communityName, communitySize)
        if (csvFile) {
            const reader = new FileReader();
            reader.readAsText(csvFile);
            reader.onload = async (event) => {
                const csvData = parseCsvData(event.target?.result as string);
                const isValid = isValidCSV(csvData)
                if (isValid) {
                    const body = {
                        owner: userData.info.id,
                        data: parseCSV(csvData),
                        community_name: communityName,
                        community_size: communitySize
                    }
                    console.log(body)
                    const res = await axios.post(`${process.env.REACT_APP_ENDPOINT}/feedback`, body)
                    if (res.status === 200) {
                        toast.success("feedbacks uploaded successfully");
                    }
                } else {
                    toast.error("CSV data incorrect");
                }

                setCommunityName("")
                setCommunitySize(0)
                setCsvFile(null)
            };
        }
    };

    const parseCsvData = (csvString: string): string[][] => {
        const lines = csvString.split('\n');
        return lines.map((line) => line.split(','));
    };

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submutHandler}>
                <div className={classes.header}>Upload Data</div>
                <div className={classes.csvUpload}> <input type="file" required={true} onChange={handleFileChange} /></div>
                <TextField
                    className={classes.name}
                    value={communityName}
                    required={true}
                    onChange={(e) => setCommunityName(e.target.value)}
                    label="Community Name"
                    variant="outlined"
                    name='community_name'
                />
                <TextField
                    className={classes.size}
                    value={communitySize}
                    required={true}
                    type="number"
                    onChange={(e) => setCommunitySize(parseInt(e.target.value))}
                    label="Community Size"
                    variant="outlined"
                    name='community_size'
                />
                <div className={classes.buttons}>
                    <Button variant="contained" type='submit' onClick={() => navigate("/home")}>Back</Button>
                    <Button variant="contained" type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default UploadData;