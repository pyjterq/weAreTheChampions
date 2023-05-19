// javascript
// https://wechempins-default-rtdb.europe-west1.firebasedatabase.app/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://wechempins-default-rtdb.europe-west1.firebasedatabase.app/"
}
const inputEndorsementEl = document.getElementById("input-endorsement")
const addButtonEl = document.getElementById("add-button")
const endorsementsEl = document.getElementById("endorsements")
const fromEl = document.getElementById("from")
const toEl = document.getElementById("to") 
const counterEl = document.getElementsByClassName("counter-number")

const application = initializeApp(appSettings)
const database = getDatabase(application)
const endorsementsListInDatabase = ref(database, "endorsements")

addButtonEl.addEventListener("click", function () {
  if  (inputEndorsementEl.value === "") {
    return
  }
  let endorsement = inputEndorsementEl.value
  let from = fromEl.value
  let to = toEl.value
  let  message = { 
    endorsement: endorsement,
    from: from, 
    to:to,
    counter: 0,
  }
  console.log(message)  
  push(endorsementsListInDatabase, message) 
  clearInputEndorsementEl()
  }
)  

onValue(endorsementsListInDatabase, function (snapshot) {
  let endorsementsArray = Object.values(snapshot.val())
  
  clearEndorsementsEl()
  for (let i = endorsementsArray.length - 1; i >= 0; i--) {
    let currentEndorsement = endorsementsArray[i]
    appendEndorsementsEl(currentEndorsement)
  }
}
)
function appendEndorsementsEl(endorsement) {
  let newEL = document.createElement("div")
  newEL.classList.add("endorsement-content")

  let fromVal = endorsement.from
  let toVal = endorsement.to
  let endorsementVal = endorsement.endorsement
  let counterVal = endorsement.counter

  newEL.innerHTML = `<p class="messengers">To ${toVal}</p>
                     <p class="endorsement-message">${endorsementVal}</p>
                     <div id="endorsement-counter">
                        <p class="messengers">From ${fromVal}</p>
                        <p class="counter"><span class="counter-number">${counterVal}</span> &#10084;</p>
                     </div>`  
  endorsementsEl.append(newEL)
}



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

counterEl.addEventListener("click", function () {
    let counterNumber = counterEl.innerHTML
    counterNumber++
    counterEl.innerHTML = counterNumber
  }
)
