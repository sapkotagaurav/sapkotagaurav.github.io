let gettimeanddate = () =>{
    let currTime = new Date()
    document.querySelector("#date").innerText = currTime.toLocaleDateString("en-us",{month:'short',day:"2-digit"})
    
    document.querySelector('#time').innerText = currTime.toLocaleTimeString([],{hour:"numeric",minute:"numeric"})
    setTimeout(gettimeanddate,1000);

}

gettimeanddate()

let snakeicon = document.querySelector('#snake')
let date = document.querySelector("#date")
function showCalendar(){
    new WinBox("Calendar",{
        url:"https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%233F51B5&ctz=America%2FChicago&src=Z2F1cmF2c2Fwa290YTkwNkBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4ubnAjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%237986CB&color=%23009688",
        height:650,
        width:650, 
        x:'center',
        
    })
}

function snake() {
    new WinBox("snake",{
        url:"http://gaurabsapkota.com.np/snake/",
        height:650,
        width:650,
        
        scroll:true,
        

    });
    
}
snakeicon.onclick= ()=>{snake()}
date.onclick =()=>{showCalendar()}