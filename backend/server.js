const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blogdb"
})

app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username, userId: req.session.userId })
    } else {
        return res.json({ valid: false })
    }
})


app.post("/signup", (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("ERROR");
        }
        return res.json(data);
    })
})

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) {
            return res.json("ERROR");
        }
        if(data.length > 0) {
            req.session.userId = data[0].ID;
            req.session.username = data[0].name;
            return res.json({ Login: true, userId: data[0].ID });
        } else {
            return res.json({ Login: false });
        }
    })
})

app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.json({ success: false, error: err });
            }
            res.clearCookie('connect.sid');
            return res.json({ success: true });
        });
    } else {
        return res.json({ success: false, error: "Brak sesji do zakończenia" });
    }
});

app.post("/dodajwpis", (req, res) => {
    const { tytul, kategoria, tresc, autor } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.json({ success: false, error: "Brak zalogowanego użytkownika" });
    }

    const sql = "INSERT INTO wpisy (`id_autora`, `autor`, `tytul`, `kategoria`, `tresc`) VALUES (?, ?, ?, ?, ?)";
    const values = [userId, autor, tytul, kategoria, tresc];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        }
        return res.json({ success: true });
    });
});

/*app.get('/wpisy', (req, res) => {
    const sql = 'SELECT * FROM wpisy ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Błąd w pobieraniu wpisów' });
        }
        return res.status(200).json(results);
    });
});*/

app.delete('/wpisy/:id', (req, res) => {
    const postId = req.params.id;
    const userId = req.session.userId;

    db.query('SELECT * FROM wpisy WHERE id = ?', [postId], (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        }
        if (result.length > 0 && result[0].id_autora === userId) {
            db.query('DELETE FROM wpisy WHERE id = ?', [postId], (err, result) => {
                if (err) {
                    return res.json({ success: false, error: err });
                }
                return res.json({ success: true });
            });
        } else {
            return res.json({ success: false, error: "Brak uprawnień do usunięcia wpisu" });
        }
    });
});

app.put("/edit/:id", (req, res) => {
    const sql = "UPDATE wpisy SET `autor` = ?, `tytul` = ?, `kategoria` = ?, `tresc` = ? WHERE id = ?";
    const values = [
        req.body.autor,
        req.body.tytul,
        req.body.kategoria,
        req.body.tresc
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("ERROR");
        return res.json(data);
    })
})

app.get('/wpisy', (req, res) => {
    const { kategoria } = req.query;
    let sql = 'SELECT * FROM wpisy';
    const values = [];

    if (kategoria) {
        sql += ' WHERE kategoria = ?';
        values.push(kategoria);
    }

    sql += ' ORDER BY id DESC';

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.json({ success: false, error: 'Błąd w pobieraniu wpisów' });
        }
        return res.json(results);
    });
});




app.listen(8081, () => {
    console.log("running");
})