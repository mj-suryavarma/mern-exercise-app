import React from 'react'  
import './register.css'

class Register extends React.Component {
   constructor(props){
       super(props);
       this.state = {
             name : '',
             email :'',
             password:'',
             msg:false,
             isLoading: false,
             isError:false,
             isSuccess: false,


       }
       this.changeHandler = this.changeHandler.bind(this)
       this.submitHandler = this.submitHandler.bind(this)
   }

   
    changeHandler =(e) => {
       const name = e.target.name;
       const value = e.target.value;
      this.setState({
        [name]:value
      })
     }



       submitHandler = async (e) => {
            e.preventDefault();
              this.setState({isLoading : true})
          const {name, email, password} = this.state
         

     const reqOptions= {
      method : 'POST',
      headers : {'Content-Type' : 'application/json',
                 "Accept": "*/*",
                "Accept-Encoding":"gzip, deflate, br",
                "Connection":"keep-alive",
                "Host":"<calculated when request is sent>",
              "Content-Length":"<calculated when request is sent>",
              "Access-Control-Allow-Origin": "*",

            },

      body : JSON.stringify({name,email,password})}

    await fetch('/api/v1/auth/register',reqOptions)
     .then(async res => await res.json())
     .then(data =>{
        this.setState({isLoading:false})
        if(data.token){
          this.setState({isSuccess:true})
          setTimeout(() =>
          {
               
            window.open("/","_self")
          },2000)
        }
        if(data.msg){
          this.setState({msg:true})      
        }
    })
     .catch(err => {
      this.setState({isError:true}) 
        this.setState({isLoading:false})
        console.log(err)
    })

    
   setTimeout(() => {
     this.setState({isError:false})
      this.setState({msg:false})   
      this.setState({isSuccess:false})
   }, 2000);
    }
    
    

    render(){
    return (
      <div className="register_page container">

        <div className="register_container container">
            <h2>Register</h2>
            <small style={{color:'red'}}>{this.state.isError ? "Invalid Credentials please provide another value":""}</small>
            <p style={{color:'red'}}>{this.state.msg ?  "Invalid Credentials please provide another value": "" }</p>
            <p style={{color:'green'}}>{this.state.isSuccess ? "Registration success..":""}</p>
          <form className="form" onSubmit={this.submitHandler}>
          <div className="form-group">
               <label htmlFor="name">Name: </label>
               <input type="name" 
               className="form-control"
                name="name" 
                autoComplete="off"
                id="name" 
                value={this.state.name}
                onChange={this.changeHandler}
                aria-describedby="emailHelpId"
                placeholder="e.g john"
                  required={true}/>
            <small id="emailHelpId" className="form-text text-muted"></small>
              </div>
             <div className="form-group">
               <label htmlFor="email">email: </label>
               <input type="email" 
               className="form-control"
                name="email" 
                autoComplete="off"
                id="email" 
                value={this.state.email}
                onChange={this.changeHandler}
                aria-describedby="emailHelpId"
                placeholder="example@email.com"
                  required={true}/>
        
             </div>
              <div className="form-group">
                <label htmlFor="password">password: </label>
                <input type="password" 
                className="form-control"
                value={this.state.password}
                onChange={this.changeHandler}
                 name="password"
               autoComplete="off"
                 id="password" 
                 placeholder="password"
                  required={true} />
              </div>
              <div id="emailHelpId" className="form-text text-muted">
              We'll Never share your email</div><div id="emailHelpId" className="form-text text-muted">
               name must be min 3 max 20.</div><div id="emailHelpId" className="form-text text-muted">
               </div><div id="emailHelpId" className="form-text text-muted">
               password min-length 6</div>
              <button type="submit"
               className="btn btn-submit btn-primary mt-3"
              disabled={this.state.isLoading}  >{this.state.isLoading ? "Loading..":"Submit"}</button>
              <h5 className="mt-3">Already have an Account? <a href="/">login</a></h5>
          </form> 
        </div>
      </div>

    )
  }
}

export default Register
