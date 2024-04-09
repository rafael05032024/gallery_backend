import { GalleryRepository } from '@/infra';
import { GalleryModel } from '@/models';

export class ListGalleryService {
  constructor(private galleryRepository: GalleryRepository) {}

  async execute(
    request: ListGalleryService.Request
  ): Promise<ListGalleryService.Response> {
    const { userId, ...filters } = request;

    for (const key of Object.keys(filters)) {
      if (filters[key] === 'true' || filters[key] === 'false') {
        filters[key] = JSON.parse(filters[key]);
      } else if (!isNaN(filters[key])) {
        filters[key] = Number(filters[key]);
      }
    }

    const query = {
      ...filters,
      owner: userId
    };

    console.log(query);

    const gallery = 
      await this.galleryRepository.list(query);

    return gallery;
  }
}

export namespace ListGalleryService {
  export type Request = {
    userId: number;
    [filter: string]: any;
  };

  export type Response = GalleryModel[];
}