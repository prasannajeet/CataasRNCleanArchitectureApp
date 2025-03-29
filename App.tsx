import React from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from './src/presentation/styles/theme';
import {setupCataasLogger} from './src/core/logger/setupLogger';
import {AppNavigator} from './src/presentation/navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

setupCataasLogger();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

export default App;
