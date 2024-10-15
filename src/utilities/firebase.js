import { getDatabase, onValue, ref, update, get, push, set,remove } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCPJhTswV7OHI1weBX4_0dMqRSauCwUDJs",
    authDomain: "yellowteam-goodneigh.firebaseapp.com",
    databaseURL: "https://yellowteam-goodneigh-default-rtdb.firebaseio.com",
    projectId: "yellowteam-goodneigh",
    storageBucket: "yellowteam-goodneigh.appspot.com",
    messagingSenderId: "157525304360",
    appId: "1:157525304360:web:5e9cc1389851deb0d3011d",
    measurementId: "G-VP1GR150E7"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => (
        onValue(ref(database, path), (snapshot) => {
            setData(snapshot.val());
        }, (error) => {
            setError(error);
        })
    ), [path]);

    return [data, error];
};

const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback(async (value) => {
        console.log('Updating path:', path);
        console.log('Value before update:', value);

        if (!value || typeof value !== 'object') {
            console.error("Invalid value passed to updateData:", value);
            return;
        }

        const dbRef = ref(database, path);
        update(dbRef, value)
            .then(() => setResult(makeResult()))
            .catch((error) => {
                console.error("Error during Firebase update:", error);
                setResult(makeResult(error));
            });
    }, [path]);

    return [updateData, result];
};

export { firebase, database, auth };

export const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
};

export const signOut = () => firebaseSignOut(auth);

export const useAuthState = () => {
    const [user, setUser] = useState();

    useEffect(() => (
        onAuthStateChanged(auth, setUser)
    ), []);

    return [user];
};

export const useDbAdd = (path) => {
    const [result, setResult] = useState(null);
  
    // Given data and a key, the key is used to create a new path for the data
    const add = async (data, key) => {
      try {
        const newRef = ref(database, `${path}/${key}`); // Use the key passed in the argument
        await set(newRef, data); // Set data at the specified reference
        setResult({ message: 'Request added successfully!', error: false });
      } catch (error) {
        setResult({ message: error.message, error: true });
      }
    };
  
    return [add, result];
  };

  export const useDbRemove = () => {
    const [result, setResult] = useState(null);

    const removeData = useCallback(async (path) => {
        try {
            const dbRef = ref(database, path);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                await remove(dbRef);
                setResult({ message: `Removed successfully`, error: false });
            } else {
                setResult({ message: `Error: No data found at path: ${path}`, error: true });
            }
        } catch (error) {
            setResult({ message: error.message, error: true });
        }
    }, []);

    return [removeData, result];
};
export const getRef = (path) => {



};
