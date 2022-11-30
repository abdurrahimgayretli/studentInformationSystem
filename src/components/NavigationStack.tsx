import {createStackNavigator} from '@react-navigation/stack';
import EnterExamNote from '../pages/LecturerPages/EnterExamNote';
import SelectStudents from '../pages/LecturerPages/SelectStudents';

const NavigationStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Select Students">
      <Stack.Screen name="Select Students" component={SelectStudents} />
      <Stack.Screen name="Enter Exam's Note" component={EnterExamNote} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
