import React,{useState} from "react";
import {Link} from "react-router-dom"

import axios from "axios";
const Installment= () => {
    const [citizenId, setId] = useState([]);
    const submitHandler = (e) =>{
      e.preventDefault();
      const data={
        tc:  citizenId,
      }
      console.log(data);
      axios.post("http://localhost:4000/get-installment", data).then((response) => {
          console.log(response.data)
          if(response.data.affectedRows==0){
            alert("Hatali TC numara!")
          }
          else{
            if(response.data.changedRows==0){
              alert("Kalan taksit yok")
            }
            else{
              alert("Taksit basariyla alindi")
            }
          }
          window.location.reload()        
        
      }).catch((error) => {
          console.log(error)
          alert("Hatali TC numara!")
          window.location.reload()
      });
    }

  return (
    <div>
        <div className="installment">
          <Link to="/mainPage"><button id="backButton" type="button" class="btn btn-primary btn-lg">Geri</button></Link>
                <div className="installmentForm">
                <form  id="installmentForm" onSubmit={submitHandler}>
                    <input type="text" className="myinput" required placeholder="T.C. No." onChange = { e => setId(e.target.value)}/>
                    <input id="installmentButton" type="submit"  value="Taksit Al" className="btn btn-primary mybtn" />
                </form>
            </div>
        </div>
    </div>
  )
  
};

export default Installment;