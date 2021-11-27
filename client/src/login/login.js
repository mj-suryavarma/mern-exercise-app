import React from 'react'  


class Login extends React.Component {
   constructor(props){
       super(props);   /// initialize values
       this.state = {
             email :'',
             password:'',
             msg:false,
             backend:'',
             isLoading: false,
             isError:false,


       }
       this.changeHandler = this.changeHandler.bind(this)
       this.submitHandler = this.submitHandler.bind(this)
   }

   
    changeHandler =(e) => {
       const name = e.target.name;
       const value = e.target.value;
      this.setState({
        [name]:value              ////change handler
      })
     }

     
     submitHandler = async (e) => {
          this.setState({isLoading:true})   //// submite handler
            e.preventDefault();
          
          const { email, password} = this.state
          const reqOptions= { ///  send client request to server
            method : 'POST',
            headers : {'Content-Type' : 'application/json', 
                       "Accept": "*/*",
                      "Accept-Encoding":"gzip, deflate, br",
                      "Connection":"keep-alive",
                      "Host":"<calculated when request is sent>",
                    "Content-Length":"<calculated when request is sent>",

                  },

            body : JSON.stringify({email,password})    }

 try {  await fetch('/api/v1/auth/login',reqOptions)   //// receive the response using fetch
     .then(async res => await res.json())
     .then( data =>  {
       this.setState({backend:data})
       this.setState({isLoading:false})   
      })
     .catch(err => console.log(err))
     
     this.setState({isLoading:false})          

     const {token,user:{name}} = this.state.backend    /// get token and user info

     if(token && name){
        localStorage.setItem('token',token)        /// gateway
        localStorage.setItem('name',name)
       window.open('/exercise',"_self")

    }
    else{
           this.setState({isError:true})
    } 


    }  catch(err){
         console.log(err)
         this.setState({isError:true})
         
          }
    
          setTimeout(() => {
            this.setState({isError: false})
          }, 3000);
      }    
 

    render(){
    return (
        <div className="login-container">
            <h4>Login</h4>
            <small style={{color:'red'}}>
              {this.state.isError ? "Invlid Credentials" : ""}
              </small>
            <p style={{color:'red'}}>{this.state.msg ? "Invalid Credentials ": "" }</p>
          <form className="form form_submit" onSubmit={this.submitHandler}>
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
            <small id="emailHelpId" className="form-text text-muted email_help">
              We'll Never share your email</small>
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
              <button type="submit" 
              className="btn btn_submit btn-primary mt-3"
              disabled={this.state.isLoading}>
                {this.state.isLoading ? "Loading..": "submit"}</button>
              <p className="mt-3">Are you new person ? <a href="/register" style={{textDecoration:'none'}}>Register</a></p>
          </form> 
        </div>
    )
  }
}

export default Login
