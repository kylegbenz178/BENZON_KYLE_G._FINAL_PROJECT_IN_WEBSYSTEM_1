let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let empty = document.querySelector('.empty');
let clearCartBtn = document.querySelector('.clearCart');
let checkoutBtn = document.querySelector('.checkoutBtn');
let search = document.querySelector('#search');

/* OPEN & CLOSE CART */
openShopping.onclick = () => {
    document.body.classList.add('active');
};

closeShopping.onclick = () => {
    document.body.classList.remove('active');
};

/* PRODUCTS */
let products = [
    {
        id:1,
        name:'System Unit',
        image:'images/greensystemunit.jpg',
        price:90000
    },

    {
        id:2,
        name:'XBOX Keyboard',
        image:'images/keyboardandmouseset.jpg',
        price:1800
    },

    {
        id:3,
        name:'Game Controller',
        image:'images/gamecontroller.jpg',
        price:1200
    },

    {
        id:4,
        name:'Mini Retro Bluetooth Speaker',
        image:'images/bluetoothspeaker.jpg',
        price:1000
    },

    {
        id:5,
        name:'Mossy Keyboard Rug',
        image:'images/mossykeyboardrug.jpg',
        price:700
    },

    {
        id:6,
        name:'Mossy Mouse Pad',
        image:'images/mossymousepad.jpg',
        price:500
    }
];

/* CART STORAGE */
let listCards = JSON.parse(localStorage.getItem("cart")) || [];

/* FORMAT PESO */
function formatPeso(value){
    return "₱" + value.toLocaleString();
}

/* SAVE CART */
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(listCards));
}

/* LOAD PRODUCTS */
function initApp(){

    list.innerHTML = '';

    products.forEach((p, key) => {

        let item = document.createElement('div');

        item.classList.add('item');

        item.innerHTML = `
            <img src="${p.image}">

            <div>${p.name}</div>

            <div>${formatPeso(p.price)}</div>

            <button id="btn-${key}" onclick="add(${key})">
                Add to Cart
            </button>
        `;

        list.appendChild(item);
    });

    restoreButtons();
}

initApp();

/* RESTORE BUTTONS */
function restoreButtons(){

    products.forEach((p, key) => {

        if(listCards[key]){

            let btn = document.getElementById(`btn-${key}`);

            if(btn){
                btn.innerText = "Already in Cart";
                btn.disabled = true;
            }
        }
    });
}

/* ADD TO CART */
function add(key){

    if(listCards[key]) return;

    listCards[key] = {
        ...products[key],
        quantity:1
    };

    let btn = document.getElementById(`btn-${key}`);

    if(btn){
        btn.innerText = "Already in Cart";
        btn.disabled = true;
    }

    saveCart();
    reload();
}

/* RELOAD CART */
function reload(){

    listCard.innerHTML = '';

    let count = 0;
    let totalPrice = 0;

    listCards.forEach((item, key) => {

        if(!item) return;

        totalPrice += item.price * item.quantity;
        count += item.quantity;

        let li = document.createElement('li');

        li.innerHTML = `
            <div>
                <img src="${item.image}">
            </div>

            <div>
                ${item.name}
            </div>

            <div>
                ${formatPeso(item.price * item.quantity)}
            </div>

            <div>
                <button onclick="change(${key}, ${item.quantity - 1})">-</button>

                <span>${item.quantity}</span>

                <button onclick="change(${key}, ${item.quantity + 1})">+</button>
            </div>
        `;

        listCard.appendChild(li);
    });

    total.innerText = formatPeso(totalPrice);
    quantity.innerText = count;

    empty.style.display = count === 0 ? 'block' : 'none';

    saveCart();
}

/* CHANGE QUANTITY */
function change(key, qty){

    if(qty <= 0){
        return removeItem(key);
    }

    listCards[key].quantity = qty;

    reload();
}

/* REMOVE ITEM */
function removeItem(key){

    listCards[key] = null;

    let btn = document.getElementById(`btn-${key}`);

    if(btn){
        btn.innerText = "Add to Cart";
        btn.disabled = false;
    }

    reload();
}

/* CLEAR CART */
clearCartBtn.onclick = () => {

    listCards = listCards.map(() => null);

    localStorage.removeItem("cart");

    initApp();
    reload();
};

/* CHECKOUT */
checkoutBtn.onclick = () => {

    alert(
        "Checkout successful! Total: " + total.innerText
    );
};

/* SEARCH */
search.oninput = () => {

    let val = search.value.toLowerCase();

    document.querySelectorAll('.item').forEach(item => {

        item.style.display =
            item.innerText.toLowerCase().includes(val)
                ? "block"
                : "none";
    });
};

reload();