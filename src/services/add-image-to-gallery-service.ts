import { GalleryRepository } from '@/repositories';

export class AddImageToGalleryService {
  constructor(private galleryRepository: GalleryRepository) {}

  async execute(
    request: AddImageToGalleryService.Request
  ): Promise<AddImageToGalleryService.Response> {
    const { image, userId } = request;
    const imageBase64 = image.toString('base64');
    const { id } = 
      await this.galleryRepository.create(imageBase64, userId);

    return { id };
  }
}

export namespace AddImageToGalleryService {
  export type Request = {
    image: Buffer;
    userId: number;
  };

  export type Response = {
    id: number;
  };
}