import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://realtime-database-d17e9-default-rtdb.firebaseio.com/"
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const endorsementReference = ref(db, 'endorsements/')

const inputElement = document.getElementById("endorsement-input")
const addEndorsementButton = document.getElementById("add-endorsement-button")
const removeAllEndorsementsButton = document.getElementById("remove-all-endorsements-button")

function addEndorsementToDb(){
    const userInput = inputElement.value
    
    push(endorsementReference, userInput)
}

function removeEndorsements(){
    remove(endorsementReference)
}

//wanted this in a function - showEndorsements - but won't load data until
//function runs (we want asynchronous)
onValue(endorsementReference, (snapshot) => {
    inputElement.value = ""
    
    const ulElement = document.getElementById("endorsement-list")
    
    if(snapshot.exists()){
        const listItems = Object.values(snapshot.val())
        
        listItems.forEach(item => {
            const newListItem = document.createElement("li")
            newListItem.innerText = item

            ulElement.appendChild(newListItem)
        })
    } else {
        while (ulElement.firstChild) {
            ulElement.removeChild(ulElement.firstChild);
        }
    }
})

addEndorsementButton.addEventListener("click", addEndorsementToDb)
removeAllEndorsementsButton.addEventListener("click", removeEndorsements)
