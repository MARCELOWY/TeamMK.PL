// auth.js - Obsluga rejestracji, logowania i wylogowania w Firebase

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Rejestracja uzytkownika
function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Rejestracja udana", userCredential.user);
        })
        .catch((error) => {
            console.error("Błąd rejestracji", error.message);
        });
}

// Logowanie uzytkownika
function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Logowanie udane", userCredential.user);
        })
        .catch((error) => {
            console.error("Błąd logowania", error.message);
        });
}

// Wylogowanie uzytkownika
function logoutUser() {
    signOut(auth).then(() => {
        console.log("Wylogowano");
    }).catch((error) => {
        console.error("Błąd wylogowania", error.message);
    });
}

// Obserwowanie zmian stanu logowania
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Użytkownik zalogowany", user.email);
    } else {
        console.log("Brak zalogowanego użytkownika");
    }
});

// Eksportowanie funkcji
export { registerUser, loginUser, logoutUser };
