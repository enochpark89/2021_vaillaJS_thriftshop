// Form HTML - "itemForm"
const itemForm = document.getElementById("itemForm");

// ul HTML - "storage"
const storage = document.getElementById("storage");

// input fields ( item and price. )
const item = document.getElementById("item");
const price = document.getElementById("price");

// Empty arrays for sections
let storageArray = [];
let storeArray = [];
let soldArray = [];

// KEYS for a local storage
const storageKey = "storage";
const storeKey = "store";
const soldKey = "sold";

// function that save to localStorage
function saveData(key) {
   if (key === storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(storageArray));
   } else if (key === storeKey) {
      localStorage.setItem(storeKey, JSON.stringify(storeArray));
   } else {
      localStorage.setItem(soldKey, JSON.stringify(storageArray));
   }
}

// function that move data from the store to sell

function moveToSell() {}

function paintStore(itemObj) {
   // Create a row and move the selected row information from storage section to store section.

   let table = document.getElementById("storeTable");
   let row = table.insertRow(-1);
   let cell1 = row.insertCell(0);
   cell1.innerText = itemObj.id;
   let cell2 = row.insertCell(1);
   cell2.innerText = itemObj.item;
   let cell3 = row.insertCell(2);
   cell3.innerText = "$" + itemObj.price;
   let cell4 = row.insertCell(3);

   // Create a delete button
   const moveButton = document.createElement("button");
   moveButton.innerText = "Sell";
   moveButton.addEventListener("click", moveToSell);

   cell4.appendChild(moveButton);
}

function moveToStore(event) {
   // get the row table HTMLs and id of a selected row.
   const row = event.target.parentElement.parentElement;
   const id = parseInt(row.firstChild.innerText);
   row.remove();

   // find the item from the storageArray and move to storeArray and save to the localStorage - store
   const Arr = storageArray.filter((itemObj) => itemObj.id === id);
   console.log(Arr);
   console.log(storeArray);
   storeArray.push(Arr[0]);
   console.log(storeArray);

   saveData(storeKey);

   // filter out found item from the storageArray and save to the localStorage - storage
   storageArray = storageArray.filter((itemObj) => itemObj.id !== id);
   saveData(storageKey);
}

function paintStorage(itemObj) {
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
   const moveButton = document.createElement("button");
   moveButton.innerText = "Display";
   moveButton.addEventListener("click", moveToStore);

   cell4.appendChild(moveButton);
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
   storageArray.push(itemObj);
   localStorage.setItem(storageKey, JSON.stringify(storageArray));
   paintStorage(itemObj);
}

itemForm.addEventListener("submit", handleStore);

// When the page starts, it gets the data from the localStorage.

//
const savedStorage = localStorage.getItem(storageKey);

if (savedStorage !== null) {
   const parsedSavedStorage = JSON.parse(savedStorage);
   storageArray = parsedSavedStorage;
   parsedSavedStorage.forEach(paintStorage);
}
const savedStore = localStorage.getItem(storeKey);

if (savedStore !== null) {
   const parsedSavedStore = JSON.parse(savedStore);
   storeArray = parsedSavedStore;
   parsedSavedStore.forEach(paintStore);
}
// const savedSold = localStorage.getItem(soldKey);

// if (savedSold !== null) {
//    const parsedSavedSold = JSON.parse(savedSold);
//    soldArray = parsedSavedSold;
//    parsedSavedStorage.forEach(moveToSold);
// }
