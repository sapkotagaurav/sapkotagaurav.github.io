let gettimeanddate = () =>{
    let currTime = new Date()
    document.querySelector("#date").innerText = currTime.toLocaleDateString("en-us",{month:'short',day:"2-digit"})
    
    document.querySelector('#time').innerText = currTime.toLocaleTimeString([],{hour:"numeric",minute:"numeric"})
    if(document.querySelector("#date")){
    setTimeout(gettimeanddate,1000);
    }

}

gettimeanddate()
let isShowncalendar = false;
let snakeicon = document.querySelector('#snake')
let date = document.querySelector("#date")
let controls = document.querySelector('#controls')
let calendar;

function showAlert(title,msg,timed,callback){
    var a=5;
    var m =`<p> ${msg} in <span id="display">06</span> Seconds.</p>`
    const wb = new WinBox(title,{
        html:m,
        modal:true

    })
    wb.removeControl("wb-close")
    duration = timed
    var timer = duration, minutes, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(document.getElementById('display')){

        document.getElementById('display').textContent =  seconds ;
        }
        if (--timer < 0) {
            callback()
            
        }
    }, 1000);
    
    
    

}

function showCalendar(){
    calendar= new WinBox("Calendar",{
        url:"https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%233F51B5&ctz=America%2FChicago&src=Z2F1cmF2c2Fwa290YTkwNkBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4ubnAjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%237986CB&color=%23009688",
        height:650,
        width:650,
        modal:true, 
        x:'50%',
        y:'0'
        
    })
    isShowncalendar=true;
    
}

function snake() {
    new WinBox("snake",{
        url:"http://gaurabsapkota.com.np/snake/",
        height:650,
        width:650,
        scroll:true,
        

    });
    
}


var infoBox;
function showInfo() {
   infoBox= new WinBox("Info",{
        mount:document.getElementById('info'),
        height:650,
        width:650,
        modal:true,
        x:'65%',
        y:'0%',
        
        
        

    });
    
}
snakeicon.onclick= ()=>{snake()}
controls.onclick=()=>showInfo()
date.onclick =()=>{showCalendar()}









//**************************************info*****************/
let url ="https://ipapi.co/json/"
fetch(url).then((data)=>{
    data.json().then((res)=>{
document.getElementById('ip').innerHTML=res['ip']
document.getElementById('location').innerHTML=`${res['city']}, ${res['region']}, ${res['postal']}`
document.getElementById('wifi').innerHTML=navigator.onLine?"Connected":"Disconnected"
document.getElementById('os').innerHTML=navigator.oscpu
document.getElementById('browser').innerHTML=navigator.appCodeName

    })
})
function turnoff() {
    document.body.innerHTML=`<button style="top:50%; left:50%; position:absolute;" onclick="location.reload()"><i class="fa-solid fa-2x fa-power-off">Turn On</i></button>`
    document.body.style.background="black"
}
function restart(){
    location.reload();
}
document.getElementById('turn-off').onclick=(()=>{
    showAlert("Shutting Down","Shutting Down",5,turnoff)
    infoBox.close();

})
document.getElementById('reboot').onclick=(()=>{
    showAlert("Rebooting","Rebooting",5,restart)
    infoBox.close()

})