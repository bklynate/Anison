const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyAhSyDZ7Zp8nAsNpWLodJec62PMuGmHATI",
  authDomain: "anison-a3b12.firebaseapp.com",
  databaseURL: "https://anison-a3b12.firebaseio.com",
  storageBucket: "anison-a3b12.appspot.com",
  messagingSenderId: "593100479618"
};
firebase.initializeApp(firebaseConfig);

let fbdb = firebase.database();

module.exports = fbdb;
