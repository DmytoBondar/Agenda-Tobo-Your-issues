import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material';
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


const AddIssues = () => {
    const history = useHistory();
    const [severity, setSeverity] = useState<any>("error");
    const [error, setError] = useState<string>('')
    const [open, setOpen] = useState(false);
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
                let validNumber = value.length > 5 ? true : false
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
        setSpinner(true)
        e.preventDefault();
        axios.post("https://fierce-everglades-10478.herokuapp.com/add", formData)
            .then(res => {
                setSpinner(false)
                handleClick()
                setError("Successfully Upadated")
                setSeverity("success")
                setOpen(true)
                history.push('/')
            })
            .catch(res => {
                setSpinner(false)
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

                    <Button type="submit" variant="contained" color="primary"
                            style={disabledButton ? {} : { backgroundColor: "green" }}
                            disabled={inputs.name && inputs.email && inputs.number && inputs.issues ? false : true}
                        >
                            {spinner ? "Loading..." : "Add Issues"}
                        </Button>
                    </Box>
                </Box>

                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Box>
        </div>
    )
}

export default AddIssues
