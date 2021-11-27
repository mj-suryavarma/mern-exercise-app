import React,{useState} from 'react'
import './home.css';
import Login from '../login/login'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


function Home() {

      const [isOpen, setIsOpen] = useState(false)

      const menuBarHandler = () =>{
           setIsOpen(!isOpen);
      }

    return (
        <div className="home_page">
                <div className="background_image"></div>
            <div className="home_header">
                <div className="logo home_logo">ExTrac</div>
                <div className="navbar_container">
                <nav className="navbar nav_bar navbar-expand-sm ">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#" className="nav-link">Contact</a>
                            </li>
                            <li className="nav-item">
                            <a href="#"className="nav-link">How It Works</a>
                            </li>
                            <li className="nav-item">
                            <a href="/register"className="nav-link">Register</a>
                            </li> 
                    </ul>
                </nav>
                </div>
                        <FontAwesomeIcon icon={faBars} className="font_bars" 
                    
                        onClick={menuBarHandler} />
            </div>

            <div className="home_body">
            <div className="welcome_message_container">
                <h2 className="welcome_message_header">Make Healthy Life</h2>
                <p className="welcome_message_para">Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.Pellentesque in ipsum id orci porta dapibus.</p>
                <p>
                    {localStorage.getItem('name') ? `Welcome Back ${localStorage.getItem('name')} !.` : ""}</p>
            </div> 
            <Login/>
                <p className="welcome_back">{localStorage.getItem('name') ? `Welcome Back ${localStorage.getItem('name')} !.` : ""}</p>
                  
            </div>
            <div id="menuBarContainer" 
           
            
            style={{display: isOpen ? "block":"none",
            transition:'1s'}}
             className="menu_bar navbar justify-content-center" >
                   
                   <div className="menuBar bg-light justify-content-center  ">

                    <div className="X_simple" onClick={menuBarHandler}>X</div>
                  <ul className="navbar-nav mt-5">
                      
                      <li className="navbar-item mt-4">
                          <a href="#" className="navbar-link mt-4" onClick={menuBarHandler}>Home</a>
                      </li>
                      
                      <li className="navbar-item mt-4">
                          <a href="#" className="navbar-link mt-4" onClick={menuBarHandler}>contact</a>
                      </li>
                      <li className="navbar-item mt-4">
                          <a href="#" className="navbar-link mt-4" onClick={menuBarHandler}>How It Works</a>
                      </li>
                      <li className="mt-4">
                          <a href="/register" className="navbar-link mt-2">Register</a>
                      </li>
                      
                  </ul>
                   </div>
            </div>
        </div>
    )
}

export default Home
