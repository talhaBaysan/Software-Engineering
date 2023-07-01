import React,  {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios";

const ListStudents = () => {
    const [students, setStudents] = useState([]);
    useEffect(() =>{
        axios.get("http://localhost:4000/show-students").then((response) => {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            setStudents(response.data)
        }
        }).catch((error) => {
            console.log(error)
        });

    },[])
    console.log(students)
    
  return (
    <div>
        <div className="listStudents">
        <Link to="/mainPage"><button id="backButton" type="button" class="btn btn-primary btn-lg">Geri</button></Link>
            <div className="listContainer">
                <div className="columnNames">
                    <p>İsim</p>
                    <p>Soyisim</p>
                    <p>T.C. No.</p>
                    <p>Ders id</p>
                    <p>Ödeme Bilgisi</p>
                </div>
                {students.map((student) =>
                    <div className="Entry"  key={student.kayit_id}>
                    <p>{student.isim}</p>
                    <p>{student.soyisim}</p>
                    <p>{student.tc}</p>
                    <p>{student.ders_id}</p>
                    <p>{ student.pesin ? student.pesin + " taksit var" : "Odendi"  }</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
  
};

export default ListStudents;