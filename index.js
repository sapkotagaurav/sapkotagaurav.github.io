

/*Get and set the battery level */
function getBatteryLevel() {
    navigator.getBattery().then((r) => {
        document.querySelector('#battery-icon').innerHTML = r.charging ? `battery_charging_50` : `battery_${r.level * 6 | 0}_bar`
        document.querySelector('#battery-text').innerHTML = `${r.level * 100 | 0}%`
    }).catch((e) => {

    })

}

var infoBox;

document.querySelector('#screenshot-icon').onclick = getScreenshot
function getScreenshot() {
    // domtoimage.toJpeg(document.getElementById('desktop'),{quality:0.9}).then((res)=>{
    //     console.log(res)
    // })
    if (infoBox) { infoBox.close() }
    var div = document.createElement('div')
    div.id ='screenshot'
    var img = document.createElement('img')
    img.src='#'
    img.height=screen.height/2
    img.width=screen.width/2
    var button = document.createElement('button')
    button.innerHTML="Save"
    div.append(img)
    div.append(button)
    html2canvas(document.body,{        allowTaint : true,
        logging: true,
        profile: true,
        useCORS: true}).then(function (canvas) {
        canvas.toBlob((blob) => {
            var filename=`Screenshot_${new Date().toUTCString()}.png`

            img.src=URL.createObjectURL(blob)
            button.onclick= function (){saveAs(blob,filename)}
            
            new WinBox(filename,{
                mount:div,
                height:screen.height/2+50,
                width:screen.width/2+50

            })
            


            //saveAs(blob,'s.png')

        })
    });
}



let gettimeanddate = () => {
    let currTime = new Date()
    document.querySelector("#date").innerText = currTime.toLocaleDateString("en-us", { month: 'short', day: "2-digit" })

    document.querySelector('#time').innerText = currTime.toLocaleTimeString([], { hour: "numeric", minute: "numeric" })

    if (navigator && 'getBattery' in navigator) {
        getBatteryLevel()
    }
    if (document.querySelector("#date")) {
        setTimeout(gettimeanddate, 1000);
    }

}


gettimeanddate()


let isShowncalendar = false;
let date = document.querySelector("#date")
let controls = document.querySelector('#controls')
let calendar;

function showAlert(title, msg, timed, callback) {
    var a = 5;
    var m = `<p> ${msg} in <span id="display">06</span> Seconds.</p>`
    const wb = new WinBox(title, {
        html: m,
        modal: true

    })
    wb.removeControl("wb-close")
    duration = timed
    var timer = duration, minutes, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;
        if (document.getElementById('display')) {

            document.getElementById('display').textContent = seconds;
        }
        if (--timer < 0) {
            callback()

        }
    }, 1000);




}

function showCalendar() {
    if(isShowncalendar){
        calendar.close()
        calendar=null;
        isShowncalendar=false;
    }else{
    calendar = new WinBox("Calendar", {
        class:"no-full no-header no-resize",
        html:'<div class="elfsight-app-b79cc259-62ad-46bf-85ba-e9cb8a751c25">Loading...</div>',
        height: 650,
        width: 650,
        x: 605,
        y: 36

    }).removeControl('wb-max').removeControl('wb-min')
    isShowncalendar = true;
}

}

function snake() {
    new WinBox("snake", {
        url: "http://gaurabsapkota.com.np/snake/",
        height: 650,
        width: 650,
        scroll: true,


    });

}


function VScode(){
    var html='loading';
    fetch('https://github1s.com/sapkotagaurav/snake').then((res)=>{
        res.text().then((d)=>{
html=d;
html = html.replaceAll('/static','https://github1s.com/static').replaceAll("/manifest.json","https://github1s.com/manifest.json")
console.log(html)
new WinBox("VS CODE",{
    //html:html
    url:"https://github1s.com/sapkotagaurav/snake"
})
        })
        
    })
    
}
document.getElementById('code').onclick =()=>VScode()


function showInfo() {
    if(infoBox){
        infoBox.close()
        infoBox=null
    }else{
    infoBox = new WinBox("Info", {
        class:"no-full no-header no-resize",
        mount: document.getElementById('info'),
        width:500,
        x: '75%',
        y: 36,
        onclose:function(){infoBox=null}




    });
    }
}
controls.onclick = () => showInfo()
date.onclick = () => { showCalendar() }










//**************************************info*****************/
let url = "https://ipapi.co/json/"
fetch(url).then((data) => {
    data.json().then((res) => {
        document.getElementById('ip').innerHTML = res['ip']
        document.getElementById('location').innerHTML = `${res['city']}, ${res['region']}, ${res['postal']}`
        document.getElementById('wifi').innerHTML = navigator.onLine ? "Connected" : "Disconnected"
        document.getElementById('os').innerHTML = navigator.platform
        document.getElementById('browser').innerHTML = navigator.appCodeName

    })
})
function turnoff() {
    document.body.innerHTML = `<button style="top:50%; left:50%; position:absolute;" onclick="location.reload()"><i class="fa-solid fa-2x fa-power-off">Turn On</i></button>`
    document.body.style.background = "black"
}
function restart() {
    location.reload();
}
document.getElementById('turn-off').onclick = (() => {
    showAlert("Shutting Down", "Shutting Down", 5, turnoff)
    infoBox.close();

})
document.getElementById('reboot').onclick = (() => {
    showAlert("Rebooting", "Rebooting", 5, restart)
    infoBox.close()

})