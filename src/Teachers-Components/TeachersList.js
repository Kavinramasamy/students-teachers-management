import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { StudentContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function TeachersList() {
    const navTo = useNavigate();
    //delete functionality
    const deleteTeacher = async (teacherId) => {
        const response = await fetch(
            `https://644b33c517e2663b9deab9c8.mockapi.io/Teachers/${teacherId}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        if (data) {
            const remainingTeachers = teachers.filter(
                (teacher, idx) => teacher.id !== teacherId
            );
            setTeachers(remainingTeachers);
        }
    };
    //Getting Teachers data

    const { teachers, setTeachers } = useContext(StudentContext);

    return (
        <div className="container w-100">
            <div className="row justify-content-around p-3">
                {teachers.map((data, idx) => (
                    <Card className='card col-sm-6 col-md-4 col-lg-3 border border-lightdark shadow rounded m-3 h-100 ' key={idx}>
                        <Card.Body>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>{data.qualification}</Card.Text>
                            <Card.Text>{data.gender}</Card.Text>
                            <Card.Text>{data.experience}</Card.Text>
                            <Button className='mx-3 px-3' variant="secondary" onClick={() => navTo(`/updateTeacher/${data.id}`)}><i className="fa-solid fa-pen"></i></Button>
                            <Button className='mx-3 px-3' variant="danger" onClick={() => deleteTeacher(data.id)}><i className="fa-solid fa-trash"></i></Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
