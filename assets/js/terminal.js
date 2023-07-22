const ini = `<span id="prompt"><strong>gaurab@g-os:</strong></span><input id='userin' placeholder="Enter a command" autocomplete='off'><div class='out' id='out'></div>`;
document.querySelector("#prompt-div").innerHTML = ini;
var userinCommand = document.querySelector("#userin");

var lastcommand;
var hist = [];
var last_index = 0

const main = document.querySelector(".term");

main.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    processEnter();
    last_index = 0;
  }

});
main.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    if (hist != null) {
      if (last_index <= hist.length - 1) {

        if (hist[hist.length - last_index - 1]) {
          document.querySelector("#userin").value = hist[hist.length - last_index - 1]
        }
         last_index++

      }

    }

  }
  if (e.key == "ArrowDown") {
    if (hist != null) {
      if (last_index >= 0) {
        last_index--
        if (hist[hist.length - last_index - 1]) {
          document.querySelector("#userin").value = hist[hist.length - last_index - 1]
        }




      }
      if (last_index < 0) {
        document.querySelector("#userin").value = ""

      }

    }

  }

});



const commands = [
  "man",
  "uname",
  "hostname",
  "gaurab",
  "resume",
  "whoami",
  "ip",
  "cd",
  "clear",
  "exit",
  "help",
  "wallpaper",
  "shutdown",
  "reboot",
  "history",
  "social",
]; 

function processEnter() {
  lastcommand = document.querySelector("#userin").value;
  hist.push(lastcommand)
  var command = document.querySelector("#userin").value.split(" ");
  document.querySelector("#userin").setAttribute("id", "userin-old");
  document.querySelector("#userin-old").readOnly = true;
  handleCommand(command[0], command[1]);
  if (command[0] != "exit") {
    var div = document.createElement("div");
    div.classList.add("prompt-div");
    div.innerHTML = ini;
    main.appendChild(div);
    document.querySelector("#userin").focus();
  }
}

function handleCommand(command, arg) {
  try {
    if (commands.includes(command)) {
      if (arg) {
        var a = getArg(arg);
        if (com[command]["args"] && com[command]["args"][a]) {
          com[command]["args"][a]["action"]();
        } else {
          echo(`Command ${command} does not support the argument ${arg}`);
        }
      } else {
        com[command]["action"]();
      }
    } else {
      echo("Command is not recognized");
    }
  } catch (error) {
    echo(`Error: ${error}`);
  }
}

function echo(a) {
  document.getElementById("out").innerHTML = `${a}`;
  document.getElementById("out").setAttribute("id", "out-old");
}

function clear() {
  main.innerHTML = "";
}

function getArg(a) {
  arg = a.replaceAll("-", "");
  return arg;
}
function changeWallpaper(a) {
  switch (a) {
    case "r": {
      var papes = ["cat.jpg", "dortmund.jpg"]
      var onePape = papes[Math.random() * papes.length | 0]
      console.log(onePape, document.body.style.backgroundImage)
      document.body.style.backgroundImage = `url(assets/images/wallpaper/${onePape})`
      echo("Wallpaper applied successfully")
    }

      break;
    case "cat": {
      document.body.style.backgroundImage = `url(assets/images/wallpaper/cat.jpg)`
      echo("Wallpaper applied successfully")
    }
      break;
    case "dortmund": {
      document.body.style.backgroundImage = `url(assets/images/wallpaper/dortmund.jpg)`
      echo("Wallpaper applied successfully")
    } break;
    case "dog": {
      document.body.style.backgroundImage = `url(assets/images/wallpaper/dog.jpg)`
      echo("Wallpaper applied successfully")

    } break;
    case "url":
    case "u": {
      try {
        if (lastcommand.split(" ")[2] != null) {
          document.body.style.backgroundImage = `url('${lastcommand.split(" ")[2]}')`
          echo("Applied wallpaper")
        } else {
          echo("No url given")
          return;
        }

      } catch (error) {
        echo(error)
        return;
      }

    } break;

    default: {
      echo("Command wallpaper does not support " + a)
      return;
    }
      break;
  }
  localStorage.setItem('wallpaper', document.body.style.backgroundImage)
}
function saveFile(a) {
  saveAs(a, "resume.pdf");
}

function echoIP() {
  fetch("https://api.ipify.org/?format=json").then((res) => {
    res.json().then((data) => {
      echo(data.ip);
    });
  });
}


const social={

  f:{ title:"Facebook", url:"https://www.facebook.com/365d736ad1b2e3ffcb411030c813e891/"},
  t:{title:"Twitter",url:"https://twitter.com/pwdgau"},
  i:{title:"Instagram",url:"https://www.instagram.com/gaurabisreviving/"},
  l:{title:"LinkedIn",url:"https://www.linkedin.com/in/iamgvs/"},
  g:{title:"Github", url:"https://github.com/sapkotagaurav/"},
  le:{title:"Leetcode", url:"https://leetcode.com/sapkotagaurav/"},
  e:{title:"Email", url:"mailto:gaurab@gaurabsapkota.com.np"},
  p:{title:"Telephone", url:"tel:+14176332389"}



}
let socialstring ="";
Object.keys(social).forEach(key => {
  socialstring += `<a id=social-a-${key} href="${social[key]['url']}"> ${social[key]['title']}</a>  `
});




function showSocial(a){
  switch (a) {
    case 'a':
      echo(socialstring)

  
    default:{
      if(social[a]){
        echo(`opening ${social[a]['title']}`)
        window.open(social[a]['url'],"_blank")
      }
    }
      break;
  }
}

const prompt = `${navigator.appCodeName}@${navigator.platform}:`;
const com = {
  man: {
    args: {},
    action: () => echo("use this command with other commands as args"),
    help: "Prints the Manual for commands",
  },
  uname: {
    args: {
      a: { action: () => echo("Linux"), help: "Prints the system information" },
    },
    action: () => echo(navigator.userAgent),
    help: "Prints Uname",
  },
  hostname: { action: () => echo("G-os Linux"), help: "Prints hostname" },
  gaurab: {
    args: {
      f: { action: () => echo("Gaurab Sapkota"), help: "Prints full name" },
    },
    action: () => echo("That's me"),
    help: "Prints my full name",
  },
  resume: {
    args: {
      download: {
        action: () => {
          echo("Downloading");
          saveFile("./assets/images/resume.pdf");
        },
        help: "Downloads the resume",
      },
      view: {
        action: () => {
          echo(`Opened resume`);
          document.getElementById("resume-icon").click();
        },
        help: "Opens the window to view resume",
      },
    },
    action: () => {
      echo("opening resume in another window");
      window.open("./assets/images/resume.pdf", "_blank");
    },
    help: "Opens my resume",
  },
  whoami: {
    args: { i: { action: echoIP, help: "Prints the Ip address" } },
    action: () => echo("Gaurab"),
    help: "Prints my name",
  },
  ip: { action: () => echoIP(), help: "Prints IP address" },
  cd: {
    action: () => echo("Cannot change the directory"),
    help: "change the directory",
  },
  clear: { action: () => clear(), help: "Clears the terminal screen" },
  exit: {
    action: () => {
      clear();
      terminal.close();
    },
    help: "Exits the terminal",
  },
  help: {
    action: () => {
      echo(`Commands available <strong>${commands.join(" ")}</strong>`);
    },
    help: "Displays the help",
  },
  wallpaper: {
    action: () => {
      changeWallpaper("cat")

    },
    args: {
      u: { help: "Sets the wallpaper given url", action: () => changeWallpaper("u") },
      cat: { help: "Sets the wallpaper of cat", action: () => changeWallpaper("cat") },
      dog: { help: "Sets the wallpaper of dog", action: () => changeWallpaper("dog") },
      dortmund: { help: "Sets the wallpaper of Dortmund", action: () => changeWallpaper("dortmund") },
      r: { help: "Sets the wallpaper randomly", action: () => changeWallpaper("r") }

    },
    help: "Changes the wallpaper"
  },
  social:{
    action:()=>{
      showSocial("a")
    },
    args:{
      facebook :{help:"My Facebook Account", action:()=>showSocial('f')},
      twitter :{help:"My Twitter", action:()=>showSocial('t')},
      instagram :{help:"My Insta", action:()=>showSocial('i')},
      github :{help:"My Github", action:()=>showSocial('g')},
      leetcode :{help:"leetcode", action:()=>showSocial('l')},
      email :{help:"email", action:()=>showSocial('e')},
      phone:{help:"phone number", action:()=>showSocial('p')},
    },
    help:"Ways to reach me",
  },
  shutdown: {
    action: () => {
      echo("turning off")
      turnoff();
    },
    help: "Shuts the system down",
  },
  reboot: {
    action: () => {
      echo(`rebooting`);
      restart()
    },
    help: "restarts",
  },
  history: {
    action: () => {
      echo(hist.join("<br>"));

    },
    help: "Shows the commands entered",
  }
};

commands.forEach((element) => {
  let helptext = "";
  helptext = helptext + com[element]["help"];
  helptext = helptext + "<br>";
  if (com[element]["args"]) {
    Object.keys(com[element]["args"]).forEach((e) => {
      helptext =
        helptext +
        `<strong> --${e} </strong>: ${com[element]["args"][e]["help"]}`;
    });
  }
  com.man.args[element] = { action: () => echo(`${helptext} `) };
  //com.man.args[element].action = () => echo(`${com[element].help} <br>${helptext} `);
});

