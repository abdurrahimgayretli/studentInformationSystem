import {Realm} from '@realm/react';
import {Lesson} from './Lesson';

export class Exam extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  lessonName!: string;
  examName!: string;
  tc!: string;
  note!: string;
  lesson!: Lesson;

  static addNote(tc: string, examName: string, note: string) {
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
      tc: 'string',
      examName: 'string',
      note: 'string',
      lesson: {
        type: 'linkingObjects',
        objectType: 'Lesson',
        property: 'exam',
      },
    },
  };
}
