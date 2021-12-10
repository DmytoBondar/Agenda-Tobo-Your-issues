import axios from 'axios'
import React, { ChangeEvent, useState, useEffect, DetailedHTMLProps, AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

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


const Employe = () => {
    const [editBtn, setEditBtn] = useState<boolean>(false)
    const [EditId, setEditId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        issues: '',
        email: '',
        number: '',
    })
    const [data, setData] = useState<iProps[]>([] as iProps[])

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // let { name, value } = event.target;
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        const getData = () => {
            axios("http://localhost:5050/agenda")
                .then(res => {
                    setData(res.data)
                })
                .catch((err) => {
                    console.log("error")
                })
        }
        getData()
    }, [])


    const handleSubmit = (e: any) => {
        setEditBtn(false)
        e.preventDefault();
        console.log()
        axios.post("http://localhost:5050/add", formData)
            .then(res => {
                console.log("okay", res)
            })
            .catch(res => {
                console.log("error")
            })
    }
    const handleDelete = (id: any) => {
        setEditBtn(false)
        console.log(id)
        axios.delete(`http://localhost:5050/delete/${id}`)
            .then(res => {
                console.log("delete")
            })
            .catch(err => {
                console.log("error")
            })
    }
    const handleClickEdit = (id: any) => {
        setEditId(id)
        setEditBtn(!editBtn)
        const newForm = (data.find((item) => item._id === id))
        if (newForm) {
            setFormData({ ...formData, email: newForm.email, number: newForm.number, issues: newForm.issues, name: newForm.name });
        }
    }

    const handleEditSubmit = () => {
        if(EditId){
            axios.patch(`http://localhost:5050/delete/${EditId}`, formData)
            .then(res =>{
                console.log("okay")
            })
            .catch(err =>{
                console.log("error happend")
            })

        }
    }

    return (
        <section>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active ">
                            sssssssss
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link text-white" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">Detail</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">Address</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <h4 className="mb-3 text-center mt-4">CRUD Operation in MERN</h4>
                <div className="row mt-3">
                    <div className="col-sm-4">
                        <div className="box p-3 mb-3 mt-5" style={{ border: "1px solid #d0d0d0" }}>
                            <form onSubmit={handleSubmit}>
                                <h5 className="mb-3 ">Insert Employee Records</h5>
                                <div className="form-group">
                                    <input type="text" className="form-control  mb-4" name="name" onChange={handleChange}
                                     value={editBtn ? formData.name : ''}
                                     placeholder="Enter name" required />
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control  mb-4" name="issues" onChange={handleChange} value={editBtn ? formData.issues : ''} placeholder="Enter Sirname" required />
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control mb-4" name="email" onChange={handleChange} value={editBtn ? formData.email : ''} placeholder="Enter Email" required />
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control mb-4" name="number" onChange={handleChange} value={editBtn ? formData.number : ''} placeholder="Enter Email" required />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mt-4">Insert Record</button>
                                {editBtn && <button type="submit" className="btn btn-primary btn-block mt-4" onClick={handleEditSubmit}>Updata Data</button>}
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <h5 className="text-center  ml-4 mt-4  mb-5">View Records</h5>
                        <div className="input-group mb-4 mt-3">
                            <div className="form-outline">
                                <input type="text" id="form1" className="form-control" placeholder="Search Employee Here" style={{ backgroundColor: "#ececec" }} />
                            </div>
                            <button type="button" className="btn btn-success">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                        <table className="table table-hover  table-striped table-bordered ml-4 ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Issue</th>

                                </tr>
                            </thead>
                            <tbody>

                                {data?.map((item: any, key: number) =>
                                    <tr key={key + 1000}>
                                        <td>{item.name}</td>
                                        <td>{item.issues}</td>
                                        <td>
                                            <a className="text-danger mr-2"
                                                onClick={() => handleDelete(item._id)}
                                            >Delete <i className="far fa-trash-alt" style={{ fontSize: "18px", marginRight: "5px" }}></i> </a>
                                            <div className=" mr-2" >
                                                <i className="fa fa-edit" aria-hidden="true" onClick={() => handleClickEdit(item._id)}>Edit</i>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Employe
function setUser(arg0: any) {
    throw new Error('Function not implemented.');
}

