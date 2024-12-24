document.addEventListener('DOMContentLoaded', () => {
    let taps = 0;
    let boostActive = false;
    let boostMultiplier = 2;
    let tapCount = 0;
    const tapLimit = 50;
    const limitTime = 60000; // 1 minute in milliseconds
    const resourceCountElement = document.getElementById('resource-count');
    const userRankingElement = document.getElementById('user-ranking');
    const userLeagueElement = document.getElementById('user-league');
    const remainingClicksElement = document.getElementById('remaining-clicks');
    const tapButton = document.getElementById('tap-button');
    const boostButton = document.getElementById('boost-button');

    function updateResourceCount() {
        resourceCountElement.textContent = `Kwandala Coins: ${taps}`;
        userRankingElement.textContent = `Ranking: ${calculateRanking(taps)}`;
        userLeagueElement.textContent = `League: ${determineLeague(taps)}`;
        remainingClicksElement.textContent = `Remaining Clicks: ${tapLimit - tapCount}`;
    }

    function calculateRanking(score) {
        // Simplified ranking calculation, you can customize it as needed
        return Math.floor(score / 1000);
    }

    function determineLeague(score) {
        if (score >= 50000000) return "Whale Master";
        if (score >= 10000000) return "Grand Master";
        if (score >= 1000000) return "Master";
        if (score >= 100000) return "Pro";
        if (score >= 10000) return "Amateur";
        return "Beginner";
    }

    tapButton.addEventListener('click', () => {
        if (tapCount < tapLimit) {
            tapCount++;
            if (boostActive) {
                taps += boostMultiplier;
            } else {
                taps++;
            }
            updateResourceCount();
        }
    });

    boostButton.addEventListener('click', () => {
        if (!boostActive) {
            boostActive = true;
            boostButton.disabled = true;
            setTimeout(() => {
                boostActive = false;
                boostButton.disabled = false;
            }, 10000); // Boost lasts for 10 seconds
        }
    });

    // Reset tap count every minute
    setInterval(() => {
        tapCount = 0;
        updateResourceCount();
    }, limitTime);

    // Navigation logic
    const sections = document.querySelectorAll('.container');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });

    // Show the home section by default
    document.getElementById('home').style.display = 'block';
});
