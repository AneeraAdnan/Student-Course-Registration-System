import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Signin from './Signin';
import Dashboard from './Dashboard';
import AddCourses from './AddCourses';
import DropCourse from './Dropcourses';
import RegisterCourse from './RegisterCourse';
import CourseTimetables from './CourseTimetables'; 
import Feedbacks from './Feedbacks';


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register"/>}></Route>
        <Route path="/register" element={<Signup />} ></Route>
        <Route path="/signin" element={<Signin />} ></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addcourse" element={<AddCourses />}></Route>
        <Route path="/registercourse" element={<RegisterCourse/>} ></Route>
        <Route path="/dropcourse" element={<DropCourse/>} ></Route>
        <Route path="/timetable" element={<CourseTimetables />} ></Route>
        <Route path="/feedback" element={<Feedbacks />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


