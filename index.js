import express from "express";
import bodyParser from "body-parser";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import pkg from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from "pdfkit";
const { SHA256, AES, enc } = pkg;

const app = express();
const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "/db.json");
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read();

db.default ||= {
    generated: false,
    password: "",
    logs: []
};

let {generated, password, logs} = db.data;

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

if(generated){
    initialGenerate();
}