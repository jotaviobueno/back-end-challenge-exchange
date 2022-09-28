// Dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";

// Port
const port = 3001;

// DataBase Connect
import {Connect} from "./settings/MongooseConnect.js";

// Routes
import {ClientRoutes} from "./app/Routes/ClientRoutes.js";
import {FinanceRoutes} from "./app/Routes/FinanceRoutes.js";

// Config
const app = express();

dotenv.config();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", ClientRoutes);
app.use("/", FinanceRoutes);

if ( await Connect() ) {
	app.listen( port, () => {
		console.log( chalk.bgBlack(`listen on! http://localhost:${port}`) );
	});
}