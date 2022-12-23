import {Realm} from '@realm/react';
import {User} from './User';
import {Exam} from './Exam';

export class Lesson extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  lessonName!: string;
  exam!: Exam[];
  students!: User[];
  lecturer!: User;

  static addLesson(lessonName: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      lessonName,
    };
  }

  static lesson = {
    name: 'Lesson',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      lessonName: 'string',
      exam: 'Exam[]',
      lecturer: {
        type: 'linkingObjects',
        objectType: 'Lecturer',
        property: 'lesson',
      },
    },
  };
}
