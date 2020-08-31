import React, { Component } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             password:'',
             dob:'',
             allUserDetails:[],
             login:[]
        }
    }
    onchange=(e)=>{
this.setState({
    [e.target.name]:e.target.value
})
    }

    componentWillMount=()=>{
        
        this.setState({
            allUserDetails:JSON.parse(localStorage.getItem('UsersData'))
        })
    }



    checkUserValid=()=>{
        const username=this.state.username
        const userpassword=this.state.password
        const dob=this.state.dob
        const AllUserDetails=this.state.allUserDetails

for(var user of AllUserDetails){
    
    var cur_date=new Date();
    var curyear = cur_date.getFullYear();
    var userdate=new Date(user.dob);
    var useryear=userdate.getFullYear();
    
    
    if(username==user.Email && userpassword ==user.Password && user.isAdmin==true){
        this.props.history.push('/admin')
         toast.success("Welcome Admin");
         break;
     }
     
    else if(username==user.Email && userpassword ==user.Password && user.isAdmin==false && user.status=='Activate'){
        if(curyear-useryear>=18)
        {
        let currentdate=new Date();
        const login=localStorage.setItem('login',JSON.stringify(currentdate));
        toast.success("Login successfull");
        this.props.history.push(`/test2/${username}`);
         break;
       }
       
    }
      else if(username!=user.Email && userpassword !=user.Password && user.isAdmin!=false && user.status !='Activate') {
         toast.error("You are not able to login");
         break;
     }
    }
     
    
   


}

    Signup=()=>{
        this.props.history.push('/signup')
    }
    render() {
        return (
            <div style={{paddingTop:'150px'}}>
            <div className='container center form-group' style={{width:'600px'}}>
                <center>
                    <h3 style={{ color: 'red' }}> Log In </h3>
                    <div className="row"> 
                    <form autoComplete='off' className="m-5 col-md-10">
                        <div className='row'> 
                        <div className='input-field col s12'>
                            <input type='text' name='username' placeholder='username' value={this.state.username} onChange={this.onchange} className='form-control validate'/>
                             </div>
                        </div>
                        <div className='row'> 
                        <div className='input-field col s12'>
                            <input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.onchange} className='form-control validate'/>
                             </div>
                        </div>



<button type='button' className='btn btn-primary ' onClick={this.checkUserValid}> LogIn</button>&nbsp;&nbsp;&nbsp;
<button type='button' className='btn btn-primary ' onClick={this.Signup}> SignUp </button>

                    </form>


                    </div>
                </center>
                </div>
            </div>
           
        )
    }
}

export default Login
