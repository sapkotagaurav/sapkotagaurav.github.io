const ini = `<span id="prompt"><strong>gaurab@g-os:</strong></span><input id='userin' placeholder="Enter a command" autocomplete='off'><div class='out' id='out'></div>`;
document.querySelector("#prompt-div").innerHTML = ini;
var userinCommand = document.querySelector("#userin");

var lastcommand;

const main = document.querySelector(".term");

main.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    processEnter();
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
]; //,"pwd","blog","vs-code","snake","shutdown","reboot",,]

function processEnter() {
  lastcommand = userinCommand.value;
  var command = document.querySelector("#userin").value.split(" ");
  document.querySelector("#userin").setAttribute("id", "userin-old");
  document.querySelector("#userin-old").readOnly = true;
  handleCommand(command[0], command[1]);
if(command[0]!="exit"){  var div = document.createElement("div");
  div.classList.add("prompt-div");
  div.innerHTML = ini;
  main.appendChild(div);
  document.querySelector("#userin").focus();}
}

function handleCommand(command, arg) {
  if (commands.includes(command)) {
    if (arg) {
      var a = getArg(arg);
      if (com[command]["args"][a]) {
        com[command]["args"][a]();
      } else {
        echo(`Command ${command} does not support the argument ${arg}`);
      }
    } else {
      com[command]["action"]();
    }
  } else {
    echo("Command is not recognized");
  }
}

function echo(a) {
  document.getElementById("out").innerHTML = `<p>${a}</p>`;
  document.getElementById("out").setAttribute("id", "out-old");
}

function clear() {
  main.innerHTML = "";
}

function getArg(a) {
  arg = a.replaceAll("-", "");
  return arg;
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

const prompt = `${navigator.appCodeName}@${navigator.platform}:`;
const com = {
  man: {
    args: {},
    action: () => echo("use this command with other commands as args"),
    help: "Prints the Manual for commands",
  },
  uname: {
    args: { a: () => echo("Linux") },
    action: () => echo(navigator.userAgent),
    help: "Prints Uname",
  },
  hostname: { action: () => echo("G-os Linux"), help: "Prints hostname" },
  gaurab: {
    args: { f: () => echo("Gaurab Sapkota") },
    action: () => echo("That's me"),
    help: "Prints my full name",
  },
  resume: {
    args: {
      download: () => {
        echo("Downloading");
        saveFile("./assets/images/resume.pdf");
      },
    },
    action: () => {
      echo("opening resume in another window");
      window.open("./assets/images/resume.pdf", "_blank");
    },
    help: "Opens my resume, downloads if used with --download arg",
  },
  whoami: { action: () => echo("Gaurab"), help: "Prints my name" },
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
};

commands.forEach((element) => {
  com.man.args[element] = () => echo(com[element].help);
});
