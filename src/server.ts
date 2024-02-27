import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { AppError } from "./utils/AppError";
import { UPLOADS_FOLDER } from "./configs/uploads";
import routes from "./routes";
const app = express();

const PORT = 3333;
app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));

app.use(express.json());

app.use("/files", express.static(UPLOADS_FOLDER));

app.use(routes);

app.get("/", (request: Request, response: Response): void => {
  response.json("Hello world :)");
});

app.use((error: Error, request: Request, response: Response, next: NextFunction): Response => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});