import React from 'react'
import './createexercise.css'


class CreateExercise extends React.Component {
  
    constructor(props){
        super(props);
        this.state ={
              name:'',
              description:'',
              duration:'',
              time:'',
              success: false,
              fullTimeValue: '',
        }
        this.changeHandler = this.changeHandler.bind(this)  /// binding
    
      } 
  
      changeHandler = (e)=>{        /// coreect value change
            this.setState({
                [e.target.name] : e.target.value
              }
            )
      }
  
       timeHandler = async () =>{  ///// this for get time formet
         let time = this.state.time
        if(time!== ""){
         var hour = time.split(":")[0];
         var minute = time.split(":")[1];
         var suffix = hour >= 12 ? "pm":"am";
            hour = hour % 12 || 12; 
            hour = hour < 10 ? "0"+hour : hour ; 
         var TimeValue = hour + ":"+minute+" "+suffix;
         this.setState({fullTimeValue: TimeValue});
         console.log(this.state.fullTimeValue)
    }
  }
      submitHanlder = async (e)=> {
          e.preventDefault();
       
           this.timeHandler();        /// create workout

           const {name,description,fullTimeValue,duration} = this.state
           
          const reqOptions = {
            method: 'POST',
            headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`},
           body :JSON.stringify({
                  'name': name,
                  'description':description,
                  'duration':duration,
                  'time':fullTimeValue,
          })
        }
           fetch('/api/v1/exercise',reqOptions)
               .then(res => res.json())
               .then(res => this.setState({success:res.success}))
               .catch(err => console.log(err))


          }
          
          
          
           
      
      render(){
          
      return ( 
          <div className="exercise_page">
               <div className="create_container">  
                  <h2>Create your Shedule</h2>
                  <div>{this.state.success ?
                   <p style={{color:'green'}}>Schedule Created. Refresh the page for load tasks..</p>
                    :""}</div>

                <form className="form" onSubmit={this.submitHanlder}>
                    <div className="form-group mt-4">
                    <label htmlFor="name" >Workout Name</label>
                    <input type="text"
                     id="name" 
                     name="name"
                     placeholder="running, walking, meditation, gym"
                     value={this.state.name}
                     onChange={this.changeHandler}
                     autoComplete='off'
                     className="form-control"
                     required
                     ></input>
                    </div>
                    <div className="form-group mt-2">
                    <label htmlFor="description" >Description</label>
                   <textarea rows="4" 
                   id="description" 
                   placeholder="some text"
                   name="description" 
                   value={this.state.description}
                     onChange={this.changeHandler}
                   autoComplete='off'
                   required
                   className="textarea form-control">
                   </textarea>
                    </div>
                    <div className="form-group mt-2">
                    <label htmlFor="duration">Duration</label>
                    <input type="text"
                     id="duration" 
                     name="duration"
                     value={this.state.duration}
                     onChange={this.changeHandler}
                     autoComplete='off'
                     required
                     className="form-control"
                     placeholder="10 minitues"
                     ></input>
                    </div>
                    
                    <div className="form-group mt-2">
                    <label htmlFor="time">Time</label>
                    <input type="time"
                     id="time" 
                     name="time"
                     required
                     onChange={this.changeHandler}
                     autoComplete='off'
                     className="form-control"
                     ></input>
                    </div>
                    <button type="submit"
                    className="btn btn-submit btn-primary mt-4"
                    onMouseOver={this.timeHandler}
                    >
                        submit
                    </button>
              </form> 
              </div>
              
          </div>
          )
    }
  }

export default CreateExercise
