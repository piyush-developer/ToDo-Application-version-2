import React, {useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import Login from './Login';
import '../App.css';

const GraphReport=()=> {
    const [chartData,setChartData]=useState({});
    const data = JSON.parse(localStorage.getItem('UsersData'));
    const data2 = JSON.parse(localStorage.getItem('list'));

     var countUsers=0;   
     var countUsers2=0;
    for(var user of data){
    
    var cur_date=new Date();
    var curdate = cur_date.getDate();
    var userdate=new Date(user.today);
    var userday=userdate.getDate();
    console.log(cur_date-userday);
    if(curdate-userday<=7)
        {
            countUsers=countUsers+1;
            console.log(countUsers);
        }
    }

    for(var user2 of data2){
        var cur_date2=new Date();
        var curdate2=cur_date2.getDate();
        var userdate2=new Date(user2.today);
        var userday2=userdate2.getDate();
        console.log(curdate2-userday2);
        if(curdate2-userday2<=7)
        {
            countUsers2=countUsers2+1;
            console.log(countUsers2);
        }
    }

    const chart=()=>{

        setChartData({
            labels:['Record of last 7 days'],
            datasets:[
            {
                label:'Report of User SignUp',
                data:[countUsers],
                borderColor:['red'],
                backgroundColor:['red'],
                pointBorderColor:['red'],
                pointBackGroundColor:['red']
            },
            {
                label:'Report of User Activities',
                data:[countUsers2],
                borderColor:['yellow'],
                backgroundColor:['yellow'],
                pointBorderColor:['yellow'],
                pointBackGroundColor:['yellow']
            }
        ]
        })

    }

useEffect(() => {
    
       chart()
    
}, [])

    return (
        <div>
            <Bar data={chartData}/>
        </div>
    )
}
export default GraphReport
