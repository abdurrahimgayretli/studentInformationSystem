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
import EditLessonList from '../pages/ManagerPages/EditLessonList';
import EditAnnouncement from '../pages/ManagerPages/EditAnnouncement';
import EditFoodList from '../pages/ManagerPages/EditFoodList';
import {User, useQuery} from '../models/User';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

const NavigationStack = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Sign Up">
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Pages"
          component={NavigationDrawer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NavigationDrawer = ({route}: any) => {
  const Drawer = createDrawerNavigator();

  const users = useQuery<User>('User');
  const lesson = useQuery<User>('Lesson');

  const {userTc} = route.params;
  const user = users.find(val => {
    return val.tc === userTc;
  });

  return (
    <Drawer.Navigator
      initialRouteName="Main Page"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Main Page"
        initialParams={{user: user}}
        component={MainPage}
      />
      {user?.title === 'Student' ? (
        <>
          <Drawer.Screen
            name="Student Info"
            initialParams={{user: user}}
            component={StudentInfo}
          />
          <Drawer.Screen
            name="Lesson List"
            initialParams={{user: user}}
            component={LessonList}
          />
          <Drawer.Screen
            name="Exams of Results"
            initialParams={{user: user}}
            component={ExamsResults}
          />
        </>
      ) : user?.title === 'Lecturer' ? (
        <>
          <Drawer.Screen name="Select Student" component={ExamStack} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Confirm Students" component={ConfirmStudents} />
          <Drawer.Screen
            name="Edit And Add Lesson"
            initialParams={{lesson: lesson}}
            component={EditLessonList}
          />
          <Drawer.Screen
            name="Edit Announcement"
            component={EditAnnouncement}
          />
          <Drawer.Screen name="Edit Food List" component={EditFoodList} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default NavigationStack;
