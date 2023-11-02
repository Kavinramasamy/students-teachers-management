import "./App.css";
import Students from "./Students-Components/Students";
import "bootstrap/dist/css/bootstrap.min.css";
import Teachers from "./Teachers-Components/Teachers";
import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AddStudents } from "./Students-Components/AddStudent";
import UpdateStudents from "./Students-Components/UpdateStudents";
import StudentsList from "./Students-Components/StudentsList";
import TeachersList from "./Teachers-Components/TeachersList";
import UpdateTeachers from "./Teachers-Components/UpdateTeacher";
import { AddTeacher } from "./Teachers-Components/AddTeacher";
import Welcome from "./Welcome";
import NavBarPage from "./NavBarPage";

export const StudentContext = createContext(null);

function App() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const responseStudent = await fetch(
        "https://6543697301b5e279de20509f.mockapi.io/student-teacher-lists",
        {
          method: "GET",
        }
      );
      const studentData = await responseStudent.json();
      if (studentData) {
        setStudents(studentData);
      }
    };
    const getTeachers = async () => {
      const responseTeacher = await fetch(
        "https://6543697301b5e279de20509f.mockapi.io/teachers-list",
        {
          method: "GET",
        }
      );
      const teacherData = await responseTeacher.json();
      if (teacherData) {
        setTeachers(teacherData);
      }
    };
    getStudents();
    getTeachers();
  }, []);

  return (
    <div className="App">
      <NavBarPage />
      <StudentContext.Provider
        value={{ students, setStudents, teachers, setTeachers }}
      >
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/" element={<Students />}>
            <Route exact path="studentsList" element={<StudentsList />} />
            <Route path="addStudent" element={<AddStudents />} />
            {students.length > 0 && (
              <Route path="editStudent/:id" element={<UpdateStudents />} />
            )}
          </Route>
          <Route path="/" element={<Teachers />}>
            <Route path="teachersList" element={<TeachersList />} />
            <Route path="addTeacher" element={<AddTeacher />} />
            {teachers.length > 0 && (
              <Route path="/updateTeacher/:id" element={<UpdateTeachers />} />
            )}
          </Route>
          <Route path='*' element={<Welcome />} />
        </Routes>
      </StudentContext.Provider>
    </div>
  );
}

export default App;
