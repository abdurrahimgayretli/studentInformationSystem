import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavigationDrawer from './components/NavigationDrawer';
import {NativeBaseProvider} from 'native-base';

import {RealmProvider} from './models/User';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <PaperProvider>
      <NativeBaseProvider>
        <RealmProvider>
          <SafeAreaView className="flex-1 bg-white">
            <NavigationContainer>
              <NavigationDrawer />
            </NavigationContainer>
          </SafeAreaView>
        </RealmProvider>
      </NativeBaseProvider>
    </PaperProvider>
  );
}
