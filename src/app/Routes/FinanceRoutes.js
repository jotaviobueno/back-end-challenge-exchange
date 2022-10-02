// Dependencies
import express from "express";

// Profix
export const FinanceRoutes = express.Router();

// Controllers
import FinanceController from "../http/Controllers/Finance/FinanceController.js";
import GetHistoryController from "../http/Controllers/Finance/GetHistoryController.js";
import CryptoController from "../http/Controllers/Finance/CryptoController.js";
import GetHistoryCryptoCoinRepository from "../http/Controllers/Finance/GetHistoryCryptoCoinController.js";
import SendMoneyController from "../http/Controllers/Finance/SendController.js";

// Request
import FinanceRequest from "../http/Requests/Finance/FinanceRequest.js";
import GetHistoryRequest from "../http/Requests/Finance/GetHistoryRequest.js";
import CryptoRequest from "../http/Requests/Finance/CryptoRequest.js";
import GetHistoryCryptoCoinRequest from "../http/Requests/Finance/GetHistoryCryptoCoinRequest.js";

FinanceRoutes.post("/depoist/:coin", FinanceRequest.ValidateDeposit, FinanceController.Deposit );
FinanceRoutes.get("/wallet", FinanceRequest.ValidateSeeWallet, FinanceController.Wallet );
FinanceRoutes.get("/wallet/deposit-history", GetHistoryRequest.DepositHistory, GetHistoryController.DepositHistory );
FinanceRoutes.get("/deposit-history", GetHistoryRequest.SeeOneDepositHistory, GetHistoryController.SeeOneDepositHistory );

FinanceRoutes.post("/buy/:stable_coin/:crypto_coin", CryptoRequest.ValidateBuyCrypto, CryptoController.BuyCrypto);
FinanceRoutes.post("/sell/:crypto_coin/:stable_coin", CryptoRequest.ValidateSellCrypto, CryptoController.SellCrypto);
FinanceRoutes.get("/buy/history", GetHistoryCryptoCoinRequest.SeeCryptoCurrencyPurchaseHistory, GetHistoryCryptoCoinRepository.SeeCryptoCurrencyPurchaseHistory );
FinanceRoutes.get("/sell/history", GetHistoryCryptoCoinRequest.ViewTheHistoryOfCryptocurrencySales, GetHistoryCryptoCoinRepository.ViewTheHistoryOfCryptocurrencySales );

FinanceRoutes.post("/send/:stable_coin", SendMoneyController.SendMoney);
