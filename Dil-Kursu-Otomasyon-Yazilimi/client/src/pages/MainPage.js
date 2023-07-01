import React from "react";
import {Link} from "react-router-dom"
const MainPage = () => {

    return (
        <div>
            <div className="mainpage">
                <div class="container">
                    <div className="left-container">
                    
                    <Link to="/listBranches"><button type="button" class="btn btn-primary btn-lg">Şube Listele</button></Link>
                    <Link to="/studentSignUp"><button type="button" class="btn btn-primary btn-lg">Öğrenci Ekle</button></Link>
                    <Link to="/listStudents"><button type="button" class="btn btn-primary btn-lg">Öğrenci Listele</button></Link>
                    <Link to="/deleteStudent"><button type="button" class="btn btn-primary btn-lg">Öğrenci Sil</button></Link>
                    </div>
                    <div className="right-container">
                    <Link to="/enrollInCourse"><button type="button" class="btn btn-primary btn-lg">Öğrenciyi Kursa Ekle</button></Link>
                    <Link to="/DeleteStudentfromCourse"><button type="button" class="btn btn-primary btn-lg">Öğrenciyi Kurstan Sil</button></Link>
                    <Link to="/installment"><button type="button" class="btn btn-primary btn-lg">Taksit Al</button></Link>
                    <Link to="/"><button type="button" class="btn btn-primary btn-lg">Çıkış</button></Link>

                    </div>
                </div>
            </div>
        </div >
    )

};

export default MainPage;