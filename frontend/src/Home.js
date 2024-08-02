import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const [name, setName] = useState('');
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const navigate = useNavigate();
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
    const optionsRef = useRef(null);
    const categories = ["Wszystkie", "Edukacja", "Sport", "Technologia", "Prawo", "Bieżące wydarzenia"];
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie');

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.valid) {
                    setName(res.data.username);
                    setUserId(res.data.userId);
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));

        fetchPosts(selectedCategory);

        const interval = setInterval(() => {
            setCurrentDateTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate, selectedCategory]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setOptionsVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchPosts = (category) => {
        axios.get(`http://localhost:8081/wpisy${category !== 'Wszystkie' ? `?kategoria=${category}` : ''}`)
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        axios.post('http://localhost:8081/logout')
            .then(res => {
                if (res.data.success) {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    };

    const handleDeletePost = (postId) => {
        axios.delete(`http://localhost:8081/wpisy/${postId}`, {
            data: { userId: userId }
        })
            .then(res => {
                if (res.data.success) {
                    const updatedPosts = posts.filter(post => post.id !== postId);
                    setPosts(updatedPosts);
                }
            })
            .catch(err => console.log(err));
    };

    const handleCategoryChange = async (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="container mt-0 relative flex flex-col min-h-screen">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <div className="bg-blue-500 text-white text-center py-4 mb-4 flex justify-between items-center">
                <div className="text-3xl font-bold ml-4 flex items-center">
                    <span>Witaj, {name}</span>
                </div>
                <div className="text-center mb-4 mx-auto">
                    <h1 className="text-4xl font-bold mb-2">Wybierz kategorię</h1>
                    <select
                        className="border border-gray-300 rounded-md py-2 px-3 bg-white text-black"
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="relative inline-block text-right mr-4" ref={optionsRef}>
                    <button onClick={() => setOptionsVisible(!optionsVisible)} className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600">
                        Opcje
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4 8a2 2 0 114 0 2 2 0 01-4 0zM10 16a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4 12a2 2 0 114 0 2 2 0 01-4 0zM12 16a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {optionsVisible && (
                       <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                       <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                           <Link to="/dodaj" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dodaj wpis</Link>
                           <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Wyloguj</button>
                       </div>
                   </div>
                    )}
                </div>
            </div>

            <div className="flex-grow">
                {posts.length === 0 ? (
                    <p className="text-center mt-8 text-2xl font-bold">Brak wpisów do wyświetlenia</p>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="my-4 p-4 border rounded-md bg-white text-black">
                            <h3 className="text-3xl font-semibold mb-2 text-center italic">{post.tytul}</h3>
                            <p className="text-lg font-semibold mb-2 text-center">Autor: {post.autor}</p>
                            <p className="text-lg font-semibold mb-2 text-center">Kategoria: {post.kategoria}</p>
                            <p className="text-lg text-gray-500 mb-2 text-center">Data dodania: <span className="text-lg">{new Date(post.data_dodania).toLocaleString()}</span></p>
                            <p className="text-lg text-justify">{post.tresc}</p>
                            {post.id_autora === userId && (
                                <div className="flex justify-end mt-4 space-x-4">
                                    <button onClick={() => handleDeletePost(post.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                        Usuń wpis
                                    </button>
                                    <Link to={`edit/${post.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                        Edytuj wpis
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <footer className="text-center py-4 bg-gray-200 text-black">
                <div className="text-lg font-bold mb-2">Wszelkie prawa zastrzeżone &copy; {new Date().getFullYear()}</div>
                <div className="text-lg font-bold mb-2">{currentDateTime}</div>
            </footer>
        </div>
    );
}

export default Home;
