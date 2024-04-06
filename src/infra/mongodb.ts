import { MongoClient, Collection } from 'mongodb';

export const MongoDB = {
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, { directConnection: true });
  },

  getCollection(collectionName: string): Collection {
    return this.client.db('app_db').collection(collectionName);
  },

  disconnect(): Promise<void> {
    return this.client.close();
  },
};
