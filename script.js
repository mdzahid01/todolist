const textBox = document.querySelector('#text-box');
const listContainer = document.querySelector('.list-container');  //  UL-tag

fatchData();  

textBox.addEventListener("keyup",(event)=>{    // code for : ENTER दबाने पर भी नया TODO create हो।
    if (event.key ==  "Enter") {
        this.value = "";     // todo create hone ke baad textbox ko khali krne ke liye
        Add();
    }
})

function Add(){
    if (textBox.value == "") {
        alert("Empty ToDo list cannot be created....");
    }
    else{
        let newElement = document.createElement("li");
        newElement.innerHTML = `<span>${textBox.value}</span> <div class="toright"><i class="fa-regular fa-pen-to-square"></i> <i class="fa-solid fa-trash"></i></div>`;
        listContainer.appendChild(newElement);
        textBox.value = "";
        saveToLocal();
    }
}

// localStorage ka overview --

// * localStorage is a type of web storage that allows you to store data in the web browser with no expiration date. 
// * This data will remain even after the browser is closed or the computer is restarted.
// * It provides a simple key-value storage mechanism and can only store strings.

// 1. setItem(key, value): Adds or updates a key-value pair in the storage. If the key already exists, its value will be updated with the new value.
    // Eg: localStorage.setItem('key', 'value');

// 2. getItem(key): Retrieves the value associated with the specified key.
    // Eg: const value = localStorage.getItem('key');

// 3. removeItem(key): Removes the key-value pair associated with the specified key from the storage.
    // Eg: localStorage.removeItem('key');

// 4. clear(): Removes all key-value pairs from the storage.
    // Eg: localStorage.clear();

// 5. length: Property that returns the number of key-value pairs currently stored in the storage.
    // Eg: const itemCount = localStorage.length;

// 6. key(index): Returns the name of the key at the specified index in the storage.
    // Eg: const keyName = localStorage.key(0); // Retrieves the first key


// localStorage me data save krega
function saveToLocal(){
    localStorage.setItem("data",listContainer.innerHTML);
}

// localStorage me jo data save hai usko display krega
function fatchData(){
    listContainer.innerHTML=localStorage.getItem("data");
}

listContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-pen-to-square")) {
        const listItem = event.target.parentElement.parentElement;  // DOM में ऊपर जाने के लिए parentElement.parentElement की chaning किया(ex: baab ka baap)
        const spanElement = listItem.querySelector("span");

        // Create an input field for editing
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.className = "editable-textbox";
        inputElement.value = spanElement.textContent;

        // Replace the span with the input field
        listItem.replaceChild(inputElement, spanElement);

        // Focus on the input field
        inputElement.focus();
        inputElement.select();

        // When editing is finished (e.g., pressing Enter), update the list item
        inputElement.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                const newText = inputElement.value;
                spanElement.textContent = newText;
                listItem.replaceChild(spanElement, inputElement);
                saveToLocal();
            }
        });

        inputElement.addEventListener("blur", (event) => {
                const newText = inputElement.value;
                spanElement.textContent = newText;
                listItem.replaceChild(spanElement, inputElement);
                saveToLocal();
        });

    } else if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveToLocal();
    } else if (event.target.classList.contains("fa-trash")) {
        event.target.parentElement.parentElement.remove();  // DOM में ऊपर जाने के लिए parentElement.parentElement की chaning किया 
        saveToLocal();
    }
}, false);
