import express, { Router } from "express";
import { criarProduto, listarProdutos, obterProdutoPorId, atualizarProduto, deletarProduto } from "../controllers/controller.js";

const router = Router();
router.post("/api/produtos", criarProduto)
router.get("/api/produtos", listarProdutos)
router.delete("/api/produtos/:id", deletarProduto)

export default router