import { GalleryRepository } from '@/repositories';

export class DeleteImageFromGalleryService {
  constructor(private galleryRepository: GalleryRepository) {}

  async execute(
    request: DeleteImageFromGalleryService.Request
  ): Promise<void> {
    const { imageId } = request;

    await this.galleryRepository.delete(imageId);
  }
}

export namespace DeleteImageFromGalleryService {
  export type Request = {
    imageId: number;
  };
}