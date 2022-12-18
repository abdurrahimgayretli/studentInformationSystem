import {Realm} from '@realm/react';

export class Lesson extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  lessonName!: string;
  examName!: string;
  note!: string;

  static addLesson(lessonName: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      lessonName,
    };
  }
  static addNote(lessonName: string, examName: string, note: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      lessonName,
      examName,
      note,
    };
  }

  static lesson = {
    name: 'Lesson',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      lessonName: 'string',
      lecturer: {
        type: 'linkingObjects',
        objectType: 'Lecturer',
        property: 'lesson',
      },
      students: {
        type: 'linkingObjects',
        objectType: 'Student',
        property: 'lesson',
      },
    },
  };
  static exam = {
    name: 'Exam',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      lessonName: 'string',
      examName: 'string',
      note: 'string',
    },
  };
}
