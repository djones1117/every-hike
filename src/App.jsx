import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import FeedPage from "./pages/FeedPage/Feed";
import userService from "./utils/userService";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import TestPage from "./pages/TestPage/TestPage";
//any component rendered by a route goes in the pages folder
//client side routing, just for showing or hiding components based on the path
//in the url
function App() {
  // this will get the token from localstorage and decode it when the page loads up
  //sets it to our initial state
  //if there is a token, user will be the user object
  //if there is no token, user will be null
  const [user, setUser] = useState(userService.getUser);

  //updates the state everytime someone logs in or signs up in handlesubmit of loginpage/signuppage
  //makes sure we get the most recent token that was made
  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();

    setUser(null);
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<FeedPage user={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/:username"
        element={<ProfilePage user={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/explore"
        element={<ExplorePage user={user} handleLogout={handleLogout} />}
      />

      <Route path="/Test" element={<TestPage />} />
    </Routes>
  );
}

export default App;
