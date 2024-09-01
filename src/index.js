const inquirer = require("inquirer");
const fs = require("fs");
const allmenus = require('./includes/allmenus')
const displayLogo = require('./includes/displaylogo')

const options = [
  "1 create a dox", "2 modify dox", "3 clear a dox",
  "4 verify tools", "5 username search", "6 name search",
  "7 other osint tools", "8 design dox file", "9 list all dox files",
  "10 signature", "11 configurations", "00 Quitter"
];
function getTerminalWidth() {
  return process.stdout.columns || 80;
}
function centerText(text, terminalWidth) {
  const totalPadding = terminalWidth - text.length;
  const padding = Math.floor(totalPadding / 2);
  return ' '.repeat(padding) + text;
}
function formatAndCenterOptions(options, columns, columnSpacing, prefix) {
  const terminalWidth = getTerminalWidth();
  let formattedOptions = [];


  const prefixedOptions = options.map(option => prefix + option);

  for (let i = 0; i < prefixedOptions.length; i += columns) {

    let row = prefixedOptions.slice(i, i + columns).map(opt => opt.padEnd(10)).join(' '.repeat(columnSpacing));
    formattedOptions.push(centerText(row, terminalWidth));
  }

  return formattedOptions;
}
function getColorFromGradient(index, total, startColor, endColor) {

  const midpoint = Math.floor(total / 2);
  return (index < midpoint) ? `\x1b[38;5;${startColor}m` : `\x1b[38;5;${endColor}m`;
}
function init_shell() {
  const terminalWidth = getTerminalWidth();
  const red = "\x1b[31m";
  const startColor = 196;
  const endColor = 124;
  const prefix = "[+] - ";
  const lines = [
    "   ▄████████  ▄██████▄     ▄████████",
    "  ███    ███ ███    ███   ███    ███",
    "  ███    ███ ███    ███   ███    █▀ ",
    "  ███    ███ ███    ███  ▄███▄▄▄    ",
    "▀███████████ ███    ███ ▀▀███▀▀▀    ",
    "  ███    ███ ███    ███   ███       ",
    "  ███    ███ ███    ███   ███       ",
    "  ███    █▀   ▀██████▀    ███       ",
    " ",
    "All For One v1.0"
  ];
  console.clear()
  lines.forEach((line, index) => { const color = getColorFromGradient(index, lines.length - 1, startColor, endColor); console.log(color + centerText(line, terminalWidth)) });
  const columnSpacing = 50;
  const formattedOptions = formatAndCenterOptions(options, 3, columnSpacing, prefix);



  console.log('\n'.repeat(2));
  formattedOptions.forEach(line => console.log(red + line + "\n"));
  console.log('\n'.repeat(2));


}

async function menu() {


  init_shell()
  const choice = await inquirer.prompt([{
    type: "input",
    name: "name",
    message: "Choose an option >>> ",

  }])

  switch (choice.name) {
    case "00":
      console.clear()
      console.log("Bye Bye ;)");
      break;
    case "1":
      allmenus.createDox() == true ? menu() : console.log("")
      break;
    case "2":
      console.log("You selected 2");
      break;
    case "3":
      console.log("You selected 3");
      break;
    case "4":
      console.log("You selected 4");
      break;
    case "5":
      console.log("You selected 5");
      break;
    case "6":
      console.log("You selected 6");
      break;
    case "7":
      console.log("You selected 7");
      break;
    case "8":
      console.log("You selected 8");
      break;
    case "9":
      console.log("You selected 9");
      break;
    case "10":
      console.log("You selected 10");
      break;
    case "11":
      console.log("You selected 11");
      break;
    default:
      menu()
  }



}

function princip_menu() {
  displayLogo.displayIt()
  setTimeout(async () => {
    init_shell();
    menu();
  }, 3000)

}
princip_menu();