import React from 'react'
import './update.css'
import axios from 'axios';


class UpdateExercise extends React.Component {
  
    constructor(props){
        super(props);
        this.state ={
              iscompleted:false,
              name:'',
              description:'',
              duration:'',
              time:'',
              success: false,
              fullTimeValue: '',
              isLoading:false,
              success:false,
        }
        this.changeHandler = this.changeHandler.bind(this)  /// binding
    
      } 
  
      changeHandler = (e)=>{        /// correct value change
            this.setState({
                [e.target.name] : e.target.value
              }
            )
      }

      clickHandler = () => {     // click handler for check box
           this.setState({iscompleted:!this.state.iscompleted})
      }
      
      
      
      componentDidMount() {
  const params = window.location.search;
  const id = new URLSearchParams(params).get('id')  
  const reqOptions = {
          
    headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`},
   
}

  axios.get(`/api/v1/exercise/update/${id}`,reqOptions)
  .then(res => {
    const {name, description,duration,time,completed} = res.data.exercise
    this.setState({
      name,
      description,         /// get the curren user infomation 
      duration,
      time,
      iscompleted:completed, 
      
    })
    console.log(res.data.exercise)})
  .catch(err =>console.log(err))



}


       timeHandler = async () =>{  ///// this for get time formet
         let time = this.state.time
        if(time!== ""){
         var hour = time.split(":")[0];
         var minute = time.split(":")[1];
         var suffix = hour >= 12 ? "pm":"am";
            hour = hour % 12 || 12; 
            hour = hour < 10 ? "0"+hour : hour ; 
         var TimeValue = hour + ":"+minute+":"+suffix;
         this.setState({fullTimeValue: TimeValue});
         console.log(this.state.fullTimeValue)
    }
  }
      submitHanlder = async (e)=> {
          e.preventDefault();
           this.timeHandler();
           this.setState({isLoading:true})      
           
           /// update the user information

           const params = window.location.search;    /// current user is id
           const id = new URLSearchParams(params).get('id')  

           const {name,description,fullTimeValue,duration,iscompleted} = this.state
           
          const reqOptions = {          
            headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`}
        }

        const body = {
          'name': name,
          'description':description,
          'duration':duration,
          'time':fullTimeValue,
          'completed':iscompleted,
  
        }
        console.log("completed value ",iscompleted)
          await axios.patch(`/api/v1/exercise/update/${id}`,body,reqOptions)
               .then(res =>{
                 const {success} = res.data
                this.setState({success:success})
                this.setState({isLoading:false})

                })
               .catch(err => {
                 console.log(err)
                this.setState({isLoading:false})
              })
              this.setState({isLoading:false})

              
          }
          
          
          
           
      
      render(){
        

          
      return ( 
          <div className="exercise_update_page">
               <div className="update_container">  
                  <h2>Update your Shedule</h2>
                  <div>{this.state.success ?
                   <p style={{color:'green'}}>Successfully Updated..</p>
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
                    <div class="form-check form-group mt-2">

                      <label class="form-check-label mr-1" htmlFor="iscompleted">
                          Completed
                          </label>
                        <input type="checkbox"  
                        class="form-check-input form-control " 
                        name="iscompleted" 
                        id="iscompleted"
                         checked={this.state.iscompleted}
                         onChange={this.clickHandler}
                         />
                         <p className="text-muted">Please checked this completed icon if you completed the task.</p>
                    </div>
                    <button type="submit"
                    className="btn btn-submit btn-primary mt-4"
                    onMouseOver={this.timeHandler}
                    >
                        {this.state.isLoading ?
                        "Updating":"Update"}
                    </button>
                    <p className="mt-3">Back to <a href="/exercise" >Traceboard</a></p>
              </form> 
              </div>
              
          </div>
          )
    }
  }

export default UpdateExercise
