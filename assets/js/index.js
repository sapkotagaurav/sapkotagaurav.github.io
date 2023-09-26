/*Get and set the battery level */


document.body.onload =()=>{
  if (localStorage.getItem('wallpaper') != null) {
    document.body.style.backgroundImage = localStorage.getItem('wallpaper')
    
  }
}
document.addEventListener("contextmenu", e=> e.preventDefault());
document.addEventListener("keydown",e=>{
  if(e.altKey  &&e.key==='r' ){
    openTerminal()
  }
})
document.body.addEventListener("mousedown",e=>{
  if(document.getElementById("calendar") && !document.getElementById("calendar").contains(e.target)){
    if (isShowncalendar) {
      calendar.close()
      isShowncalendar=false;
    }
  }
 
  
  
})
document.body.addEventListener("mousedown",e=>{

  if(document.getElementById("infobox") && !document.getElementById("infobox").contains(e.target)){
    if (infoBox) {
      infoBox.close()
      
    }
  }
  
  
})


function getBatteryLevel() {
  navigator
    .getBattery()
    .then((r) => {
      document.querySelector("#battery-icon").innerHTML = r.charging
        ? `battery_charging_50`
        : `battery_${(r.level * 6) | 0}_bar`;
      document.querySelector("#battery-text").innerHTML = `${
        (r.level * 100) | 0
      }%`;
    })
    .catch((e) => {});
}

var infoBox;

document.querySelector("#screenshot-icon").onclick = getScreenshot;
function getScreenshot() {
  // domtoimage.toJpeg(document.getElementById('desktop'),{quality:0.9}).then((res)=>{
  //     console.log(res)
  // })
  if (infoBox) {
    infoBox.close();
  }
  var div = document.createElement("div");
  div.id = "screenshot";
  var img = document.createElement("img");
  img.src = "#";
  img.height = screen.height / 2.5;
  img.width = screen.width / 2.5;
  var button = document.createElement("button");
  button.innerHTML = "Save";
  button.classList.add("social-btn")
  div.append(img);
  div.append(document.createElement('br'))
  div.append("Some element may not appear on screenshot if they are iframes!!!")
  div.append(document.createElement('br'))
  div.append(button);
  
  html2canvas(document.body, {
    allowTaint: true,
    width:screen.width-10,
    height:screen.height-10,
    logging: true,
    profile: true,
    useCORS: true,
  }).then(function (canvas) {
    canvas.toBlob((blob) => {
      var filename = `Screenshot_${new Date().toUTCString()}.png`;

      img.src = URL.createObjectURL(blob);
      button.onclick = function () {
        saveAs(blob, filename);
      };

      new WinBox(filename, {
        mount: div,
        height: screen.height / 2.5 + 100,
        width: screen.width / 2.5 + 50,
      });

      //saveAs(blob,'s.png')
    });
  });
}

let gettimeanddate = () => {
  let currTime = new Date();
  document.querySelector("#date").innerText = currTime.toLocaleDateString(
    "en-us",
    { month: "short", day: "2-digit" }
  );

  document.querySelector("#time").innerText = currTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });

  if (navigator && "getBattery" in navigator) {
    getBatteryLevel();
  }
  if (document.querySelector("#date")) {
    setTimeout(gettimeanddate, 1000);
  }
};

gettimeanddate();

let isShowncalendar = false;
let date = document.querySelector("#date");
let controls = document.querySelector("#controls");
let calendar;

function showAlert(title, msg, timed, callback) {
  var a = 5;
  var m = `<p> ${msg} in <span id="display">06</span> Seconds.</p>`;
  const wb = new WinBox(title, {
    html: m,
    modal: true,
  });
  wb.removeControl("wb-close");
  duration = timed;
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    seconds = parseInt(timer % 60, 10);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (document.getElementById("display")) {
      document.getElementById("display").textContent = seconds;
    }
    if (--timer < 0) {
      callback();
    }
  }, 1000);
}


///////blog////////////
document.getElementById('blog-icon').onclick= function (){
    new WinBox("Blog",{
        url:"https://gaurab.codes/blogs/"
    })
}
document.getElementById('resume-icon').onclick = function(){
    var html =`<div class="pdf">
    <object id="pdf" data="./assets/images/resume.pdf" type="application/pdf" width="600" height="700">
        alt : <a href="test.pdf">test.pdf</a>
    </object>
</div>`
    new WinBox("Resume",{
        html:html
    })
}

document.getElementById('help-icon').onclick = function(){
    var html =`<div><p> You can explore with icons and terminal as of now. This project is built on pure vanilla JS and CSS. <br> <h3>Changelog 1</h3> <p> <ol><li>Added wallpaper command in terminal</li><li>Applied wallpaper remains even after reload</li><li>Added reboot & shutdown command in terminal</li><li>added social command</li><li>alt-r opens terminal</li><li><strong>made own calendar</strong></li></ol>`
    html +=`<h3>TODO:</h3><ol><li>Add skill command</li></ol></div>`
    new WinBox("Help",{
        html:html
    })
}

document.getElementById('snake-icon').onclick = function(){
  
  new WinBox("Snake Game",{
      url:"https://gaurabsapkota.com.np/snake",
      height:655,
      width:618,
      x:280,
      y:110,
      scroll:false,
  })
}





///////////////////////////////Camera////////////////////////
var stream,image;
let camera_button = document.querySelector("#camera-icon");
camera_button.onclick=showCamera
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
click_button.onclick =takePicture
let canvas = document.querySelector("#canvas");
let download= document.getElementById('download-a')
function showCamera(){
navigator.mediaDevices.getUserMedia({audio:false,video:true}).then((s)=>{
    new WinBox("Camera",{
        mount : document.getElementById('camera-image'),
        onclose:()=>{
            stream.getTracks().forEach(track => track.stop())
        }
    })
    stream =s;
    video.srcObject = stream;
}
)
}

function takePicture(){
canvas.getContext('2d').drawImage(video,0,0,canvas.height,canvas.width)
image = canvas.toDataURL('image/jpeg')
document.getElementById('download-img').style.display='block'
document.getElementById('download-a').setAttribute('download',`Image_${new Date()}.jpeg`)
document.getElementById('download-a').setAttribute('href',image)

}


/////////////////calendar///////////
function showCalendar() {
  if (isShowncalendar) {
    calendar.close();
    calendar = null;
    isShowncalendar = false;
  } else {
    calendar = new WinBox("Calendar", {
      class: "no-full no-header ",
    //  url:"https://outlook.office365.com/calendar/published/0920d46e59e34f639aa3a5faec772736@MissouriState.edu/d266f3f8567740e696b7176f213bba933974450283162147387/calendar.html",
    mount:document.getElementById('cal-container'),
      x: 680,
      y: 36,
      height:430,
      width:420,
    })
      .removeControl("wb-max")
      .removeControl("wb-min");
    isShowncalendar = true;
  }
}

var terminal;
function openTerminal() {
  if (terminal == null) {
    terminal = new WinBox("Terminal", {
        class:"terminal",
      mount: document.querySelector(".term"),
      height: 650,
      width: 650,
      x:285,
      y:110,
      background:'##333333',
      scroll: true,
      oncreate:()=>{document.querySelector(".terminal").onclick =()=>{
        document.querySelector('#userin').focus()
      }},
      onclose: () => {
        clear()
        
        var div = document.createElement("div");
        div.classList.add("prompt-div");
        div.innerHTML = ini;
        document.querySelector(".term").appendChild(div);
        document.querySelector("#userin").focus();
        terminal = null;
      },
    });
  } else {
    alert("Cannot open more than one window of terminal as of now");
  }
}

document.querySelector("#terminal").onclick = openTerminal;

function VScode() {
  var html = "loading";
  new WinBox("VS CODE", {
    //html:html
    url: "https://github1s.com/sapkotagaurav/sapkotagaurav.github.io",
  });
}
document.getElementById("code").onclick = () => VScode();

function showInfo() {
  if (infoBox) {
    infoBox.close();
    infoBox = null;
  } else {
    infoBox = new WinBox("Info", {
      class: "no-full no-header no-resize",
      mount: document.getElementById("info"),
      width: 500,
      id:'infobox',
      x: "75%",
      y: 36,
      onclose: function () {
        infoBox = null;
      },
    });
  }
}
controls.onclick = () => showInfo();
date.onclick = () => {
  showCalendar();
};

//**************************************info*****************/
let url = "https://ipapi.co/json/";
fetch(url).then((data) => {
  data.json().then((res) => {
    document.getElementById("ip").innerHTML = res["ip"];
    document.getElementById(
      "location"
    ).innerHTML = `${res["city"]}, ${res["region"]}, ${res["postal"]}`;
    document.getElementById("wifi").innerHTML = navigator.onLine
      ? "Connected"
      : "Disconnected";
    document.getElementById("os").innerHTML = navigator.platform;
    document.getElementById("browser").innerHTML = navigator.appCodeName;
  });
});
function turnoff() {
  document.body.innerHTML = `<button style="top:50%; left:50%; position:absolute;" onclick="location.reload()"><i class="fa-solid fa-2x fa-power-off">Turn On</i></button>`;
  document.body.style.background = "black";
}
function restart() {
  location.reload();
}
document.getElementById("turn-off").onclick = () => {
  showAlert("Shutting Down", "Shutting Down", 5, turnoff);
  infoBox.close();
};
document.getElementById("reboot").onclick = () => {
  showAlert("Rebooting", "Rebooting", 5, restart);
  infoBox.close();
};
