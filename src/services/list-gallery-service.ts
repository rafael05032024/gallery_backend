import { GalleryRepository } from '@/repositories';
import { GalleryModel } from '@/models';

export class ListGalleryService {
  constructor(private galleryRepository: GalleryRepository) {}

  async execute(
    request: ListGalleryService.Request
  ): Promise<ListGalleryService.Response> {
    const { userId } = request;
    const gallery = 
      await this.galleryRepository.listByOwner(userId);

    return gallery;
  }
}

export namespace ListGalleryService {
  export type Request = {
    userId: number;
  };

  export type Response = GalleryModel[];
}