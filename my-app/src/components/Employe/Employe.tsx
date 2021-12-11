import axios from 'axios'
import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import EmployeEdit from './EmployeEdit';
import AddIssues from './AddIssues';

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
    const [data, setData] = useState<iProps[]>([] as iProps[])
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal =()=> {setIsOpen(true)}
    const closeModal =() => {setIsOpen(false)}

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


    const handleDelete = (id: any) => {
        axios.delete(`http://localhost:5050/delete/${id}`)
            .then(res => {
                console.log("delete")
            })
            .catch(err => {
                console.log("error")
            })
    }


    return (
        <section>
            <div className="container">
                <h4 className="mb-3 text-center mt-4">CRUD Operation in MERN</h4>
                <div className="row mt-3">
                    <Link to='/add'><button className="btn btn-primary">ADD New Issues</button></Link>
                    <div className="col-sm-8">
                        <h5 className="text-center  ml-4 mt-4  mb-5">View Records</h5>
                        <div className="input-group mb-4 mt-3">
                            <div className="form-outline">
                                <input type="text" id="form1" className="form-control" placeholder="Search Employee Here" style={{ backgroundColor: "#ececec" }} />
                            </div>
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
                                                <button onClick={openModal} className="btn btn-primary">Edit</button>
                                                <EmployeEdit modalIsOpen={modalIsOpen} closeModal={closeModal} id={item._id} number={item.number} name={item.name} issues={item.issues} email={item.email} />
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
