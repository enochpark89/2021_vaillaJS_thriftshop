// Form HTML - "itemForm"
const itemForm = document.getElementById("itemForm");

// ul HTML - "storage"
const storage = document.getElementById("storage");

// input fields for item and price.
const item = document.getElementById("item");
const price = document.getElementById("price");

//
let itemObjArray = [];

// KEYS for a local storage
const storageKey = "storage";
const storeKey = "store";
const soldKey = "sold";

// save to localStorage
function saveData(key) {
   if (key === storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(itemObjArray));
   } else if (key === storeKey) {
      localStorage.setItem(storeKey, JSON.stringify(itemObjArray));
   } else {
      localStorage.setItem(soldKey, JSON.stringify(itemObjArray));
   }
}

function moveToStore(event) {
   // select the row and remove
   const row = event.target.parentElement.parentElement;
   const id = parseInt(row.firstChild.innerText);
   row.remove();

   // filter the ones that are not selected for deletion
   itemObjArray = itemObjArray.filter((itemObj) => itemObj.id !== parseInt(id));
   localStorage.setItem(storageKey, JSON.stringify(itemObjArray));
}

function addItem_Storage(itemObj) {
   // Create a row
   let table = document.getElementById("storageTable");
   let row = table.insertRow(-1);
   let cell1 = row.insertCell(0);
   cell1.innerText = itemObj.id;
   let cell2 = row.insertCell(1);
   cell2.innerText = itemObj.item;
   let cell3 = row.insertCell(2);
   cell3.innerText = "$" + itemObj.price;
   let cell4 = row.insertCell(3);

   // Create a delete button
   const deleteButton = document.createElement("button");
   deleteButton.innerText = "Display";
   deleteButton.addEventListener("click", moveToStore);

   // Append a delete button to the cell 3
   cell4.appendChild(deleteButton);

   console.log(itemObj);
   // const li = document.createElement("li");
   // li.id = itemObj.id;
   // const span = document.createElement("span");
   // span.innerText = itemObj.item + ": $" + itemObj.price.toString();
   // const deleteButton = document.createElement("button");
   // deleteButton.innerText = "Move to the Store";
   // deleteButton.addEventListener("click", moveToStore);

   // li.appendChild(span);
   // li.appendChild(deleteButton);

   // append to the storage section
   // storage.appendChild(li);
}

function handleStore(event) {
   // prevent refresh
   event.preventDefault();

   // Generate ID, price and value var.
   const id = Date.now();
   const priveVal = parseInt(price.value);
   const itemVal = item.value;

   // clear the values
   price.value = "";
   item.value = "";

   //  console.log("you entered the item", item.value, price.value);
   //  console.log(typeof price.value, typeof itemVal);

   const itemObj = {
      id: id,
      item: itemVal,
      price: priveVal,
   };
   itemObjArray.push(itemObj);
   localStorage.setItem(storageKey, JSON.stringify(itemObjArray));
   addItem_Storage(itemObj);
}

itemForm.addEventListener("submit", handleStore);

// When the page starts, it gets the data from the localStorage.

const savedStorage = localStorage.getItem(storageKey);

if (savedStorage !== null) {
   const parsedSavedStorage = JSON.parse(savedStorage);
   itemObjArray = parsedSavedStorage;
   parsedSavedStorage.forEach(addItem_Storage);
}
