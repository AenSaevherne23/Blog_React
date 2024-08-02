import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            if(res.data.valid) {
                setUserId(res.data.userId);
                navigate('/');
            } else {
                navigate('/login');
            }
        })
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data.Login) {
                    setUserId(res.data.userId);
                    navigate('/');
                } else {
                    alert("Brak podanego użytkownika w bazie danych");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex justify-center items-center bg-primary min-h-screen">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <div className="bg-white p-6 rounded w-1/3">
                <h2 className="text-4xl font-bold mb-4 text-center">Zaloguj się</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Wpisz email"
                            name='email'
                            className="border border-gray-300 rounded-md py-2 px-3 w-full"
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password"><strong>Hasło</strong></label>
                        <input
                            type="password"
                            placeholder="Wpisz hasło"
                            name='password'
                            className="border border-gray-300 rounded-md py-2 px-3 w-full"
                            onChange={handleInput}
                        />
                    </div>
                    <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded-md w-full mt-4 hover:bg-green-600'>
                        <strong>Zaloguj się</strong>
                    </button>
                    <p className="mt-2 text-center">Wyrażasz zgodę na nasze warunki i zasady</p>
                    <Link
                        to='/signup'
                        className='border bg-light rounded-md text-center block py-2 px-3 mt-2 text-decoration-none'
                    >
                        <strong>Utwórz konto</strong>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
