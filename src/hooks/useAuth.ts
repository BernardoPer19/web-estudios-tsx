// useAuth.ts
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth} from "../firebase/firebaseConfig"; 
import { RoleType, UserFirebase } from "../types/UserTypes";
import { getUserData, LoginUser, signOutUser, signUpUser } from "../services/AuthServices";

const useAuth = () => {
  const [user, setUser] = useState<UserFirebase | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar si el usuario esta logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData) {  
            setUser(userData);
          } else {
            setError("Usuario no encontrado en la base de datos.");
          }
        } catch (error) {
          console.error(error);
          setError("Error al recuperar datos del usuario.");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, role: RoleType) => {
    try {
      setLoading(true);
      const newUser = await signUpUser(email, password, role);
      setUser(newUser);
    } catch (error) {
      console.error(error);
      setError("Hubo un error al registrarte. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const loggedInUser = await LoginUser(email, password);
      setUser(loggedInUser);
    } catch (error) {
      console.error(error);
      setError("Hubo un error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await signOutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
      setError("Hubo un error al cerrar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    login,
    signOut,
  };
};

export default useAuth;
