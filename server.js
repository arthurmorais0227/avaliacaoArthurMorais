import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("API de Podcasts Geeks está funcionando...");
});

app.listen(serverPort, () => {
    console.log(`🟠 O servidor da API de Podcast GEEK está rodando em: http://localhost:${serverPort}`);
});