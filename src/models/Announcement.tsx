import {Realm} from '@realm/react';

export class Announcement extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  content!: string;

  static generate(title: string, content: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      title,
      content,
    };
  }

  static schema = {
    name: 'Announcement',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      content: 'string',
    },
  };
}
