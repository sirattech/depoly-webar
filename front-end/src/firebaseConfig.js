import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyDmYIH55P5oz8O1KzUb2upr0MXh_pq4ZHY",
        authDomain: "webarvideo.firebaseapp.com",
        databaseURL: "https://webarvideo-default-rtdb.firebaseio.com",
        projectId: "webarvideo",
        storageBucket: "webarvideo.appspot.com",
        messagingSenderId: "450281179517",
        appId: "1:450281179517:web:ada00de582a0c112b16414"
      };
      const app = initializeApp(firebaseConfig);
      return getDatabase(app)
}

export default StartFirebase;
//   export const startfirebase = initializeApp(firebaseConfig);