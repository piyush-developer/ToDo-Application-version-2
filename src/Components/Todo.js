import React, { Component } from 'react'
import uuid from "uuid";
import  Css from './test2.css'
import {NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import disableBrowserBackButton from 'disable-browser-back-navigation';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

class Test2 extends Component {

    constructor(props) {
        super(props)
    
    
       this.state={
           list:[],
           act:0,
           index:''    
          }
    }

    addTask=(e)=>{
    e.preventDefault();
    let data=this.state.list;
    let today=new Date();
    let title=this.refs.title.value;
    let description=this.refs.description.value;
    let status='pending';
    let signinstatus='login';

    if(this.state.act===0){
        let data1={title,description,status,today,signinstatus}
        data.push(data1);
        console.log(data);
        localStorage.setItem('list',JSON.stringify(data))
    }
    else{
        let index=this.state.index;
        data[index].title=title;
        data[index].description=description;
        localStorage.setItem('list',JSON.stringify(data,today));
    }

    this.setState({
        list:data,
        act:0
    })

    this.refs.myform.reset();
    this.refs.title.focus();

    
    }

    componentDidMount() {
        const list = window.localStorage.getItem('list');
        const parsedList = JSON.parse(list);
        if(list == null){
            return false
        }
        else{
            this.setState({
                list: parsedList,
            })
            console.log(this.state.list);
        }
    }
    
    deleteItem=(event)=> {
        
        let index = event.target.getAttribute('data-key')
        let listValue=JSON.parse(localStorage.getItem('list'));
        listValue.splice(index,1)
        this.setState({list:listValue});
        localStorage.setItem('list',JSON.stringify(listValue))
    }

    completeItem=(index)=>{
        
        let statusValue=JSON.parse(localStorage.getItem('list'));
       // console.log(statusValue[index]);
        statusValue[index].status='Complete';
        this.setState({list:statusValue});
        localStorage.setItem('list',JSON.stringify(statusValue));
        let newstatus=JSON.parse(localStorage.getItem('list'));
        for(var i=0;i<newstatus.length;i++){
            if(newstatus[i].status='complete'){
                 toast.success("Congratulations!! You complete your  task");
            }
            break;
        }
    }
    
    updateItem=(index)=>{
        let editValue=JSON.parse(localStorage.getItem('list'));
        this.refs.title.value=editValue[index].title;
        this.refs.description.value=editValue[index].description;
        this.setState({
            act:1,
            index:index
        })
        this.refs.title.focus();

    }
    
    loginstatus=()=>{
        let signinValue=JSON.parse(localStorage.getItem('list'));
        console.log(signinValue);
        for(var user of signinValue)
        {
        
                user.signinstatus='signout';
                if(user.signinstatus!='login'){
                disableBrowserBackButton();
                }
                
        }
           
        }
        // signinValue.signinstatus='signout';
        // this.setState({list:signinValue});
        // localStorage.setItem('list',JSON.stringify(signinValue));
        // this.props.history.push('/');
        // alert('you are not able to go back');
    

    render() {
        
        let list=this.state.list;
        return (
            <div className="main-container">
        
                <h1 style={{color:'black',textAlign:'center'}}>Todo Task Manager</h1>
                 <Nav>
                       <NavLink className="d-inline p-0  text-white"
                       to="/"><button type='button' className='btn btn-danger m-2' onClick={()=>this.loginstatus()} >Sign Out</button></NavLink>
                 </Nav>
                <div className="container">
                <form ref='myform'>
                
                <tr>
                   <td> <input type="text" ref="title" placeholder="AddTask..." ></input></td>
                    <td><input type="text" ref="description" placeholder="AddDescription" ></input></td>
                    <td> <button onClick={(e)=>this.addTask(e)} className="button" >Add</button></td>
                    </tr>
                </form>
                <ol>
                    <center>
                        <table className='table table-hover striped'  style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                            
                            <th scope='col'>Title </th>
                            <th scope='col'>Description </th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>

                            </tr>
                        </thead>
                                        <tbody style={{ textAlign: 'center' }}>
                                       { 
                                       list.map((item,index)=>
                                        <tr>
                                        <td scope='col'>{item.title}</td> 
                                        <td scope='col'>{item.description}</td>
                                        <td scope='col'> {item.status}</td>
                                        
                                        <td >{<button className="button" type="button" value="delete" data-key={index} onClick={this.deleteItem}>Delete</button>} 
                                        {<button className="button" type="button" value="update" data-key={index} onClick={()=>this.updateItem(index)}>Edit</button>} 
                                        {<button className="button" type="button" value="complete" data-key={index} onClick={()=>this.completeItem(index)}>Complete</button>}</td>
                                        </tr>
                                       )}
                                        </tbody>
                                        </table>
                                        </center>
                    </ol>
                </div>
            </div>
        )
    }
}

export default Test2