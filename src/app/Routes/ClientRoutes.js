// Dependencies
import express from "express";

// Profix
export const ClientRoutes = express.Router();

// Controller's
import ClientController from "../http/Controllers/Client/ClientController.js";
import AuthLoginController from "../http/Controllers/Client/AuthLoginController.js";
import UpdateController from "../http/Controllers/Client/UpdateController.js";

// Request
import ClientRequest from "../http/Requests/Client/ClientRequest.js";
import AuthLoginRequest from "../http/Requests/Client/AuthLoginRequest.js";
import UpdateRequest from "../http/Requests/Client/UpdateRequest.js";

ClientRoutes.post("/sign-up", ClientRequest.ValidateSignUp, ClientController.SignUp);
ClientRoutes.post("/sign-in", AuthLoginRequest.ValidateSignIn, AuthLoginController.SignIn);
ClientRoutes.get("/profile", ClientRequest.ValidateSeeProfile, ClientController.Profile);
ClientRoutes.get("/logout", AuthLoginRequest.ValidateLogout, AuthLoginController.Logout);

ClientRoutes.patch("/profile/update-name", UpdateRequest.ValidateUpdateName, UpdateController.UpdateName);

