import {Realm} from '@realm/react';
import {Lesson} from './Lesson';

export class Exam extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  lessonName!: string;
  examName!: string;
  tc!: number;
  note!: number;
  lesson!: Lesson;

  static addNote(tc: number, examName: string, note: number) {
    return {
      _id: new Realm.BSON.ObjectId(),
      tc,
      examName,
      note,
    };
  }

  static exam = {
    name: 'Exam',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      tc: 'int',
      examName: 'string',
      note: 'int',
      lesson: {
        type: 'linkingObjects',
        objectType: 'Lesson',
        property: 'exam',
      },
    },
  };
}
