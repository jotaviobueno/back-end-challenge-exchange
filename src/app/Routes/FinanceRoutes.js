// Dependencies
import express from "express";

// Profix
export const FinanceRoutes = express.Router();

// Controllers
import FinanceController from "../http/Controllers/Finance/FinanceController.js";


FinanceRoutes.post("/depoist/:coin", FinanceController.Deposit );