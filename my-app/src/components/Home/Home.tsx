import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container">
            <div className="py-4">
                <h1>Home Page</h1>
                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                            <tr>
                                <th scope="row">d</th>
                                <td>Name</td>
                                <td>data</td>
                                <td>user</td>
                                <td>
                                    <Link className="btn btn-primary mr-2" to={''}>
                                        View
                                    </Link>
                                    <Link
                                        className="btn btn-outline-primary mr-2"
                                        to={''}
                                    >
                                        Edit
                                    </Link>
                                    <Link to={''}
                                        className="btn btn-danger"

                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                       
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
