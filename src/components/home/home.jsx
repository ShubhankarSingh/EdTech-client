import React from 'react'
import iitB from "./static/images/iit-b.png"
import iitD from "./static/images/iit-d.png"
import bgImg from "./static/images/bg-img.png"
import apple from "./static/images/apple.png"
import adobe from "./static/images/adobe.png"
import adidas from "./static/images/adidas.png"
import defaultProfile from "./static/images/default_profile.jpg"
import python from "./static/images/python.jpg"
import photoshop from "./static/images/photoshop.jpg"
import java from "./static/images/java.jpg"
import "./static/styles/Home.css"

const Home = () => {

  return (
    <div>

    <section id="header">
        <h3 className="header-text">Learn Without Limits</h3>
        <div className="header-image">
            <img src={bgImg} alt=""/>
        </div>
        <p className="header-desc">Discover the fastest, most effective way to gain job-ready expertise for the careers of the future.</p>
    </section>

    <hr/>
    <div className="heading">
        <h3>We have students from 100+ colleges and companies</h3>
    </div>
    <section id="our-students">
        
        <img src={iitB} alt="" className="logo"/>
        <img src={iitD} alt="" className="logo"/>
        <img src={adobe} alt="" className="logo"/>
        <img src={apple} alt="" className="logo"/>
       
    </section>

    <hr/>

    <div className="heading">
        <h3>Top-selling Courses</h3>
    </div>
    <section id="top-courses">
        <div className="row">
        <div className="col-lg-4 mb-4 d-flex align-items-stretch">
            <div className="card card-bg" style={{ padding: 0, borderRadius: 0, border: 0 }}>
                <img src={python} alt="" className="course-image"/>
                <div className="card-body"> 
                    <div className="course-content">
                        <h5 className="card-title">Python For Begineers</h5>
                        <p className="card-text text-color">This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-4 mb-4 d-flex align-items-stretch">
            <div className="card card-bg">
                <img src={java} alt="" className="course-image"/>
                <div className="card-body"> 
                    <div className="course-content">
                        <h5 className="card-title">Advanced Java</h5>
                        <p className="card-text text-color">Learn Java In This Course And Become a Computer Programmer. Obtain valuable Core Java Skills And Java Certification</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-4 mb-4 d-flex align-items-stretch">
            <div className="card card-bg">
                <img src={photoshop} alt="" className="course-image"/>
                <div className="card-body"> 
                    <div className="course-content">
                        <h5 className="card-title">Adobe Photoshop 2023</h5>
                        <p className="card-text text-color">This Adobe Photoshop Essentials course will teach you Photoshop Retouching as well as Photoshop for graphic design.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>

    <div className="footer-dark">
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 item text">
                        <h3>Location</h3>
                        <p>22, Lorem ipsum dolor, consectetur adipiscing</p>
                        <p className="mb-0"><i className="fa fa-phone mr-3"></i>(531) 554-3410</p>
                        <p><i className="fa fa-envelope-o mr-3"></i>info@edtech.com</p>
                    </div>
                    <div className="col-lg-4 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 item text">
                        <h3>Ed-Tech</h3>
                        <p>Ed-Tech is an online E-learning platform that connects thousands of students with the skills they need to succeed. A-plus as of July 2021</p>
                    </div>
                    <div className="col item social">
                        <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                    </div>
                </div>
                <p className="copyright">Ed-Tech © 2024</p>
            </div>
        </footer>
    </div>

    </div>
  )
}

export default Home