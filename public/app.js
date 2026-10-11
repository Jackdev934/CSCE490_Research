
const startingBudget = 1000;
let remainingBudget = startingBudget;
let draftedPlayers = [];

// Sample NFL players
const players = [
    { name: "Patrick Mahomes", team: "Chiefs", position: "QB", cost: 300, rating: 95 },
    { name: "Josh Allen", team: "Bills", position: "QB", cost: 290, rating: 94 },
    { name: "Lamar Jackson", team: "Ravens", position: "QB", cost: 280, rating: 93 },
    { name: "Jalen Hurts", team: "Eagles", position: "QB", cost: 270, rating: 91 },

    { name: "Christian McCaffrey", team: "49ers", position: "RB", cost: 260, rating: 95 },
    { name: "Bijan Robinson", team: "Falcons", position: "RB", cost: 250, rating: 93 },
    { name: "Saquon Barkley", team: "Eagles", position: "RB", cost: 240, rating: 92 },
    { name: "Derrick Henry", team: "Ravens", position: "RB", cost: 230, rating: 90 },

    { name: "Justin Jefferson", team: "Vikings", position: "WR", cost: 250, rating: 96 },
    { name: "Ja'Marr Chase", team: "Bengals", position: "WR", cost: 240, rating: 95 },
    { name: "CeeDee Lamb", team: "Cowboys", position: "WR", cost: 230, rating: 93 },
    { name: "Amon-Ra St. Brown", team: "Lions", position: "WR", cost: 220, rating: 92 },

    { name: "Travis Kelce", team: "Chiefs", position: "TE", cost: 190, rating: 91 },
    { name: "George Kittle", team: "49ers", position: "TE", cost: 180, rating: 90 },
    { name: "Sam LaPorta", team: "Lions", position: "TE", cost: 170, rating: 88 },
    { name: "Trey McBride", team: "Cardinals", position: "TE", cost: 160, rating: 87 }
];

// Sample NFL games
const games = [
    { home: "Chiefs", away: "Bills" },
    { home: "Eagles", away: "Cowboys" },
    { home: "Ravens", away: "Bengals" }
];

function displayPlayers() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";

    players.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";

        const alreadyDrafted = draftedPlayers.some(
            selected => selected.name === player.name
        );

        const positionTaken = draftedPlayers.some(
            selected => selected.position === player.position
        );

        const cannotAfford = player.cost > remainingBudget;

        card.innerHTML = `
            <h3>${player.name}</h3>
            <p>${player.team} | ${player.position}</p>
            <p>Cost: ${player.cost} tokens</p>
            <p>Rating: ${player.rating}</p>
            <button
                ${alreadyDrafted || positionTaken || cannotAfford ? "disabled" : ""}
            >
                ${alreadyDrafted ? "Selected" : "Draft Player"}
            </button>
        `;

        const button = card.querySelector("button");

        button.addEventListener("click", () => {
            draftPlayer(player.name);
        });

        playerList.appendChild(card);
    });
}

function draftPlayer(playerName) {
    const player = players.find(p => p.name === playerName);

    if (!player) {
        return;
    }

    if (draftedPlayers.some(p => p.name === player.name)) {
        return;
    }

    if (draftedPlayers.some(p => p.position === player.position)) {
        showMessage("You already have a player in that position.");
        return;
    }

    if (player.cost > remainingBudget) {
        showMessage("You do not have enough tokens for that player.");
        return;
    }

    draftedPlayers.push(player);
    remainingBudget -= player.cost;

    updateDraft();
    showMessage(`${player.name} added to your lineup!`);
}

function removePlayer(playerName) {
    const player = draftedPlayers.find(p => p.name === playerName);

    if (!player) {
        return;
    }

    draftedPlayers = draftedPlayers.filter(
        p => p.name !== playerName
    );

    remainingBudget += player.cost;

    updateDraft();
    showMessage(`${player.name} removed from your lineup.`);
}

function displayLineup() {
    const lineupList = document.getElementById("lineup-list");
    lineupList.innerHTML = "";

    if (draftedPlayers.length === 0) {
        lineupList.innerHTML = "<p>No players drafted yet.</p>";
        return;
    }

    draftedPlayers.forEach(player => {
        const card = document.createElement("div");
        card.className = "lineup-card";

        card.innerHTML = `
            <h3>${player.position}: ${player.name}</h3>
            <p>${player.team}</p>
            <p>Cost: ${player.cost} tokens</p>
            <button class="remove-button">Remove Player</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            removePlayer(player.name);
        });

        lineupList.appendChild(card);
    });
}

function updateDraft() {
    document.getElementById("remaining-budget").textContent =
        `${remainingBudget} Tokens`;

    document.getElementById("player-count").textContent =
        `${draftedPlayers.length} / 4`;

    displayPlayers();
    displayLineup();
}

function showMessage(message) {
    document.getElementById("draft-message").textContent = message;
}

function displayGames() {
    const gameList = document.getElementById("game-list");
    gameList.innerHTML = "";

    games.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <h3>${game.away} vs. ${game.home}</h3>
            <p>Prediction coming soon</p>
        `;

        gameList.appendChild(card);
    });
}

// Initialize page
updateDraft();
displayGames();
