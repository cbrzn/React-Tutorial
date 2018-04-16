import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAGJqx3TtI0GPJ_uIeOi-mG_7VeQuzeDgo",
    authDomain: "catch-of-the-day-el-dandy.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-el-dandy.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
