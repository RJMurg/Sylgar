import express from "express";
import bodyParser from "body-parser";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import pkg from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
const { SHA256, AES, enc } = pkg;

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "/db.json");
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read();

db.default ||= {
    generated: false,
    password: ""
};

let {generated, password, logs, cookies} = db.data;

const initialGenerate = async() => {
    let pass = "";
    let passChars = "abcdefghijklmnopqrstuvwxyz0123456789";

    for(let i = 0; i < 8; i++){
        pass += passChars[Math.floor(Math.random() * passChars.length)];
    }

    db.data.password = SHA256(pass).toString(enc.Hex);
    console.log("Password generated: " + pass);
    db.data.generated = true;

    await db.write();
};

if(!generated){
    initialGenerate();
}

app.get("/", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/web/rpg.html");
    }
});

app.get("/login", (req, res) => {
    if(SHA256(req.query.password).toString(enc.Hex) == password){
        // generate a cookie
        let cookie = uuidv4();
        res.cookie("auth", cookie, {maxAge: 900000, httpOnly: true});
        res.redirect("/");
    }
    else{
        res.redirect("/");
    }
});

app.get("/tc", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/books/TenCandles.pdf");
    }
});

app.get("/zh", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/books/Zweihander.pdf");
    }
});

app.get("/www", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/books/WorldWideWrestling2E.pdf");
    }
});

app.get("/books/*", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src" + req.url);
    }
});

// All DG Stuff
app.get("/dg", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/web/dg.html");
    }
});

// All D&D Stuff
app.get("/dnd", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/web/dnd.html");
    }
});

app.get("/dnd/sb", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/web/dnd/sb.html");
    }
});

app.get("/dnd/md", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/web/dnd/md.html");
    }
});

app.get("/dnd/os", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/web/dnd/os.html");
    }
});

app.get("/dnd/cs", (req, res) => {
    if(!req.cookies["auth"]){
        res.sendFile(__dirname + "/src/web/login.html");
    }
    else{
        res.sendFile(__dirname + "/src/web/dnd/cs.html");
    }
});

// Logout
app.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});