// imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://wechempins-default-rtdb.europe-west1.firebasedatabase.app/"
}
// HTML elements
const inputEndorsementEl = document.getElementById("input-endorsement")
const addButtonEl = document.getElementById("add-button")
const endorsementsEl = document.getElementById("endorsements")
const fromEl = document.getElementById("from")
const toEl = document.getElementById("to") 
// Firebase
const application = initializeApp(appSettings)
const database = getDatabase(application)
const endorsementsListInDatabase = ref(database, "endorsements")
//
addButtonEl.addEventListener("click", function () {
  if  (inputEndorsementEl.value === "" && 
  fromEl.value === "" && 
  toEl.value === "") {
    return
  }
  let endorsement = inputEndorsementEl.value
  let from = fromEl.value
  let to = toEl.value
  let  message = { 
    endorsement: endorsement,
    from: from, 
    to:to
  }
  push(endorsementsListInDatabase, message) 
  clearInputEndorsementEl()
  }
)  

onValue(endorsementsListInDatabase, function (snapshot) {
  let endorsementsArray = Object.entries(snapshot.val())
  
  clearEndorsementsEl()
  for (let i = endorsementsArray.length - 1; i >= 0; i--) {
    let currentEndorsement = endorsementsArray[i]
    appendEndorsementsEl(currentEndorsement)
    // console.log(currentEndorsement)
  }
}
)
function appendEndorsementsEl(messageVal) {
  let newEL = document.createElement("div")
  newEL.classList.add("endorsement-content")
  let idVal = messageVal[0]
  let  endorsement = messageVal[1]
  let fromVal = endorsement.from
  let toVal = endorsement.to
  let endorsementVal = endorsement.endorsement
  let counterVal = endorsement.counter

  newEL.innerHTML = `<p class="messengers">To ${toVal}</p>
                     <p class="endorsement-message">${endorsementVal}</p>
                        <p class="messengers">From ${fromVal}</p>`  
  endorsementsEl.append(newEL)
}

endorsementsEl.addEventListener("click", function (event) {
  if (event.target.className === "counter") {
    console.log(event.target.id)
    likeEndorsement(event.target.id)
  } }

)


function clearInputEndorsementEl() {
  inputEndorsementEl.value = ""
  fromEl.value = ""
  toEl.value = ""
}

function clearEndorsementsEl() {
  endorsementsEl.innerHTML = ""
  fromEl.value = ""
  toEl.value = ""
}

