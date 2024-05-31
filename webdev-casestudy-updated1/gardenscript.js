function logout(){
    window.location.href = "index.html";
}

function shop(){
    window.location.href = "shop.html";
}

let body = document.querySelector('body')

function showcart(){
    document.body.classList.toggle('showcart');
}

function checkout(){
    if (total > 0){
    document.body.classList.toggle('checkout')
    /* activates blur */
    const container = document.querySelector('.container');
    container.classList.toggle('active');
    showcart();

    const total = document.querySelector('.totalprice').textContent;
    const amount = document.querySelector('.amountfee');

    amount.textContent = '₱ ' + total;
    }
    else{
        alert('Select an item first!')
    }
}

let count = 0;
let itemsincart = [];
let total = 0;

function addtocart(event) {
    const button = event.target; /*what button triggered the event*/
    const container = button.closest('.prodcontainer'); /*the whole div of prodcontainer is stored based on what button is pressed - dito kinukuha lahat ng info (kung ano nasa loob ng .prodcontainer)*/
    const name = container.querySelector('.name').textContent;

    if (!itemsincart.includes(name)){
        itemsincart.push(name);

        /* thought process --- collect and append everything first before displaying in the .listtab div*/
        /*values inside the div*/
        const image = container.querySelector('.containerpic').src;
        const price = container.querySelector('.buy').value;

        const cartitem = document.createElement('div');
        cartitem.classList.add('items'); /*creates new div and adds the values*/

        const cartimage = document.createElement('div');
        cartimage.classList.add('tabimg');
        const img = document.createElement('img');
        img.src = image;
        cartimage.appendChild(img);

        const cartname = document.createElement('div');
        cartname.classList.add('itemname');
        cartname.textContent = name;

        const cartprice = document.createElement('div');
        cartprice.classList.add('itemprice');
        cartprice.textContent = price;

        const cartquantity = document.createElement('div');
        cartquantity.classList.add('quantity');
        cartquantity.innerHTML = `
            <span><input type="button" value="-" class="quantitysubtract" onclick="decrement(event)"></span>
            <span class="itemquantity" id="${name}">1</span>
            <span><input type="button" value="+" class="quantityadd" id="${name}" onclick="increment(event)"></span>
            <span><input type="button" value="X" class="remove" id="${name}" onclick="removeitem(event)"></span>
        `;

        cartitem.appendChild(cartimage);
        cartitem.appendChild(cartname);
        cartitem.appendChild(cartprice);
        cartitem.appendChild(cartquantity);

        const listTab = document.querySelector('.listtab');
        listTab.appendChild(cartitem);

        /* display in total */
        let pricevalue = price.replace(/₱|,/g, ""); /* removes peso sign */
        const parseprice = parseFloat(pricevalue);
        total += parseprice;
        hundredsplace();

        /* displays it in count */
        const count_txt = document.querySelector('.count');
        count += 1;
        count_txt.textContent = count

        /* for remove button */
        const removebutton = cartitem.querySelector('.remove');
        removebutton.addEventListener('click', function() {
            cartitem.remove();
        });
    }
}

/* removes the item from the itemsincart array and binabawasan yung total amount */
function removeitem(event){
    const button = event.target;
    const buttonid = button.id;

    for (let i = 0; i < itemsincart.length; i++) {
        if (itemsincart[i] === buttonid){
            itemsincart.splice(i, 1); /* splice = removes an element, pop = removes last element */
        }
    }   

    const items = button.closest('.items');
    const itemprice = items.querySelector('.itemprice');
    const pricetext = itemprice.textContent;
    let price = pricetext.replace(/₱|,/g, ""); /* removes peso sign (| = separator, g = global (assures all are replaced, no g = first occurence only))*/
    const priceparse = parseFloat(price);

    const quantitydiv = items.querySelector('.itemquantity')
    const quantitytext = quantitydiv.textContent;
    const quantityparse = parseInt(quantitytext);
    const itemtotal = quantityparse * priceparse;

    total -= itemtotal;

    const count_txt = document.querySelector('.count');
    count_txt.textContent = count -= 1;


    hundredsplace();
}

function increment(event){
    const button = event.target;
    const num = button.closest('.quantity');
    const quantity = num.querySelector('.itemquantity');
    
    let itemquantity = parseInt(quantity.textContent);
        itemquantity++;
        quantity.textContent = itemquantity;

    const items = num.closest('.items');
    const itemprice = items.querySelector('.itemprice');
    const pricetext = itemprice.textContent;
    let price = pricetext.replace(/₱|,/g, "");
    const priceparse = parseFloat(price);

    total += priceparse;

    hundredsplace();
}

function decrement(event){
    const button = event.target;
    const num = button.closest('.quantity');
    const quantity = num.querySelector('.itemquantity');
    
    const items = num.closest('.items');
    const itemprice = items.querySelector('.itemprice');
    const pricetext = itemprice.textContent;
    let price = pricetext.replace(/₱|,/g, "");
    const priceparse = parseFloat(price);
    
    let itemquantity = parseInt(quantity.textContent);
    if (itemquantity > 1){
        total -= priceparse;
        itemquantity--;
        quantity.textContent = itemquantity;
    };
    
    hundredsplace();
}

function hundredsplace(){
    const pricedisplay = document.querySelector('.totalprice')
    const totalprice = total.toFixed(2); /* 2 decimal places */
    pricedisplay.textContent = totalprice;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.perinfos');
    form.addEventListener('submit', function(event) {
        const radioButtons = document.querySelectorAll('input[name="method"]');
        let isAnyChecked = false;
        radioButtons.forEach(function(radioButton) {
            if (radioButton.checked) {
                isAnyChecked = true;
            }
        });
        if (!isAnyChecked) {
            event.preventDefault();
            alert('Please select a payment method.');
        }
        else{
            alert('Thankyou for your purchase! Your order has been successfully placed.');
        }
    });
});