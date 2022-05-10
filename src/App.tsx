import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Home } from './pages/Home';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#1f1f1f" />

        <Home />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
