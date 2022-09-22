// Dependencies
import express from "express";

// Profix
export const ClientRoutes = express.Router();

// Controller's
import ClientController from "../http/Controllers/Client/ClientController.js";

// Request
import ClientRequest from "../http/Requests/Client/ClientRequest.js";

ClientRoutes.post("/sign-up", ClientRequest.ValidateStorage, ClientController.Storage);