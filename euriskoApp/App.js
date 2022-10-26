/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import { PopupAlertType } from './src/constants';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import PopupMessage from './src/components/popupMessage';
import messagingServices from './src/services/local/messagingServices';
import { Provider } from 'react-redux';
import { store } from './src/redux/store'
const App = () => {
  const [popupState, setPopupState] = useState({
    content: '',
    type: PopupAlertType.Default,
    visible: false,
    autoHide: true,
  });
  useEffect(() => {
    messagingServices.registerListener({
      name: 'WrappedContext',
      callback: setPopupState,
    });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppNavigator />
        <PopupMessage
          errorMessage={popupState.content}
          modalVisible={popupState.visible}
          type={popupState.type}
          withTimeout={popupState.autoHide}
          onCloseCallback={() =>
            setPopupState({ ...popupState, visible: false })
          }
        />
      </SafeAreaProvider>
    </Provider>
  );
};



export default App;
