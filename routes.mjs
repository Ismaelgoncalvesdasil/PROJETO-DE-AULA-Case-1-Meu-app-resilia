import { Router } from "express";
import { atualizar, deletarf, inserir, listar } from "./src/controllers/Filmes.js";

const router = Router();

    router.get('/filmes',listar)
    router.post('/filmes',inserir)
    router.put('/filmes/:id',atualizar)
    router.delete('/filmes/:id',deletarf)

    export default router;
