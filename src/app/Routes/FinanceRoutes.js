// Dependencies
import express from "express";

// Profix
export const FinanceRoutes = express.Router();

// Controllers
import FinanceController from "../http/Controllers/Finance/FinanceController.js";

// Request
import FinanceRequest from "../http/Requests/Finance/FinanceRequest.js";

FinanceRoutes.post("/depoist/:coin", FinanceRequest.ValidateDeposit, FinanceController.Deposit );