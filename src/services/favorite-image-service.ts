import { GalleryRepository } from '@/repositories';

export class FavoriteImageService {
  constructor(private galleryRepository: GalleryRepository) {}

  async execute(
    request: FavoriteImageService.Request
  ): Promise<void> {
    const { imageId, action } = request;
    const image = await this.galleryRepository.getImageById(imageId);

    await this.galleryRepository.update(imageId, {
      [action]: !image[action]
    });
  }
}

export namespace FavoriteImageService {
  export type Request = {
    imageId: number;
    action: 'like' | 'love';
  };
}