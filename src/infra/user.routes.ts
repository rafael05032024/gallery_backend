import { Router } from 'express';

import { UserContoller } from '@/controllers';

const router = Router();
const userContoller = new UserContoller();

router.post('/', userContoller.create);

export default router;
