import React , {useState, useEffect} from "react";
import {Link} from "react-router-dom"


import axios from "axios";
const EnrollInCourse = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() =>{
    axios.get("http://localhost:4000/show-courses").then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setCourses(response.data)
      }
    }).catch((error)=>{
      console.log(error)
    });
  },[])
  

  const [citizenId, setId] = useState([]);
  const [course, setCourse] = useState([]);
  const [odeme, setOdeme] = useState([]);
  const submitHandler = (e) =>{
    e.preventDefault();
    const data={
      tc: citizenId,
      course: course,
      odeme: odeme,

    }
    console.log(data);
    axios.post("http://localhost:4000/add-to-course", data).then((response) => {
      console.log(response)
      alert("Ogrenci Basariyla kursa eklendi")
    }, []).catch((error)=>{
      console.log(error)
      alert("Hatali TC")
    });
  }

  return (
    <div>
      <div className="EnrollInCourse">
      <Link to="/mainPage"><button id="backButton" type="button" class="btn btn-primary btn-lg">Geri</button></Link>
        <form  id="enrollForm" onSubmit={submitHandler}>

            <input type="text" className="myinput" required placeholder="T.C. No." onChange = { e => setId(e.target.value)}/>
            <select id="courseSelection"onChange = { e => setCourse(e.target.value)} name="courses"    required>
            <option hidden>Bir Kurs Seçin</option>
            {courses.map((course) =>
              <option key={course.ders_id} value={course.ders_id}>
                {course.dil} / {course.gun} / From {course.starttime} To {course.endtime} / {course.fiyat}TL / {course.isim} 
              </option>
            )}
            </select>
            
            <select class="form-select" aria-label="Default select example" required onChange = { e => setOdeme(e.target.value)}>
              <option hidden>Ödeme Yöntemi Seçin</option>
              <option value="0">Peşin</option>
              <option value="6">Taksit</option> 
            </select>
            <input id="enrollButton" type="submit"  value="Kaydet" className="btn btn-primary mybtn" />
        </form>
      </div>
    </div>
  )
  
};

export default EnrollInCourse;