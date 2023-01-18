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
  "help",
]; //,"pwd","blog","vs-code","snake","shutdown","reboot",,]

function processEnter() {
  lastcommand = userinCommand.value;
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
