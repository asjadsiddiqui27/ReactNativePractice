/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store, persistor } from './src/Redux/store';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

enableScreens();
import { PersistGate } from 'redux-persist/integration/react';
const appcongi = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () =>
    appcongi
);
