// Dependencies
import express from "express";

// Profix
export const ClientRoutes = express.Router();

// Controller's
import ClientController from "../http/Controllers/Client/ClientController.js";
import AuthLoginController from "../http/Controllers/Client/AuthLoginController.js";
import UpdateController from "../http/Controllers/Client/UpdateController.js";
import AuthTokenController from "../http/Controllers/Client/AuthTokenController.js";

// Request
import ClientRequest from "../http/Requests/Client/ClientRequest.js";
import AuthLoginRequest from "../http/Requests/Client/AuthLoginRequest.js";
import UpdateRequest from "../http/Requests/Client/UpdateRequest.js";
import AuthTokenRequest from "../http/Requests/Client/AuthTokenRequest.js";

ClientRoutes.post("/sign-up", ClientRequest.ValidateSignUp, ClientController.SignUp);
ClientRoutes.post("/sign-in", AuthLoginRequest.ValidateSignIn, AuthLoginController.SignIn);
ClientRoutes.get("/profile", ClientRequest.ValidateSeeProfile, ClientController.Profile);
ClientRoutes.get("/logout", AuthLoginRequest.ValidateLogout, AuthLoginController.Logout);
ClientRoutes.patch("/profile/update-name", UpdateRequest.ValidateUpdateName, UpdateController.UpdateName);
ClientRoutes.patch("/change-password/:change_token", UpdateController.UpdatePassword);

// Auth
ClientRoutes.post("/profile/generation-token/change-email", AuthTokenRequest.ValidateEmailTokenGeneration, AuthTokenController.TokenGenerationToChangeEmail);
ClientRoutes.post("/generation-token/change-password", AuthTokenRequest.ValidatePasswordTokenGeneration, AuthTokenController.TokenGenerationToPassword);