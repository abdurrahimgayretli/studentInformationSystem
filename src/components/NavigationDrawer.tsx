/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import MainPage from '../pages/MainPage';
import StudentPage from '../pages/StudentPage';
import LecturerPage from '../pages/LecturerPage';
import ManagerPage from '../pages/ManagerPage';

const NavigationDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={MainPage} />
        <Drawer.Screen name="Student" component={StudentPage} />
        <Drawer.Screen name="Lecturer" component={LecturerPage} />
        <Drawer.Screen name="Manager" component={ManagerPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigationDrawer;
