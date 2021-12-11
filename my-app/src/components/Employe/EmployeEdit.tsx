import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal';
import { Box, Button, IconButton, Snackbar, TextField, Typography } from '@mui/material';


interface iProps {
    _id: string
    name: string;
    email: string
    status: string
    issues: string
    assigne: string
    salary: string
    number: string
}
interface Props {
    modalIsOpen: any;
    closeModal: any;
    name: string;
    issues: string;
    email: string;
    id: string
    number:string;

}

const EmployeEdit = ({ modalIsOpen, closeModal, name, issues, email, id, number }: Props) => {
    const [inputs, setInputs] = useState({ name: false, issues: false, email: false, number: false });
    const [initView, setInitView] = useState({ name: true, email: true, issues: true, number: true });
    const [data, setData] = useState<iProps>({} as iProps)
    const [formData, setFormData] = useState({
        name: '',
        issues: '',
        email: '',
        number: '',
    })
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = event.target;
        switch (name) {
            case 'name':
                let validFullName = value.length > 3 ? true : false
                setInitView(initView => ({ ...initView, [name]: false }))
                setInputs(inputs => ({ ...inputs, [name]: validFullName }))
                if (validFullName) {
                    setFormData({ ...formData, [name]: value });
                }
                break;
            case 'email':
                let validEmail = /\S+@\S+\.\S+/.test(value) ? true : false
                setInitView(initView => ({ ...initView, [name]: false }))
                setInputs(inputs => ({ ...inputs, [name]: validEmail }))
                if (validEmail) {
                    setFormData({ ...formData, [name]: value });
                }
                break;
            case 'number':
                let validNumber = value.length > 3 ? true : false
                setInitView(initView => ({ ...initView, [name]: false }))
                setInputs(inputs => ({ ...inputs, [name]: validNumber }))
                if (validNumber) {
                    setFormData({ ...formData, [name]: value });
                }
                break;
            case 'issues':
                let validIssues = value.length > 5 ? true : false
                setInitView(initView => ({ ...initView, [name]: false }))
                setInputs(inputs => ({ ...inputs, [name]: validIssues }))
                if (validIssues) {
                    setFormData({ ...formData, [name]: value });
                }
                break;
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    Modal.setAppElement('#root')



    const handleEditSubmit = (e: any) => {
        console.log(formData)
        e.preventDefault()

        axios.patch(`http://localhost:5050/update/${id}`, formData)
            .then(res => {
                console.log("okay")
            })
            .catch(err => {
                console.log("error happend")
            })
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >

            {/* <div className="box p-3 mb-3 mt-5" style={{ border: "1px solid #d0d0d0" }}>
                        <form onSubmit={handleEditSubmit}>
                            <h5 className="mb-3 ">Insert Employee Records</h5>
                            <div className="form-group">
                                <input type="text" className="form-control  mb-4" name="name" onChange={handleChange}
                                    defaultValue={name}
                                    placeholder="Enter name" required />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control  mb-4" name="issues" onChange={handleChange} defaultValue={issues} placeholder="Enter Sirname" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control mb-4" name="email" onChange={handleChange} defaultValue={email} placeholder="Enter Email" required />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control mb-4" name="number" onChange={handleChange} placeholder="Enter Email" required />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mt-4">Update</button>
                        </form>
                    </div> */}



            <Box >
                <Box my={1} px={2}>
                    <Typography variant="h5">Sign Up</Typography>
                </Box>
                <Box mt={8} pb={1} px={2} component="form" onSubmit={handleEditSubmit}>
                    <TextField
                        fullWidth
                        error={inputs.name ? false : !initView.name}
                        helperText="Incorrect name."
                        FormHelperTextProps={{ hidden: inputs.name ? true : initView.name }}
                        id="input-with-icon-full-name"
                        label="Full Name"
                        onChange={handleChange}
                        name="name"
                        required
                        autoFocus
                        defaultValue={name}
                    />

                    <TextField
                        fullWidth
                        error={inputs.email ? false : !initView.email}
                        helperText="Incorrect email."
                        FormHelperTextProps={{ hidden: inputs.email ? true : initView.email }}
                        id="input-with-icon-email"
                        label="Email"
                        type='email'
                        required
                        onChange={handleChange}
                        name="email"
                        defaultValue={email}
                    />

                    <TextField
                        fullWidth
                        error={inputs.number ? false : !initView.number}
                        helperText="The password must contain at least 8 characters and a number."
                        FormHelperTextProps={{ hidden: inputs.number ? true : initView.number }}
                        id="input-with-icon-Password"
                        label="number"
                        type='text'
                        onChange={handleChange}
                        name="number"
                        required
                        defaultValue={number}
                    />

                    <TextField
                        fullWidth
                        error={inputs.issues ? false : !initView.issues}
                        helperText="The confirmation password must be the same as password."
                        FormHelperTextProps={{ hidden: inputs.issues ? true : initView.issues }}
                        id="input-with-icon-ConfirmPassword"
                        label="issues"
                        type='text'
                        onChange={handleChange}
                        name="issues"
                        required
                        autoComplete="name"
                        defaultValue={issues}
                    />

                    <Box mt={2} display="flex" justifyContent="center" alignItems="center">

                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                    </Box>
                </Box>

            </Box>

        </Modal>
    )
}

export default EmployeEdit
