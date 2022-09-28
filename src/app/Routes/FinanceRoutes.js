// Dependencies
import express from "express";

// Profix
export const FinanceRoutes = express.Router();

// Controllers
import FinanceController from "../http/Controllers/Finance/FinanceController.js";
import GetHistoryController from "../http/Controllers/Finance/GetHistoryController.js";

// Request
import FinanceRequest from "../http/Requests/Finance/FinanceRequest.js";
import GetHistoryRequest from "../http/Requests/Finance/GetHistoryRequest.js";

FinanceRoutes.post("/depoist/:coin", FinanceRequest.ValidateDeposit, FinanceController.Deposit );
FinanceRoutes.get("/wallet", FinanceController.Wallet );
FinanceRoutes.get("/wallet/deposit-history", GetHistoryRequest.DepositHistory, GetHistoryController.DepositHistory );
FinanceRoutes.get("/wallet/deposit-history/:deposit_id", GetHistoryRequest.SeeOneDepositHistory, GetHistoryController.SeeOneDepositHistory );