import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function AktualizujWpis() {
    const [tytul, setTytul] = useState('');
    const [autor, setAutor] = useState('');
    const [userId, setUserId] = useState(null);
    const [kategoria, setKategoria] = useState('');
    const [tresc, setTresc] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081')
          .then(res => {
            if (res.data.valid) {
              setUserId(res.data.userId);
            } else {
              navigate('/login');
            }
          })
          .catch(err => {
            console.log(err);
            navigate('/login');
          });
      }, [navigate]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8081/edit/' + id, { tytul, kategoria, tresc, autor })
            .then(res => {
                console.log(res);
                navigate("/");
            }).catch(err => console.log(err));
    }

    return (
        <div className="flex h-screen bg-primary justify-center items-center">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <div className="w-1/2 bg-white rounded p-8">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-4xl font-bold mb-4 text-center">Aktualizuj wpis</h2>
                    <div className="mb-4">
                        <input id="tytul" type="text" placeholder="Wpisz tytuł" className="w-full border border-gray-300 rounded-md py-2 px-3" onChange={e => setTytul(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <input id="autor" type="text" placeholder="Wpisz autora" className="w-full border border-gray-300 rounded-md py-2 px-3" onChange={e => setAutor(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <select id="kategoria" className="w-full border border-gray-300 rounded-md py-2 px-3" onChange={e => setKategoria(e.target.value)}>
                            <option value="" disabled selected>Wybierz kategorię</option>
                            <option value="Edukacja">Edukacja</option>
                            <option value="Sport">Sport</option>
                            <option value="Technologia">Technologia</option>
                            <option value="Prawo">Prawo</option>
                            <option value="Bieżące wydarzenia">Bieżące wydarzenia</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <textarea id="tresc" placeholder="Wpisz treść" className="w-full h-40 border border-gray-300 rounded-md py-2 px-3" onChange={e => setTresc(e.target.value)} />
                    </div>
                    <div className="flex justify-between">
                        <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600" type="submit">Edytuj wpis</button>
                        <Link className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 flex items-center" to="/">Anuluj</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AktualizujWpis;
