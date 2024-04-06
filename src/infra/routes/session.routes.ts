import { Router } from 'express';

import { SessionContoller } from '@/controllers';

const router = Router();
const sessionController = new SessionContoller();

router.post('/', sessionController.create);

export default router;
