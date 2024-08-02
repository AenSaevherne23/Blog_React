import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
            try {
                const response = await axios.post('http://localhost:8081/signup', values);
                if (response.status === 200) {
                    navigate("/login");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="flex justify-center items-center bg-primary min-h-screen">
            <div className="w-1/3">
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
                <div className="bg-white p-3 rounded">
                    <h2 className="text-4xl font-bold mb-4 text-center">Zapisz się</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name"><strong>Nazwa</strong></label>
                            <input
                                type="text"
                                placeholder="Wpisz nazwę"
                                onChange={handleInput}
                                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                                name='name'
                            />
                            {errors.name && <span className='text-red-500'>{errors.name}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input
                                type="email"
                                placeholder="Wpisz email"
                                onChange={handleInput}
                                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                                name='email'
                            />
                            {errors.email && <span className='text-red-500'>{errors.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password"><strong>Hasło</strong></label>
                            <input
                                type="password"
                                placeholder="Wpisz hasło"
                                onChange={handleInput}
                                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                                name='password'
                            />
                            {errors.password && <span className='text-red-500'>{errors.password}</span>}
                        </div>
                        <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-green-600'>
                            <strong>Zapisz się</strong>
                        </button>
                        <p className="mt-2 text-center">Wyrażasz zgodę na nasze warunki i zasady</p>
                        <Link
                            to='/login'
                            className='border bg-light rounded-md text-center block py-2 px-3 mt-2 text-decoration-none'
                        >
                            <strong>Zaloguj się</strong>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
