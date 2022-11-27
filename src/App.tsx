import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeRouter, Route, Routes} from 'react-router-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NavigationDrawer from './components/NavigationDrawer';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView className="flex-1 bg-slate-200">
        <NativeRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mainPage" element={<NavigationDrawer />} />
          </Routes>
        </NativeRouter>
      </SafeAreaView>
    </PaperProvider>
  );
}
