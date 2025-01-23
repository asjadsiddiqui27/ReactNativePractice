import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

export const getOnlineStatus = ({user}) => {

  if (user) {
    const userStatusDatabaseRef = database().ref(`/status/${user.uid}`);

    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: database.ServerValue.TIMESTAMP,
    };

    const isOnlineForDatabase = {
      state: 'online',
      last_changed: database.ServerValue.TIMESTAMP,
    };

    database()
      .ref('.info/connected')
      .on('value', async (snapshot) => {
        if (snapshot.val() === false) {
          return;
        }

        await userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase);
        userStatusDatabaseRef.set(isOnlineForDatabase);

        // Optional: Update Firestore too for querying purposes
        firestore().collection('users').doc(user.uid).update({
          isOnline: true,
          lastSeen: firestore.FieldValue.serverTimestamp(),
        });

        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase);
      });
  }
};
