/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import MainPage from '../pages/MainPage';
import LessonList from '../pages/StudentPages/LessonList';
import ExamsResults from '../pages/StudentPages/ExamsResults';
import StudentInfo from '../pages/StudentPages/StudentInfo';
import ExamStack from './ExamStack';
import ConfirmStudents from '../pages/ManagerPages/ConfirmStudents';

const NavigationDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Main Page" component={MainPage} />
        <Drawer.Screen name="Student Info" component={StudentInfo} />
        <Drawer.Screen name="Lesson List" component={LessonList} />
        <Drawer.Screen name="Exams of Results" component={ExamsResults} />
        <Drawer.Screen name="Select Student" component={ExamStack} />
        <Drawer.Screen name="Confirm Students" component={ConfirmStudents} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigationDrawer;
