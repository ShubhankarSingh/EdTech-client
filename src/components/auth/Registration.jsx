import React, { useState } from 'react'

const Registration = () => {

    const [registration, SetRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password:""
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        SetRegistration({...registration, [name]: value})
    }


    return (
        <>
        <div>

            <h1>Registration Form</h1>
            <form onSubmit={handleRegistration}>

                <div className="mb-3 row">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">
                        First Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control"
                            value={registration.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">
                        Last Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            value={registration.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            className="form-control"
                            value={registration.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="password"
                            name="password"
                            type="text"
                            className="form-control"
                            value={registration.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <button type="sumbit">Register</button>
                </div>
            </form>

        </div>
        </>
    )
}

export default Registration