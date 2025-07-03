import express from 'express'
import { suggestionClause, chat } from '../controller/ai.controller.js'

const router = express.Router();

router.post('/suggest', suggestionClause);
router.post("/chat", chat);

export default router;