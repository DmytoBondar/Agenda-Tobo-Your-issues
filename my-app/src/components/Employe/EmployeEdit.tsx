import { Box, Button, TextField, Typography } from '@material-ui/core';
import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import Modal from 'react-modal';
import { IProps } from '../../type';


const EmployeEdit = ({ modalIsOpen, closeModal, name, issues, email, id, number, handleClick, setError, setSeverity, setOpen }: IProps) => {
    const [inputs, setInputs] = useState({ name: false, issues: false, email: false, number: false });
    const [initView, setInitView] = useState({ name: true, email: true, issues: true, number: true });
    const [disabledButton] = useState(true);
    const [spinner, setSpinner] = useState(false);
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
        setSpinner(true)
        e.preventDefault()
        axios.patch(`http://localhost:5050/update/${id}`, formData)
            .then(res => {
                setSpinner(false)
                closeModal()
                handleClick()
                setError("succesfully Updated Agenda")
                setSeverity("success")
                setOpen(true)
            })
            .catch(err => {
                setSpinner(false)
                closeModal()
                handleClick()
                setError("sorry, Something went wrong")
                setSeverity("error")
                setOpen(true)
            })
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >

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
                        <Button type="submit" variant="contained" color="primary"
                            style={disabledButton ? {} : { backgroundColor: "green" }}
                            disabled={inputs.name && inputs.email && inputs.number && inputs.issues ? false : true}
                        >
                            {spinner ? "Loading..." : "Update"}
                        </Button>


                    </Box>
                </Box>

            </Box>

        </Modal>
    )
}

export default EmployeEdit
