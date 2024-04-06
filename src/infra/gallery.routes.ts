import { Router } from 'express';

import { GalleryController } from '@/controllers';
import { AuthMiddleware } from '@/middlewares';

const router = Router();
const galleryController = new GalleryController();
const authMiddleare = new AuthMiddleware();

router.use(authMiddleare.auth);
router.get('/', galleryController.list);
router.post('/image', galleryController.create);
router.delete('/image/:id', galleryController.delete);
router.patch('/image/:id/favorite/:action', galleryController.update);

export default router;
