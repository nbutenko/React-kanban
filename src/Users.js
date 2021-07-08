import {useState} from "react";

export default function Users(props) {
    const [newName, setNewName] = useState('');
    const [newPriority, setNewPriority] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const clearEditFields = () => {
        setNewName('');
        setNewPriority('');
        setNewStatus('');
        setNewDescription('');
    }

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    return(
        <div className={"users-list"}>
            <h1 className={"text-center"}>Users list:</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Status</th>
                    <th scope="col">Creation date</th>
                    <th scope="col">Update date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.users.map((el, index) =>
                    <tr key={el._id}>
                        <th scope="row">{index+1}</th>
                        <td>{el.name} {props.editUserFlag === el._id && <div><input className={'form-control'} type="text"
                                                                                    value={newName} onChange={e => setNewName(e.target.value)}/></div>}</td>
                        <td>{el.priority} {props.editUserFlag === el._id && <div><input className={'form-control'} type="number"
                                                                                        value={newPriority} onChange={e => setNewPriority(e.target.value)}/></div>}</td>
                        <td>{el.status} {props.editUserFlag === el._id && <div><input className={'form-control'} type="text"
                                                                                      value={newStatus} onChange={e => setNewStatus(e.target.value)}/></div>}</td>
                        <td>{new Date(Date.parse(el.createdAt)).toLocaleString("en-US")}</td>
                        <td>{new Date(Date.parse(el.updatedAt)).toLocaleString("en-US")}</td>
                        <td>{el.description} {props.editUserFlag === el._id && <div><textarea className={'form-control'} rows={3}
                                                                                              value={newDescription} onChange={e => setNewDescription(e.target.value)}/></div>}</td>
                        <td className={'actions'}>
                            {props.editUserFlag && props.editUserFlag === el._id && <>
                                <button className={'btn btn-success'} onClick={() => {props.editUser(el._id, newName, newPriority, newStatus, newDescription);
                                                                                      clearEditFields(); props.setEditFlag('')}}>Save</button>

                                <button className={'btn btn-danger'} onClick={() => {props.setEditFlag(''); clearEditFields()}}>Cancel</button></>}
                            {props.editUserFlag !== el._id && <><button className={'btn btn-primary'}
                                                                      onClick={() => {props.setEditFlag(el._id); setNewName(el.name);
                                                                      setNewPriority(el.priority); setNewStatus(el.status); setNewDescription(el.description)}}>Edit</button>
                            <button className={'btn btn-secondary'} onClick={() => props.deleteUser(el._id)}>Delete</button></>}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
    )
}