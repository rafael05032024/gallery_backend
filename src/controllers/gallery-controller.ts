import { Request, Response } from 'express';

import { 
  AddImageToGalleryService, 
  ListGalleryService,
  DeleteImageFromGalleryService,
  FavoriteImageService
} from '@/services';
import { GalleryRepository } from '@/infra';

export class GalleryController {
  async create(request: Request, response: Response) {
    const { userId } = request.body;
    const { image } = request.files;
    const galleryRepository = new GalleryRepository();
    const addImageToGalleryService = 
      new AddImageToGalleryService(galleryRepository);
    const newImage = 
      await addImageToGalleryService.execute({ 
        image: <Buffer>(<any>image).data, 
        userId 
      });

    response.status(201).json(newImage);    
  }

  async list(request: Request, response: Response) {
    const { userId } = request.body;
    const galleryRepository = new GalleryRepository();
    const listGalleryService = 
      new ListGalleryService(galleryRepository);
    const gallery = 
      await listGalleryService.execute({ userId });

    response.status(200).json(gallery);    
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const galleryRepository = new GalleryRepository();
    const deleteImageFromGalleryService = 
      new DeleteImageFromGalleryService(galleryRepository);
     
    await deleteImageFromGalleryService.execute({ 
      imageId: Number(id) 
    });

    response.status(204).send();    
  }

  async update(request: Request, response: Response) {
    const { action, id } = request.params;
    const galleryRepository = new GalleryRepository();
    const favoriteImageService = new FavoriteImageService(galleryRepository);
     
    await favoriteImageService.execute({ 
      imageId: Number(id),
      action: action as any
    });

    response.status(204).send();    
  }
}