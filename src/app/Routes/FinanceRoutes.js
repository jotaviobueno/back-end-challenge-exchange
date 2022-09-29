// Dependencies
import express from "express";

// Profix
export const FinanceRoutes = express.Router();

// Controllers
import FinanceController from "../http/Controllers/Finance/FinanceController.js";
import GetHistoryController from "../http/Controllers/Finance/GetHistoryController.js";
import CryptoController from "../http/Controllers/Finance/CryptoController.js";

// Request
import FinanceRequest from "../http/Requests/Finance/FinanceRequest.js";
import GetHistoryRequest from "../http/Requests/Finance/GetHistoryRequest.js";

FinanceRoutes.post("/depoist/:coin", FinanceRequest.ValidateDeposit, FinanceController.Deposit );
FinanceRoutes.get("/wallet", FinanceController.Wallet );
FinanceRoutes.get("/wallet/deposit-history", GetHistoryRequest.DepositHistory, GetHistoryController.DepositHistory );
FinanceRoutes.get("/deposit-history", GetHistoryRequest.SeeOneDepositHistory, GetHistoryController.SeeOneDepositHistory );

FinanceRoutes.post("/buy/:stable_coin/:crypto_coin", CryptoController.BuyCrypto);