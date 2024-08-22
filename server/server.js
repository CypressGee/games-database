import express, { response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

const db= new pg.Pool({connectionString: process.env.DATABASE_URL});


app.get("/", function (request, response){
response.json("You are looking at my root route. How roude.");
})

app.get("/games", async function (request, response){
    const data = await db.query(`SELECT * FROM games`)
    response.json(data.rows);
});

app.post("/games", async function (request, response) {
    const name = request.body.name;
    const publisher = request.body.publisher;
    const date = request.body.date;

    await db.query(
      `INSERT INTO games (name, publisher, date) VALUES (1,2,3)`,
      [name,publisher,date]

    );
    response.json("Games POST endpoint");
});


app.listen(8080, () => console.log("Server is running on port 8080"));

