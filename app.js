// Form HTML - "itemForm"
const itemForm = document.getElementById("itemForm");

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

// function that save data to localStorage
function saveData(key) {
   if (key === storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(storageArray));
   } else if (key === storeKey) {
      localStorage.setItem(storeKey, JSON.stringify(storeArray));
   } else {
      localStorage.setItem(soldKey, JSON.stringify(soldArray));
   }
}

function calculateTotal() {
   let result = document.getElementById("result");
   total = 0;
   soldArray.forEach(element => total+=parseInt(element.price));

   result.innerText = " $ " + JSON.stringify(total);
   
}


// Display data to sold table on the webpage.
function paintSold(itemObj) {

   let table = document.getElementById("soldTable");
   let row = table.insertRow(-1);
   let cell1 = row.insertCell(0);
   cell1.innerText = itemObj.id;
   let cell2 = row.insertCell(1);
   cell2.innerText = itemObj.item;
   let cell3 = row.insertCell(2);
   cell3.innerText = "$" + itemObj.price;
   calculateTotal()
}

// function that move data from the a store to a sell
function moveToSell(event) {
   // get a row and a ID from the store table.
   const row = event.target.parentElement.parentElement;
   const id = parseInt(row.firstChild.innerText);
   row.remove();

   // find the item from the storeArray and move to soldArray and save to the localStorage.
   const Arr = storeArray.filter((itemObj) => itemObj.id === id);
   soldArray.push(Arr[0]);
   paintSold(Arr[0]);

   saveData(soldKey);

   // filter out (or delete) selected item from the storeArray and save to the localStorage.
   storeArray = storeArray.filter((itemObj) => itemObj.id !== id);
   saveData(storeKey);

}

// Display data to store table on the webpage.
function paintStore(itemObj) {

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
   storeArray.push(Arr[0]);
   paintStore(Arr[0]);

   saveData(storeKey);

   // filter out(or delete) a selected item from the storageArray and save to the localStorage.
   storageArray = storageArray.filter((itemObj) => itemObj.id !== id);
   saveData(storageKey);


}

// Display data to storage table on the webpage.
function paintStorage(itemObj) {
   // Create a row for a storage
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

   // clear item and price values.
   price.value = "";
   item.value = "";

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

// When the page starts, it gets the data from the localStorage and store in the fake db.
// Then, paint them to the website so that localStorage data will reflect both on the webpadge and arrays(fake DBs)

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
const savedSold = localStorage.getItem(soldKey);

if (savedSold !== null) {
   const parsedSavedSold = JSON.parse(savedSold);
   soldArray = parsedSavedSold;
   parsedSavedSold.forEach(paintSold);
}
