import { evaluate, generate } from '../controller/interviewController.js';

import express from'express'
const router = express.Router()

router.post("/generate", generate );
router.post("/evaluate", evaluate );

export default router