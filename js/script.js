let button = document.querySelector(".submitBtn");
let input = document.querySelector("#userName");
let data = sessionStorage.getItem("Name");
let savedData = localStorage.getItem("savedName");
let hasClicked = false;
let outputData = document.querySelector("#visitedUsers");
const greeting = document.querySelector("h1");
const luckyNumber = document.querySelector("#luckyNumber");
const luckyNumberInput = document.querySelector("#luckyNumberInput");

let getData = [];

function addName(name) {
  let output = ""
  const previousNames = localStorage.getItem("savedName");
  if (!previousNames) output = name;
  else output = previousNames + `,${name}`
  console.log(output)
  localStorage.setItem("savedName", output);
  sessionStorage.setItem("Name", name);
}

/**
 * A getter for all users who have visited the site
 * @returns {string[]} All users who have visited the site
 */
function getNames() {
  const names = localStorage.getItem("savedName");
  if (!names) return []
  return names.split(",").filter(a => !!a);
}

outputData.textContent = getNames().join(", ");

button.onclick = () => {
  if (hasClicked === false) {
    let userName = input.value;
    greeting.textContent = `Hei og velkommen, vi ønsker deg alt som er godt ${userName}`;
    addName(userName);
    input.value = "";
    hasClicked = true;
    console.log(userName);
    outputData.textContent = getNames().join(", ");
  }
};


function randomiseLuckyNumber() {
	luckyNumber.textContent = Math.round(Math.random() * 1000);
	if (luckyNumberInput.value == luckyNumber.textContent) {
		document.body.classList.add("lucky");
		setTimeout(() => document.body.classList.remove("lucky"), 10 * 1000);
	}
}


randomiseLuckyNumber();

// Generate lucky numbers
// This better not start a gambling addiction
setTimeout(
	() => {
		randomiseLuckyNumber();
		setInterval(() => {
			randomiseLuckyNumber();
		}, 60 * 1000 // A minute
		);
	},
	(60 - new Date().getSeconds()) * // How many seconds until the next minute
		1000,
);
