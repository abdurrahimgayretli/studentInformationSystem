import {createRealmContext, Realm} from '@realm/react';
import {Announcement} from './Announcement';
import {FoodList} from './FoodList';
import {Lesson} from './Lesson';
import {Exam} from './Exam';

export class User extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  tc!: number;
  name!: string;
  surName!: string;
  telNo!: number;
  mail!: string;
  title!: string;
  password!: string;
  confirm!: string;
  lesson!: Lesson[];

  static register(
    tc: number,
    name: string,
    surName: string,
    telNo: number,
    mail: string,
    title: string,
    password: string,
    confirm: string,
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
      confirm,
    };
  }
  static checkUser(
    name: string,
    surName: string,
    tc: number,
    password: string,
    title: string,
    confirm: string,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      surName,
      tc,
      password,
      title,
      confirm,
    };
  }

  static student = {
    name: 'Student',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      tc: 'int',
      name: 'string',
      surName: 'string',
      telNo: 'int',
      mail: 'string',
      title: 'string',
      password: 'string',
      lesson: 'Lesson[]',
    },
  };
  static lecturer = {
    name: 'Lecturer',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      tc: 'int',
      name: 'string',
      surName: 'string',
      telNo: 'int',
      mail: 'string',
      title: 'string',
      password: 'string',
      lesson: 'Lesson[]',
    },
  };
  static admin = {
    name: 'Admin',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      tc: 'int',
      name: 'string',
      surName: 'string',
      telNo: 'int',
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
      name: 'string',
      surName: 'string',
      tc: 'int',
      password: 'string',
      title: 'string',
      confirm: 'string',
    },
  };
}

export const {useRealm, useObject, useQuery, RealmProvider} =
  createRealmContext({
    schema: [
      Exam.exam,
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
