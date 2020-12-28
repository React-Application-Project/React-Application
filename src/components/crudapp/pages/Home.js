import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3002/todos");
        setUser(result.data.reverse());

    };
    const deleteUser = async id => {
        await axios.delete(`http://localhost:3002/todos/${id}`);
        loadUsers();
    }

    return (
        <div className="container">
            <div className="py-4">
                <h1>Home Page</h1>
                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.title}</td>
                                <td><Link className="btn btn-primary mr-2" to={`/todos/${user.id}`}>View</Link>
                                    <Link className="btn btn-outline-primary mr-2" to={`/todos/edit/${user.id}`}>Edit</Link>
                                    <Link className="btn btn-danger" to="" onClick={() => deleteUser(user.id)}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Home;
