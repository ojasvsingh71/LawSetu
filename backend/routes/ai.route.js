import express from 'express'
import suggestionClause from '../controller/ai.controller.js'

const router = express.Router();

router.post('/suggest', suggestionClause);

export default router;