import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDI_MmDHL0jY2EPA8ANtCHA8NXgMYReLZc",
    authDomain: "dora-assignment.firebaseapp.com",
    projectId: "dora-assignment",
    storageBucket: "dora-assignment.firebasestorage.app",
    messagingSenderId: "460153172696",
    appId: "1:460153172696:web:005aa24bcc7565409f9dad",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);