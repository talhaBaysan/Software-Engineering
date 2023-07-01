import React , {useState} from "react";
import {Link} from "react-router-dom"


import axios from "axios";
const StudentSignUp = () => {
  const [name, setName] = useState([]);
  const [surname, setSurname] = useState([]);
  const [citizenId, setId] = useState([]);
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState([]);
  
  const submitHandler = (e) =>{
    e.preventDefault();
    const data={
      name:  name,
      surname: surname,
      tc: citizenId,
      phone: phone,
      address: address,
    }
    console.log(data);
    axios.post("http://localhost:4000/register-student", data).then((response) => {
        console.log(response.data)
        alert("Ogrenci basariyla eklendi!")
        window.location.reload()

    }).catch((error)=>{
      console.log(error)
      alert("Bir hata oldu")
      //window.location.reload()
    });
  }

  return (
    <div>
      <div className="signUp">
      <Link to="/mainPage"><button id="backButton" type="button" class="btn btn-primary btn-lg">Geri</button></Link>
        <form  id="signUpForm" onSubmit={submitHandler}>
            <input type="text" className="myinput" required placeholder="Ad" onChange = { e => setName(e.target.value)}/>
            <input type="text" className="myinput" required placeholder="Soyad" onChange = { e => setSurname(e.target.value)}/>
            <input type="text" className="myinput" pattern="[0-9]{10}" maxLength = "10" required placeholder="T.C. No. 10 digits" onChange = { e => setId(e.target.value)}/>
            <input type="text" className="myinput" pattern="[0-9]{10}" maxLength = "10" required placeholder="Telefon No. 10 digits" onChange = { e => setPhone(e.target.value)}/>
            <input type="text" className="myinput" required placeholder="Adres" onChange = { e => setAddress(e.target.value)}/>
            <input id="signUpButton" type="submit"  value="Kaydet" className="btn btn-primary mybtn" />
        </form>
      </div>
    </div>
  )
  
};

export default StudentSignUp;