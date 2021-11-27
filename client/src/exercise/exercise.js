import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {faEdit,faTrashAlt,faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import './exercise.css';
import CreateExercise from './create/createexercise';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



function Exercise() {
 
    const [allData,setAllData] = useState({})
    const [toggle,setToggle] = useState(false)
    
    const deleteHandler = async (e) => {
        
        let params = window.location.search
        const id = new URLSearchParams(params).get('id');
        
        //// delete the  task
       const reqOptions = {          
         headers:{
                 'Content-Type':'application/json',
                 'Authorization':`Bearer ${localStorage.getItem('token')}`}
     }

       await axios.delete(`/api/v1/exercise/${id}`,reqOptions)
            .then(res =>{
              console.log(res.success)
              
             })
            .catch(err => {
              console.log(err)
            })
            
         
         
        }
        const toggleHandler = () => {
          setToggle(!toggle)
        }
        const logoutHandler = () => {
          localStorage.removeItem("token")
          localStorage.removeItem("name")
        }

        useEffect( async() => {
          const  token = localStorage.getItem('token')

          const reqOptions = {

            headers : {     // get user's all exercise
                           'Content-Type':'application/json', 
                        'Authorization':`Bearer ${token}`,
                    }
             
          }
             
                    axios.get('/api/v1/exercise',reqOptions)
                      .then(res => { 
                          setAllData(res.data.getAllExercise)
                    })
                      .catch(err =>console.log(err))  
        },[])

    return (  <div className="AllExercisePage">
            <div className="exercise_header" >
                 <a href="/exercise" style={{textDecoration:'none', color:'white'}}> <div className="extrac_logo logo">
                    ExTrac</div></a>
                  <div className="user_name" onClick={toggleHandler}>
                    <div>Hi,{localStorage.getItem('name')}</div>
                   <a href="/" 
                   onClick={logoutHandler}
                   style={toggle ? {textDecoration:'none',color:"black"}:{display:'none'}}><div className="logout">Logout</div></a>
                    </div>
                  
            </div>
            <div className="exercise_body">

            <CreateExercise />
           <div className="all_exercise_container">
               {Array.isArray(allData)&& allData.length ===0 ? <h3 className="all_exercise">
                 Nothing Any Schedule Added
               </h3>:""}
               {Array.isArray(allData) ?allData.map((data,id) => {
           let params = window.location.search              //// id get from browser url
           const currentId = new URLSearchParams(params).get('id');
   

                 return <div className={data.completed ? "updated all_exercise"
                 :"not_updated all_exercise"} key={data._id}>
               <h3>{data.name}</h3>
               <p>{data.description}</p>
               <p>{data._id}</p>
               <div className="all_exercise_time_container">
                  <div>{data.duration}</div>
                  <div className="exercise_time">{data.time}</div>
               </div>
               <div className="all_exercise_icons_container">
                    <div >
                    <a href={`/exercise/update?id=${data._id}`}>

                        <FontAwesomeIcon icon={faEdit} className="edit_icon" />
                    </a>
                    </div>
                    
                    
                    <a href={`/exercise?id=${data._id}`}
                              key={id}
                              data-exercise={data._id}
                              className="exercise_container_link" 
                              style={{textDecoration:'none'}} >
                      <div className="delete_tag"
                      style={data._id === currentId ?  {backgroundColor:'red'}: {backgroundColor:'white'}}
                      >
                        <FontAwesomeIcon 
                        className="trash_icon"
                        data-toggle='tooltip'
                        data-placement='top'
                        title="please select the tag for delete"
                         onClick ={deleteHandler}
                        icon={faTrashAlt} />
                      <div className="delete_tag_circle"></div>
                    </div>
                    </a>

               <FontAwesomeIcon icon={faCheckCircle} 
               className={data.completed ? "updated check_icon green_check":"not_updated check_icon"}
               />          

               </div>
                </div>  
                }) : <h3 className="all_exercise">workout schedule on progress...</h3>}
           </div>
         </div>
         <div>

         </div>
    </div>
        )
  



  }
export default Exercise
