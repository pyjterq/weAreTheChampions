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

const application = initializeApp(appSettings)
const database = getDatabase(application)
const endorsementsListInDatabase = ref(database, "endorsements")

addButtonEl.addEventListener("click", function () {
  let endorsement = inputEndorsementEl.value
  push(endorsementsListInDatabase, endorsement) 
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
  // for (let i = 0; i < endorsementsArray.length; i++) {
  //   let currentEndorsement = endorsementsArray[i]
  //   appendEndorsementsEl(currentEndorsement)
  
  //    }
}
)
function appendEndorsementsEl(endorsement) {
  let endorsementVal = endorsement
  let newEL = document.createElement("li")
  newEL.textContent = endorsementVal  
  endorsementsEl.append(newEL)
}



function clearInputEndorsementEl() {
  inputEndorsementEl.value = ""
}

function clearEndorsementsEl() {
  endorsementsEl.innerHTML = ""
}