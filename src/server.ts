import express, { Request, Response } from "express";
const app = express();

app.use(express.json());

const PORT = 3333;
app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));

app.get("/", (request, response): void => {
  response.json("Hello world :)");
});