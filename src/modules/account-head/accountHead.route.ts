import express from "express";
import { accountHeadController } from "./accountHead.controller";

const router = express.Router();

router.post(
  "/add-accountHead",
  accountHeadController.createAccountHeadController
);
router.get(
  "/get-account-heads",
  accountHeadController.getAllAccountHeadsController
);

export const accountHeadRouter = router;
