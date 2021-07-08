import {useState} from "react";

export default function AddUser(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');

    const clearUserFields = () => {
        setName('');
        setDescription('');
        setPriority('');
        setStatus('');
    }

    return(
        <div className={"add-user"}>
            <h2 className={"text-center"}>Add new user:</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input className={'form-control'} type="text" id="name" placeholder="Input your name" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className={'form-control'} id="description" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="priority" className="form-label">Priority</label>
                <input className={'form-control'} type="number" id="priority" value={priority} onChange={e => setPriority(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <input className={'form-control'} type="text" id="status" placeholder="Input status" value={status} onChange={e => setStatus(e.target.value)}/>
            </div>
            <button className={'btn btn-success'} onClick={() => {props.addNewUser(name, description, priority, status); clearUserFields()}}>Add to list</button>
            {props.alert && <div className="alert alert-success d-inline" role="alert">
                {props.alert}
            </div>}
        </div>
    )
}