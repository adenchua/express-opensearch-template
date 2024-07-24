import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import API_PREPEND from "./configs/generalConfig";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";
import personRouterV1 from "./routes/v1/personRouter";
import databaseConnector from "./utils/databaseConnector";
import swaggerHelper from "./utils/swaggerHelper";

dotenv.config({ path: "../.env" });
const PORT = process.env.SERVER_PORT || 5000;

const app: Express = express();

app.use(cors());
app.use(helmet()); // secure app by setting http response headers
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parses urlencoded bodies with qs library
app.use(morgan("combined")); // outputs a rich apache standard logging for every request made

app.use(`${API_PREPEND}/v1/persons`, personRouterV1.router); // example router registered

app.use(errorHandlerMiddleware.errorHandler); // custom error handling middleware registered

// sets up swagger UI for api specifications, accessible via /docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerHelper.getSwaggerDocument()));

app.listen(PORT, async () => {
  if (await databaseConnector.isConnected()) {
    console.log("Connected to opensearch database successfully!");
  }

  console.log(`Server is running at PORT: ${PORT}`);
});
