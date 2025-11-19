import React, {useState} from "react";
import './App.css';
import{
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import {auth, googleProvider} from "./firebaseConfig";

function App() {
  // This will hold the user information
  const [user, setUser] = useState(null);
  const [loginEmail, setEmail] = useState("");
  const [loginPassword, setPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // This will hold the uploaded image URL
  const uploadedImageURL = null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      setUser(userCredentials.user);
      console.log(userCredentials.user);
    } catch(error){
      console.error("Error logging in:", error);
    }
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    try{
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      )
      setUser(userCredentials.user);
      console.log(userCredentials.user);
    } catch(error){
      console.log("Error signing up:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoogleSignIn = async() => {
    try{
      const userCredentials = await signInWithPopup(auth, googleProvider);
      setUser(userCredentials.user);
      console.log(userCredentials.user);
    } catch(error){
      console.log(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Firebase Authentication & File Upload Demo</h1>
        {/* Check if the user exists (is logged in) to show the login or welcome screen */}
        {!user ? (
          <>
            <form onSubmit={handleLogin}>
              <h3>Login</h3>
              <input
                type="email"
                placeholder="Email"
                required
                value = {loginEmail}
                onChange={(e) => setEmail(e.target.value)}

              />
              <input
                type="password"
                placeholder="Password"
                required
                value = {loginPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>

            <form onSubmit={handleSignUp}>
              <h3>Sign Up</h3>
              <input
                type="email"
                placeholder="Email"
                required
                value = {signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value = {signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
              <button type="submit">Sign Up</button>
            </form>

            <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
          </>
        ) : (
          <div>
            <p>Welcome, {user?.displayName || user?.email}</p>
            <button onClick={handleLogout}>Sign Out</button>

            {/* Image upload section */}
            <h3>Upload an Image</h3>
            <input type="file" />
            <button>Upload</button>

            {/* Display uploaded image if there is one*/}
            {uploadedImageURL && (
              <div>
                <h4>Uploaded Image:</h4>
                <img
                  alt="Uploaded"
                  style={{ width: "300px", height: "auto" }}
                />
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
