import React, { useState, useEffect } from "react";
const AuthForm = props => {
    const [state, setState] = useState({ username: "", password: "", email: "", confirmPassword: "", image: "" }); //this feels dumb.
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState("");

    const { heading, buttonText, signup, errors, history, removeError } = props;

    const handleChange = e => {
        let updatedState = {
            ...state,
            [e.target.name]: e.target.value
        };
        setState(updatedState);

    }
    const handleSubmit = e => {
        e.preventDefault();
        const authType = signup ? "signup" : "signin";
        props.onAuth(authType, state)
            .then(history.push("/"))
            .catch(()=>{
                return;
            })
        
    }
    useEffect(()=>{
        return history.listen(()=>{
            removeError();
        })
    },[history,removeError]);
    return (
        <div>
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <h2>{heading}</h2>
                        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                        <label htmlFor="Email">Email</label>
                        <input type="text" className="form-control" id="email" name="email" onChange={handleChange} value={state.email} placeholder="Enter your Email" />
                        <label htmlFor="Password">Password</label>
                        <input type="password" className="form-control" value={state.password} id="password" name="password" onChange={handleChange} placeholder="Enter your Password" />
                        {signup && (
                            <div>
                                <label htmlFor="Confirm Password">Confirm Password</label>
                                <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} value={state.confirmPassword} placeholder="Enter Password Again" />
                                <label htmlFor="Username">Username</label>
                                <input type="text" className="form-control" name="username" onChange={handleChange} value={state.username} placeholder="Enter Username" />
                                <label htmlFor="Profile Image URL">Profile Image</label>
                                <input type="text" className="form-control" name="image" onChange={handleChange} value={state.image} placeholder="Enter image URL" />
                            </div>
                        )}
                        <button className="btn btn-primary">{buttonText}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AuthForm;