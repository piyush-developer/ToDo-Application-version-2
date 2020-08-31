import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import disableBrowserBackButton from 'disable-browser-back-navigation';
import '../App.css';

export class Admin extends Component {
    
    constructor(props) {
    super(props)

    this.state = {
         allviewApplication:[]
    }
}
 componentDidMount(){
    var arr=JSON.parse(localStorage.getItem('UsersData'))
    this.setState({
        allviewApplication:arr
    })
}

activate=(e)=>{
var person=e.target.value
var arr=JSON.parse(localStorage.getItem('UsersData'))

for(var i=0;i<arr.length;i++){
    if(arr[i].FirstName==person){
        arr[i].isUserActive=true
        arr[i].status='Activate'
        this.setState({
            allviewApplication:arr
        })
        break;
    }
}

localStorage.setItem('UsersData',JSON.stringify(arr))
}

deactivate=(e)=>{
    var person=e.target.value
    var arr=JSON.parse(localStorage.getItem('UsersData'))
    
    for(var i=0;i<arr.length;i++){
        if(arr[i].FirstName==person){
            arr[i].isUserActive=false
            arr[i].status='Deactivate'
            this.setState({
                allviewApplication:arr
            })
            break;
        }
    }
    localStorage.setItem('UsersData',JSON.stringify(arr))
    }

renderingViewApplication=()=>{
return this.state.allviewApplication.map((application,index)=>{
    const {FirstName,isUserActive,status}=application
    return (
        <tr key={index}>
            <td style={{ color: 'blue' }}> {FirstName}</td>
            <td style={{ color: 'blue' }}> {status}</td>
            
            <td style={{ color: 'blue' }}> {isUserActive}</td>
            <td> 
                <button onClick={this.activate} value={FirstName} className="btn btn-primary"> Activate</button>&nbsp;&nbsp;
                <button onClick={this.deactivate} value={FirstName} className='btn btn-primary'> Deactivate</button>
                        
            </td>


        </tr>
    )
})
    }

loginstatus=()=>{
    let signinValue=JSON.parse(localStorage.getItem('UsersData'));
        console.log(signinValue);
        for(var user of signinValue)
        {
        
                user.adminstatus='signout';
                if(user.signinstatus!='login'){
                disableBrowserBackButton();
                }
                
        }
           
        }


    render() {
        return (
            <div className='container'>
                <h2 style={{ color: 'red' }}> welcome Admin</h2>
                <Navbar bg="dark" expand="sm">
               
                   <Nav>
                       <NavLink className="d-inline p-0  text-white"
                       to="/"><button type='button' className='btn btn-danger m-2' onClick={()=>this.loginstatus()} >Sign Out</button></NavLink> &nbsp;&nbsp;&nbsp;
                 </Nav>
                   <Nav>
                       <NavLink className="d-inline p-0 bg-dark text-white"
                       to="/graphreport"><button type='button' className='btn btn-danger m-2' >Graph Report</button></NavLink> &nbsp;&nbsp;&nbsp;
                       
                       
                   </Nav>
                   <Nav>
                       <NavLink className="d-inline p-0 bg-dark text-white"
                       to="/simple"><button type='button' className='btn btn-danger m-2' >Simple Report</button></NavLink>
                       
                       
                   </Nav>
               
    </Navbar>
                <table className='table table-hover striped'  >
                <thead>
                   <tr>
                            <th scope='col' style={{ textAlign: 'center' }}>UserName </th>
                           
                            <th scope='col' style={{ textAlign: 'center' }}>Status</th>
                            <th scope='col' style={{ textAlign: 'center' }}>Action </th>
                   </tr>
                   </thead>
                   <tbody>
                    {this.renderingViewApplication()}
                    </tbody>
                    </table>
            </div>
        )
    }
}

export default Admin
