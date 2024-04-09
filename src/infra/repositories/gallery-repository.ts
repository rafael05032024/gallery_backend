import { GalleryModel } from '@/models';
import { MongoDB } from '@/infra';

export class GalleryRepository {
  async getImageById(id: number): Promise<GalleryModel> {
    const collection = MongoDB.getCollection('gallery');

    return collection.findOne({ id }) as any;
  }

  async list(filter: any): Promise<GalleryModel[]> {
    const collection = MongoDB.getCollection('gallery');

    return collection.find(filter, { 
      projection: { _id: 0 } 
    }).sort({ created_at: -1 }).toArray() as any;
  }

  async delete(id: number): Promise<void> {
    const collection = MongoDB.getCollection('gallery');

    await collection.deleteOne({ id });
  }

  async update(id: number, data: any): Promise<void> {
    const collection = MongoDB.getCollection('gallery');

    await collection.updateOne({ id }, { 
      $set: {
        ...data, 
        updated_at: new Date().toISOString()
      } 
    });
  }

  async create(image: string, owner: number): Promise<GalleryModel> {
    const collection = MongoDB.getCollection('gallery');
    const doc = {
      id: Date.now(),
      image,
      owner,
      like: false,
      love: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await collection.insertOne(doc);

    return doc;
  }
};