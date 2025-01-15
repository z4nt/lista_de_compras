import express, { Router } from "express";
import { criarProduto, listarProdutos, obterProdutoPorId, atualizarProduto, deletarProduto, baixarPdf } from "../controllers/controller.js";

const router = Router();
router.post("/api/produtos", criarProduto)
router.get("/api/produtos", listarProdutos)
router.delete("/api/produtos/:id", deletarProduto)
router.get("/api/produtos/pdf", baixarPdf)
router.put("/api/produtos/:id", atualizarProduto)

export default router