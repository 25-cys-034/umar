/**
 * Data Storage Management for Tic-Tac-Toe
 */

const STORAGE_KEY = 'tictactoe_scores';

// Retrieves all saved player data from localStorage
function getStoredData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

// Saves player data object to localStorage
function saveStoredData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Registers or retrieves a user by name.
 * @param {string} name 
 * @returns {object} Player object with wins, losses, draws
 */
function getOrCreatePlayer(name) {
  const formattedName = name.trim();
  if (!formattedName) return null;

  const data = getStoredData();
  if (!data[formattedName]) {
    data[formattedName] = { wins: 0, losses: 0, draws: 0 };
    saveStoredData(data);
  }
  return { name: formattedName, ...data[formattedName] };
}

/**
 * Updates a player's record in localStorage
 * @param {string} name 
 * @param {'wins'|'losses'|'draws'} resultType 
 */
function updatePlayerScore(name, resultType) {
  const formattedName = name.trim();
  if (!formattedName) return;

  const data = getStoredData();
  if (!data[formattedName]) {
    data[formattedName] = { wins: 0, losses: 0, draws: 0 };
  }

  if (data[formattedName][resultType] !== undefined) {
    data[formattedName][resultType] += 1;
    saveStoredData(data);
  }
}

/**
 * Returns sorted list of all players and their statistics
 */
function getLeaderboard() {
  const data = getStoredData();
  return Object.keys(data).map(name => ({
    name,
    ...data[name]
  })).sort((a, b) => b.wins - a.wins);
}
