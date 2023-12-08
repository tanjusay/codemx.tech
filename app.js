
//*****page-effect
let activeIndex = 0;
const groups = document.querySelectorAll(".card-group");

const handleRightClick = () => {
    const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;
    const currentGroup = groups[activeIndex];
    const nextGroup = groups[nextIndex];
    const rightButton = document.getElementById('rightArrow');

    currentGroup.dataset.status = "after";
    nextGroup.dataset.status = "becomingActiveBefore";
        
    rightButton.classList.add('disabled');

    setTimeout(() => {
        nextGroup.dataset.status = "active";
        activeIndex = nextIndex;     
        updateBulletNavigation();
    }, 0); 
        
    setTimeout(() => {
        rightButton.classList.remove('disabled');
    }, 500);
}

const handleLeftClick = () => {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;
    const currentGroup = groups[activeIndex];
    const nextGroup = groups[nextIndex];
    const leftButton = document.getElementById('leftArrow'); 

    currentGroup.dataset.status = "before";
    nextGroup.dataset.status = "becomingActiveAfter";
           
    leftButton.classList.add('disabled');          
        
    setTimeout(() => {
        nextGroup.dataset.status = "active";
        activeIndex = nextIndex;     
        updateBulletNavigation();    
    }, 0); 
        
    setTimeout(() => {
        leftButton.classList.remove('disabled');
    }, 500);
}
 
const bullets = document.querySelectorAll('.bullet');

function updateBulletNavigation() {
    bullets.forEach((bullet, index) => {
        if (index === activeIndex) {
            bullet.classList.add('active');
        } else {
            bullet.classList.remove('active');
        }
    });
}

//*****quote-image-handler
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteButton = document.getElementById("new-quote-button");

// Function to fetch a random quote from the Quotable API
async function fetchRandomQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        const { content, author } = data;
        quoteText.textContent = content;
        quoteAuthor.textContent = `~ ${author}`;
    } 
    
    catch (error) {
        console.error("Failed to fetch a quote:", error);
        quoteText.textContent = "Failed to fetch a quote. Please try again later.";
    }
}

// Function to fetch a random image from Unsplash as bg
async function fetchRandomImage() {
    try {
        const imageResponse = await fetch("https://source.unsplash.com/random");
        const imageUrl = imageResponse.url;
        document.getElementById('quote-bg').style.backgroundImage = `url(${imageUrl})`;
    } 
    
    catch (error) {
        console.error("Failed to fetch an image:", error);
    }
}

  // Event listener for the "New Quote" button
newQuoteButton.addEventListener("click", () => {
    fetchRandomQuote();
    fetchRandomImage();
});

fetchRandomQuote();
fetchRandomImage();


//*****time-counter
function updateCounter() {
    // July 12, 2022, 4:00:00 PM
    const targetDate = new Date('2022-07-12T16:00:00');
    const currentDate = new Date();
    const timeDifference = currentDate - targetDate;
    // Calculate years, months, days, hours, minutes, and seconds
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((timeDifference / (1000 * 60 * 60 * 24 * 30.44)) % 12);
    const days = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 30.44);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);
    // Display the counter in the div
    const counterDiv = document.getElementById('time-counter');
    counterDiv.querySelector('.years').textContent = years;
    counterDiv.querySelector('.months').textContent = months;
    counterDiv.querySelector('.days').textContent = days;
    counterDiv.querySelector('.hours').textContent = hours;
    counterDiv.querySelector('.minutes').textContent = minutes;
    counterDiv.querySelector('.seconds').textContent = seconds;
}

// Update the counter every second
setInterval(updateCounter, 1000);

updateCounter();

