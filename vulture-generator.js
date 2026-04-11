/**
 * VULTURE ENGINE #11 - DYNAMIC CONTENT INJECTOR
 */

async function deployVulturePages() {
    try {
        const response = await fetch('./vulture-db.json');
        const data = await response.json();
        
        // Find the current page info based on the URL
        const currentPage = data.find(item => window.location.pathname.includes(item.slug));

        if (currentPage) {
            // Auto-populate all Vulture-tagged elements
            document.title = `Cheap Flights to ${currentPage.target} | ${currentPage.event}`;
            
            if(document.getElementById('vulture-heading')) {
                document.getElementById('vulture-heading').innerText = `Best Deals for ${currentPage.event}`;
            }
            
            if(document.getElementById('vulture-description')) {
                document.getElementById('vulture-description').innerText = `Fly into ${currentPage.airport} and save with our exclusive rates.`;
            }
            
            // Inject the specific deal of the hour
            const dealBox = document.querySelector('.vulture-deal-box');
            if(dealBox) {
                dealBox.innerHTML = `<strong>Today's Top Pick:</strong> ${currentPage.deal}`;
            }
        }
    } catch (error) {
        console.error("Vulture Engine Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", deployVulturePages);
