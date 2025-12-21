import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/singin";
import Managers from "./pages/menagers";
import Admins from "./pages/admins";
import Teachers from "./pages/teachers";
import Students from "./pages/students";
import Groups from "./pages/groups";
import Courses from "./pages/courses";
import Profile from "./pages/profile";
import Priviteroute from "./components/priviteroute";
import Home from "./pages/home";
import Mainlayout from "./layouts/Mainlayout";
import Settings from "./pages/settings";
import Payments from "./pages/payments";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
         <Route path="/" element={<Priviteroute />}> 
          <Route index element={<Home/>} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/payments" element={<Payments/>} />
         </Route> 
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default App;