import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeRouter, Route, Routes} from 'react-router-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NavigationDrawer from './components/NavigationDrawer';
import NavigationStack from './components/NavigationStack';
import {NativeBaseProvider} from 'native-base';

export default function App() {
  return (
    <PaperProvider>
      <NativeBaseProvider>
        <SafeAreaView className="flex-1 bg-white">
          <NativeRouter>
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mainPage" element={<NavigationDrawer />} />
              <Route path="/selectStudents" element={<NavigationStack />} />
            </Routes>
          </NativeRouter>
        </SafeAreaView>
      </NativeBaseProvider>
    </PaperProvider>
  );
}
