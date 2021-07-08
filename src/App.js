import './App.css';
import React, {useEffect, useState} from "react";
import Users from "./Users";
import AddUser from "./AddUser";

export default function App() {
    const [users, setUsers] = useState([]);
    const [editUserFlag, setEditUserFlag] = useState('');
    const [alert, setAlert] = useState('');

    const loadUsers = () => {
        fetch('https://nazarov-kanban-server.herokuapp.com/card')
            .then(response => response.json())
            .then(json => setUsers(json))
            .catch(error => console.log(error));
        setTimeout(() => setAlert(''), 1000)
    }

    useEffect(() => {
        loadUsers()
    }, []);

    const addNewUser = (userName, userDescription, userPriority, userStatus) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: userName,
                description: userDescription,
                priority: userPriority,
                status: userStatus
            })
        };

        fetch('https://nazarov-kanban-server.herokuapp.com/card', requestOptions)
            .then(response => response.json())
            .then(() => loadUsers());
        setAlert('✔ User added!');
    }

    const deleteUser = (userId) => {
        fetch('https://nazarov-kanban-server.herokuapp.com/card/' + userId, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(() => loadUsers());
    }

    const setEditFlag = (userID) => {
        setEditUserFlag(userID);
    }

    const editUser = (userId, newName, newPriority, newStatus, newDescription) => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: newName, description: newDescription, priority: newPriority, status: newStatus})
        };

        fetch('https://nazarov-kanban-server.herokuapp.com/card/' + userId, requestOptions)
            .then(response => response.json())
            .then(() => loadUsers());

    }

    return (
        <div className="App">
            <Users users={users} deleteUser={deleteUser} setEditFlag={setEditFlag} editUserFlag={editUserFlag}
                   editUser={editUser}/>
            <AddUser addNewUser={addNewUser} alert={alert}/>
        </div>
    );
}
