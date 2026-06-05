import { Router } from 'express';
import { saveGame, getStats } from './game';

const router = Router();

router.post('/games', saveGame);
router.get('/stats', getStats);

export default router;