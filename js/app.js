// (function($) {

// {
//     "globals": {
//         "$": false
//     }
// }

// 'use strict';

////////// Tic-Tac-Toe //////////
//
// Author: Mason Embry
// Created 10/6/2016
// Last Updated:
//
// Tested in current versions of Chrome, Safari, and Firefox.
//
/////////////////////////////////



var PlayerConstructor = function(name) {
    this.name = name;
    this.winner = false;
    this.turn = false;
    this.computerPlayer = false;
};



// Show start screen before first game.
var showStartScreen = function() {
    // Hide entire #board div
    $("#board").hide();

    // Create #start div and show it
    var startDivContent = '<div class="screen screen-start" id="start">';
    startDivContent += '<header>';
    startDivContent += '<h1>Tic Tac Toe</h1>';
    startDivContent += '<a href="#" class="button">Start game</a>';
    startDivContent += '</header>';
    startDivContent += '</div>';
    $("body").append(startDivContent);
};

// Start a new game.
var newGame = function() {
    // Remove the #finish div if it exists.
    $("#finish").remove();

    // Get names of players.
    var player1 = new PlayerConstructor(prompt("What is player1's name?"));
    var player2 = new PlayerConstructor(prompt("What is player2's name?"));

    // Hide start screen and show board.
    $("#start").hide();
    $("#board").show();
};

// When button clicked
// Extra credit:
// Let player choose to play against computer or against other player.
// If against other player:
// Get each player's name
// Display each player's name while playing
// Display the winning player's name at end
// If against computer:
// Get player's name for player 1
// Set player 2's name to "Computer"
// Start AI version of game...
// #start div is hidden
// #board div is shown
// game begins

// PLAY GAME - two players

// Add the game play following these rules.
// Play alternates between X and O.
// The current player is indicated at the top of the page -- the box with the symbol O or X is highlighted for the current player. You can do this by simply adding the class .active to the proper list item in the HTML. For example, if it's player one's turn, the HTML should look like this: <li class="players active" id="player1">
// When the current player mouses over an empty square on the board, it's symbol the X or O should appear on the square. You can do this using the x.svg or o.svg graphics (hint use JavaScript to set the background-image property for that box.)
// Players can only click on empty squares. When the player clicks on an empty square, attach the class box-filled-1 (for O) or box-filled-2 (for X) to the square. The CSS we're providing will automatically add the proper image to the square marking it as occupied.
// The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally. If all of the squares are filled and no players have three in a row the game is a tie.

// PLAY GAME - one player


// Hide #board div, show #finish div, and indicate winner.
var gameOver = function() {
    // Hide #board div.
    $("#board").hide();

    // Create and show #finish div.
    var finishDivContent = '<div class="screen screen-win" id="finish">';
    finishDivContent += '<header>';
    finishDivContent += '<h1>Tic Tac Toe</h1>';
    finishDivContent += '<p class="message"></p>';
    finishDivContent += '<a href="#" class="button">New game</a>';
    finishDivContent += '</header>';
    finishDivContent += '</div>';
    $("body").append(finishDivContent);

    // Indicate winner by changing paragraph text and adding the correct class to the #finish div.
    if (player1.winner === true) {
        $("#finish").addClass("screen-win-one");
        $(".message").html(player1.name);
    } else if (player2.winner === true) {
        $("#finish").addClass("screen-win-two");
        $(".message").html(player2.name);
    } else {
        $("#finish").addClass("screen-win-tie");
        $(".message").html("It's a Tie!");
    }
};

// Click handler for "Start game" button.
$(document).on("click", "#start .button", function() {
    newGame();
});

// Click handler for "New game" button.
$(document).on("click", "#finish .button", function() {
    newGame();
});




// Extra credit:
// Ask if playing computer and continue on as appropriate
// As for names of both players
// Start new game (initialize new "game" object?)
// Hide (and reset?) #finish div
// Show #board div







showStartScreen();

// })(jQuery);
