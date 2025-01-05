// useAuth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { UserFirebase } from "../types/UserTypes";


//funcion para obtener los datos del usuario
export const getUserData = async (
  uid: string
): Promise<UserFirebase | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        uid: uid,
        email: userData.email || "",
        password: userData.password || "",
        role: userData.role || "student",
        coursesEnrolled: userData.coursesEnrolled || [],
        createAT: userData.createAT || Date.now(),
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error al recuperar datos del usuario.");
  }
};

//funcion para crear un usuario
export const signUpUser = async (
  email: string,
  password: string,
  role: string
): Promise<UserFirebase> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {
    email,
    password,
    role,
    coursesEnrolled: [],
    createAT: Date.now(),
  });

  return {
    uid: user.uid,
    email: user.email || "",
    password: password,
    role,
    coursesEnrolled: [],
    createAT: Date.now(),
  };
};



//funcion para loggerar al usuario
export const LoginUser = async (
  email: string,
  password: string
): Promise<UserFirebase> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  const userDoc = await getDoc(doc(db, "users", user.uid));

  if (!userDoc.exists()) {
    throw new Error("Usuario no encontrado en la base de datos");
  }

  const userData = userDoc.data();
  return {
    uid: user.uid,
    email: user.email || "",
    password: userData.password || "",
    role: userData.role || "student",
    coursesEnrolled: userData.coursesEnrolled || [],
    createAT: userData.createAT || Date.now(),
  };
};

//fucion para cerrar sesion del usuario
export const signOutUser = async () => {
  await firebaseSignOut(auth);
};
