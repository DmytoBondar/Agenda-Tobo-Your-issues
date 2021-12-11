import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeEdit from './EmployeEdit';
import useAsync from '../hooks/useAsync';
import IssuesServices from '../services/IssuesServices';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Employe = () => {
    const { data} = useAsync(IssuesServices.getIssues);
    const [open, setOpen] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) }
    const closeModal = () => { setIsOpen(false) }
    const [severity, setSeverity] = useState<any>("error");
    const [error, setError] = useState<string>('')

    const handleDelete = async (id: any) => {
        await axios.delete(`https://fierce-everglades-10478.herokuapp.com/delete/${id}`)
            .then(res => {
                handleClick()
                setError("Successfully Delete")
                setSeverity("success")
                setOpen(true)
            })
            .catch(err => {
                handleClick()
                setError("Something went wrong")
                setSeverity("error")
                setOpen(true)
            })
    }

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <section>
            <div className="container">
                <h4 className="mb-3 text-center mt-4">CRUD Operation in MERN</h4>
                <div className="row mt-3">
                    <Link to='/add'><button className="btn btn-primary">ADD New Issues</button></Link>
                    <div className="d-flex justify-content-center">
                        <div className="col-sm-8 text-center mt-2">
                            <table className="table table-hover  table-striped table-bordered ml-4 ">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Number</th>
                                        <th>Isses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item: any) => (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.number}</td>
                                            <td>{item.issues}</td>
                                            <td>

                                                <div className='d-flex'>
                                                    <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm me-2">delete</button>
                                                    <button onClick={openModal} className="btn btn-primary btn-sm">Edit</button>
                                                    <EmployeEdit modalIsOpen={modalIsOpen} closeModal={closeModal} id={item._id} number={item.number} name={item.name} issues={item.issues} email={item.email}
                                                        handleClick={handleClick} setError={setError} setSeverity={setSeverity} setOpen={setOpen}
                                                    />
                                                </div>

                                            </td>
                                        </tr>
                                    )
                                    )

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>
                </Stack>

            </div>
        </section >
    )
}

export default Employe
