let images = document.querySelectorAll("img");
let score = 0;
let products = { total: 0 };

// Convert NodeList to an array
let imagesArray = Array.from(images);

imagesArray.forEach(img => {
    img.addEventListener('click', function() {

        // Update products object with clicked element's class as key and 9 as value
        let className = this.classList.value;
        if (!products[className]) {
            products[className] = parseInt(this.nextElementSibling.innerText);
            // Increment the score when a new product is added
            score++;
            document.querySelector('sup').textContent = score;
        }
        
        // Calculate total score
        let total = 0;
        for (let key in products) {
            if (key !== 'total') {
                total += parseInt(products[key]);
            }
        }
        products.total = total;
        
        // Show products object in console
        console.log(products);
    });
});

// Toggle cart visibility
let cart = document.querySelector("i");
let cartItems = document.querySelector("#listItems");
let cartOpen = false;
cart.addEventListener('click', () => {
    cartOpen = !cartOpen;
    cartItems.style.transform = cartOpen ? "scale(1)" : "scale(0)";
    
    // Clear the cart content if closing
    if (!cartOpen) {
        cartItems.innerText = "";
    } else {
        // Populate cart in reverse order
        cartItems.innerHTML = "";
        let keys = Object.keys(products).reverse();
        keys.forEach(key => {
                let listItem = document.createElement("div");
                listItem.textContent = `${key}: ${products[key]}`;
                cartItems.appendChild(listItem);
        });
    }
});

// Initial hide the cart
cartItems.style.transform = "scale(0)";
