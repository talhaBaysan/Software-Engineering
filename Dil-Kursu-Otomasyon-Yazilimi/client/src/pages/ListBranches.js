import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";


const ListBranches = () => {
    const [courses, setCourses] = useState([]);
    const stopIt = (e) => {
        e.target.stop();
    }
    const startIt = (e) => {
        e.target.start();
    }

    const clickHandler = async (id) => {
        console.log("inside func id is: ", id)
        axios.post("http://localhost:4000/show-courses-branch", { branch_id: id }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setCourses(response.data.result)
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    const popPopUp = () => {
        setTimeout(function open(event) {
            document.querySelector(".popup").style.display = "block";
        }, 0
        )

        document.querySelector("#close").addEventListener("click", function () {
            document.querySelector(".popup").style.display = "none";
        });
    }


    /******Axios *********/
    const [branches, setBranches] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/show-branchs").then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setBranches(response.data)
            }
        }).catch((error) => {
            console.log(error)
        });

    }, [])

    return (
        <div>
            <div className="listBranches">
                <Link to="/mainPage"><button id="backButton" type="button" class="btn btn-primary btn-lg">Geri</button></Link>
                <div className="listContainer">
                    <div className="columnNames">
                        <p>Dersler</p>
                        <p>Şube Adı</p>
                        <p>Adres</p>
                        <p>Ulaşım Olanakları</p>
                    </div>
                    {branches.map((branch) =>
                        <div className="Entry" key={branch.sube_id}>
                            <marquee behavior="scroll" direction="left" scrollamount="7" onMouseOver={stopIt} onMouseOut={startIt} onClick={() => {
                                clickHandler(branch.sube_id)
                                popPopUp()
                            }}>{branch.diller}</marquee>
                            <p>{branch.isim}</p>
                            <marquee behavior="scroll" direction="left" scrollamount="7" onMouseOver={stopIt} onMouseOut={startIt} onClick={() => clickHandler(branch.sube_id)}>{branch.adres}</marquee>
                            <p>{branch.tanitim}</p>
                        </div>
                    )}

                </div>
                <div className="popup">
                    <button id="close">&times;</button>
                    <h2>Derslerin Seansları</h2>
                    {courses.map((course) =>
                        <p key={course.ders_id}>
                            {console.log(course)}
                            {course.dil} / {course.gun} / From {course.starttime} To {course.endtime} / {course.fiyat}TL
                        </p>
                    )}

                </div>
            </div>
        </div>
    )

};

export default ListBranches;