import { UserModel } from '@/models';
import { MongoDB } from '@/infra';

export class UserRepository {
  //async getById(id: string): UserModel {}

  async getByEmail(email: string): Promise<UserModel> {
    const collection = MongoDB.getCollection('users');

    return collection.findOne({ email }, { 
      projection: { _id: 0 } 
    }) as any;
  }

  async create(
    name: string, 
    email: string,
    password: string
  ): Promise<UserModel> {
    const collection = MongoDB.getCollection('users');
    const doc = {
      id: Date.now(),
      name,
      email,
      password,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await collection.insertOne(doc);

    delete doc.password;

    return doc;
  }
};