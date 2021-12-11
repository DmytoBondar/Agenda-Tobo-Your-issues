import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material';


const AddIssues = () => {
    const history = useHistory();
    const [inputs, setInputs] = useState({ name: false, issues: false, email: false, number: false });
    const [initView, setInitView] = useState({ name: true, email: true, issues: true, number: true });
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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post("http://localhost:5050/add", formData)
            .then(res => {
                console.log("okay", res)
                history.push('/em')
            })
            .catch(res => {
                console.log("error")
            })
    }

    return (
        <div>
           
            <Box >
                <Box my={1} px={2}>
                    <Typography variant="h5">Sign Up</Typography>
                </Box>
                <Box mt={8} pb={1} px={2} component="form" onSubmit={handleSubmit}>
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
                    />

                    <Box mt={2} display="flex" justifyContent="center" alignItems="center">

                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                    </Box>
                </Box>

            </Box>


            
        </div>
    )
}

export default AddIssues
