const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");


let userMessage;

// Define keyword-based responses
const responses = {
    "hello":"Hello! Welcome to our coffee shop! How can I assist you today?",
    "hi": "Welcome to our coffee shop! How can I assist you today?",
    "hey": "Hello! Welcome to our coffee shop! How can I help you today?",
    "how are you": "Well, I am doing great! How are you?",
    "good": "Nice to hear that! How can I help you?",
    "menu": "We offer a variety of coffee drinks. Here are our drinks: Espresso Energizer, Cappuccino Delight, Lavish Latte, Bold Americano, Mighty Macchiato, Mocha Marvel",
    "energizer": "The Espresso Energizer is a rich, full-bodied coffee made by forcing a small amount of nearly boiling water through finely-ground coffee beans. The ultimate pick-me-up!",
    "espresso": "The Espresso Energizer is a rich, full-bodied coffee made by forcing a small amount of nearly boiling water through finely-ground coffee beans. The ultimate pick-me-up!",
    "espresso energizer": "The Espresso Energizer is a rich, full-bodied coffee made by forcing a small amount of nearly boiling water through finely-ground coffee beans. The ultimate pick-me-up!",
    "cappuccino delight": "The Cappuccino Delight is a classic Italian coffee drink made with equal parts espresso, steamed milk, and milk foam. Topped with a sprinkle of cocoa or cinnamon for a delightful treat.",
    "latte": "The Lavish Latte is a smooth and creamy coffee drink made with a shot of espresso and steamed milk, topped with a light layer of foam. Can be flavored with syrups like vanilla or caramel for a lavish experience.",
    "lavish": "The Lavish Latte is a smooth and creamy coffee drink made with a shot of espresso and steamed milk, topped with a light layer of foam. Can be flavored with syrups like vanilla or caramel for a lavish experience.",
    "lavish latte": "The Lavish Latte is a smooth and creamy coffee drink made with a shot of espresso and steamed milk, topped with a light layer of foam. Can be flavored with syrups like vanilla or caramel for a lavish experience.",
    "americano": "The Bold Americano is a simple yet strong coffee drink made by diluting a shot of espresso with hot water, giving it a similar strength to drip coffee but with a distinct espresso flavor.",
    "bold americano": "The Bold Americano is a simple yet strong coffee drink made by diluting a shot of espresso with hot water, giving it a similar strength to drip coffee but with a distinct espresso flavor.",
    "macchiato": "The Mighty Macchiato is a coffee drink that consists of a shot of espresso with a small amount of steamed milk or milk foam, offering a strong espresso flavor with a hint of creaminess.",
    "mighty macchiato": "The Mighty Macchiato is a coffee drink that consists of a shot of espresso with a small amount of steamed milk or milk foam, offering a strong espresso flavor with a hint of creaminess.",
    "mocha": "The Mocha Marvel is a chocolate-flavored variant of a latte, made with espresso, steamed milk, and chocolate syrup, often topped with whipped cream and a drizzle of chocolate sauce for a marvelous treat.",
    "mocha marvel": "The Mocha Marvel is a chocolate-flavored variant of a latte, made with espresso, steamed milk, and chocolate syrup, often topped with whipped cream and a drizzle of chocolate sauce for a marvelous treat.",
    "hours": "Our operating hours are from 8 AM to 8 PM every day, even on Sundays!",
    "time": "Our operating hours are from 8 AM to 8 PM every day, even on Sundays!",
    "cold drinks": "we have some natural juice and some water.",
    "food": "we have just quick snacks.",
    "hot drinks": "yes we do have hot drinks. These are the list of hot drinks we have : espresso energizer, cappuccino delight, lavish latte, bold americano, mighty macchiato and mocha marvel",
    "location": "You can find us at 123 Coffee Street.",
    "book": "great! you can book a table at our coffee shop by filling the book section in our website or by contacting us!",
    "find":"you can find us at 123 Coffee Street.",
    "address": "You can find us at 123 Coffee Street.",
    "located": "You can find us at 123 Coffee Street.",
    "number" : "Our phone numbers are : 123-456-7890 and 111-222-3333. Feel free to contact us anytime!",
    "phone number" : "Our phone numbers are : 123-456-7890 and 111-222-3333. Feel free to contact us anytime!",
    "contact" : "you can contact us on our email Coffee@gmail.com or on one our phone numbers 123-456-7890 , 111-222-3333.",
    "email" : "Our email is Coffee@gmail.com",
    "mail" : "Our email is Coffee@gmail.com",
    "facebook" : "Our facebook is Qutishat Coffee.",
    "instagram" :"Our instagram page is QutishatCoffee.",
    "reach" : "you can contact us on our email Coffee@gmail.com or on one our phone numbers 123-456-7890 , 111-222-3333.",
    "phone" : "Our phone numbers are : 123-456-7890 and 111-222-3333. Feel free to contact us anytime!",
    "branches": "We have 5 branches all over the world. You can find us in Germany, USA, France, Abidjan, Japan. Locate the closest shop to you and visit us! If we are not located in your country hopefully we will soon!",
    "discount": "We have a special discount on lattes this week!",
    "offers":"we have very suitable offers fo you. check our hompage on instagram or pass by in one of our branches.",
    "thanks": "Thank you for visiting our coffee shop!",
    "suggest": "I can suggest based on your type, do you like strong coffee or light coffee?",
    "light coffee": "If you like light coffee, I can suggest Cappuccino Delight, Mighty Macchiato, Mocha Marvel.",
    "strong coffee": "If you like strong coffee, I can suggest Espresso Energizer, Bold Americano, Lavish Latte.",
    "thank you": "Thank you for visiting our coffee shop!",
    "delivery": "Yes. we will deliver the order to you as soon it is finished.",
    "cancel" : "the order has been canceled.",
    "default": "I'm sorry, I didn't understand that. Could you please tell me again?"
};

const countriesWithBranches = ["germany", "usa", "france", "abidjan", "japan"];

// List of available products

const availableProducts = {
    "espresso energizer": 3.99,
    "espresso": 2.49,
    "latte": 4.99,
    "lavish latte": 5.49,
    "macchiato": 4.49,
    "mighty macchiato": 4.99,
    "americano": 3.49,
    "bold americano": 3.99,
    "mocha": 5.99,
    "mocha marvel": 6.49,
    "cappuccino delight": 4.49,
    "cappuccino": 4.49,
    "water": 1.00,
    "snacks": 2.50
};


let orderHistory = [];

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent = className === "outgoing" 
        ? `<p>${message}</p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const getResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("order")) {
        return handleOrder(lowerCaseMessage);
    }

    if (lowerCaseMessage.includes("total")) {
        return handleTotalInquiry();
    }

    if (lowerCaseMessage.startsWith("add to my order")) {
        return addToOrder(lowerCaseMessage.replace("add to my order", "").trim());
    }

    // Check for exact match first
    for (const keyword in responses) {
        if (lowerCaseMessage.includes(keyword)) {
            return responses[keyword];
        }
    }

    // If no exact match, try to find closest keyword
    const closestKeyword = findClosestKeyword(lowerCaseMessage, Object.keys(responses));
    if (closestKeyword && responses[closestKeyword.toLowerCase()]) {
        return responses[closestKeyword.toLowerCase()];
    }

    return responses["default"];
};



const findClosestKeyword = (input, keywords) => {
    let closestKeyword = null;
    let minDistance = Infinity;

    keywords.forEach(keyword => {
        const distance = natural.LevenshteinDistance(input.toLowerCase(), keyword.toLowerCase());
        if (distance < minDistance) {
            minDistance = distance;
            closestKeyword = keyword;
        }
    });

    // Threshold for similarity (adjust as needed)
    if (minDistance < 3) {  // Adjust the threshold as per your requirement
        return closestKeyword;
    } else {
        return null; // No close match found
    }
};


const handleOrder = (orderMessage) => {
    const items = orderMessage.match(/(\d+)\s*([a-zA-Z\s]+)/g);
    let total = 0;
    let orderSummary = "Your order:\n";

    if (items) {
        items.forEach(item => {
            const match = item.match(/(\d+)\s*([a-zA-Z\s]+)/);
            if (match) {
                const quantity = parseInt(match[1]);
                const product = match[2].trim().toLowerCase();
                const productKey = Object.keys(availableProducts).find(p => p.toLowerCase() === product);

                if (productKey) {
                    const cost = availableProducts[productKey];
                    total += cost * quantity;
                    orderSummary += `${quantity} ${productKey.charAt(0).toUpperCase() + productKey.slice(1)}\n`;
                } else {
                    orderSummary += `${quantity} ${product} (not available)\n`;
                }
            }
        });
    } else {
        return "What would you like to order?";
    }

    orderSummary += `Total: $${total.toFixed(2)}`;
    orderHistory.push({ items: orderMessage, total });
    return orderSummary;
};

const handleTotalInquiry = () => {
    if (orderHistory.length === 0) {
        return "You haven't placed any orders yet.";
    }

    const lastOrder = orderHistory[orderHistory.length - 1];
    return `Your last order was:\n${lastOrder.items}\nTotal: $${lastOrder.total.toFixed(2)}`;
}

const addToOrder = (newItemsMessage) => {
    if (orderHistory.length === 0) {
        return "You haven't placed any orders yet.";
    } 

    const lastOrder = orderHistory[orderHistory.length - 1];
    const newItems = newItemsMessage.match(/(\d+)\s*([a-zA-Z\s]+)/g);
    let newTotal = lastOrder.total;
    let newOrderSummary = lastOrder.items; // Start with existing order summary

    if (newItems) {
        newItems.forEach(item => {
            const match = item.match(/(\d+)\s*([a-zA-Z\s]+)/);
            if (match) {
                const quantity = parseInt(match[1]);
                const product = match[2].trim().toLowerCase();
                const cost = availableProducts[product];

                if (cost !== undefined) {
                    newTotal += cost * quantity;
                    newOrderSummary += `\n${quantity} ${product.charAt(0).toUpperCase() + product.slice(1)}`; // Append new item
                } else {
                    newOrderSummary += `\n${quantity} ${product} (not available)`; // Append not available item
                }
            }
        });
    } else {
        return "No items found in your request.";
    }

    // Update the last item in orderHistory with new order summary and total
    orderHistory[orderHistory.length - 1] = { items: newOrderSummary.trim(), total: newTotal };

    return `Updated order:\n${newOrderSummary.trim()}\nTotal: $${newTotal.toFixed(2)}`;
}







const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");
    const response = getResponse(userMessage); 
    messageElement.textContent = response;
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    chatInput.value = "";

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleChat();
        e.preventDefault();
    }
});




chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));



// Coffee shop functionality

let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector('.main-home-image').src = src;
    };
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        }
    },
});