import {Realm} from '@realm/react';

export class FoodList extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  date!: 'string';
  list!: 'string';

  static generate(date: string, list: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      date,
      list,
    };
  }

  static schema = {
    name: 'FoodList',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      date: 'string',
      list: 'string',
    },
  };
}
