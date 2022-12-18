import {createRealmContext, Realm} from '@realm/react';
import {Announcement} from './Announcement';
import {FoodList} from './FoodList';
import {Lesson} from './Lesson';

export class User extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  tc!: string;
  name!: string;
  surName!: string;
  telNo!: string;
  mail!: string;
  title!: string;
  password!: string;
  student!: User[];
  lecturer!: User;
  lesson!: Lesson[];

  static register(
    tc: string,
    name: string,
    surName: string,
    telNo: string,
    mail: string,
    title: string,
    password: string,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      tc,
      name,
      surName,
      telNo,
      mail,
      title,
      password,
    };
  }
  static checkUser(tc: string, password: string, title: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      tc,
      password,
      title,
    };
  }

  static student = {
    name: 'Student',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      tc: 'string',
      name: 'string',
      surName: 'string',
      telNo: 'string',
      mail: 'string',
      title: 'string',
      password: 'string',
      lecturer: 'User',
      lesson: 'Lesson[]',
    },
  };
  static lecturer = {
    name: 'Lecturer',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      tc: 'string',
      name: 'string',
      surName: 'string',
      telNo: 'string',
      mail: 'string',
      title: 'string',
      password: 'string',
      student: 'User[]',
      lesson: 'Lesson[]',
    },
  };
  static admin = {
    name: 'Admin',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      tc: 'string',
      name: 'string',
      surName: 'string',
      telNo: 'string',
      mail: 'string',
      title: 'string',
      password: 'string',
    },
  };
  static user = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      tc: 'string',
      password: 'string',
      title: 'string',
    },
  };
}

export const {useRealm, useObject, useQuery, RealmProvider} =
  createRealmContext({
    schema: [
      Lesson.exam,
      Lesson.lesson,
      Announcement.schema,
      FoodList.schema,
      User.user,
      User.admin,
      User.lecturer,
      User.student,
    ],
    deleteRealmIfMigrationNeeded: true,
  });
