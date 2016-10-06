(function($) {

    'use strict';

    ////////// Tic-Tac-Toe //////////
    //
    // Author: Mason Embry
    // Created 10/6/2016
    // Last Updated:
    //
    // Tested in current versions of Chrome, Safari, and Firefox.
    //
    /////////////////////////////////

var GameConstructor = function() {

};

// Hide entire #board div
// Create #start div and show it
    // <div class="screen screen-start" id="start">
    //   <header>
    //     <h1>Tic Tac Toe</h1>
    //     <a href="#" class="button">Start game</a>
    //   </header>
    // </div>
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


// When game ends
    // Hide #board div
    // Create and show #finish div
        // <div class="screen screen-win" id="finish">
        //   <header>
        //     <h1>Tic Tac Toe</h1>
        //     <p class="message"></p>
        //     <a href="#" class="button">New game</a>
        //   </header>
        // </div>
    // If player1 is winner
        // Show the word "Winner" and <div class="screen screen-win screen-win-one" id="finish">
    // If player2 is winner
        // Show the word "Winner" and <div class="screen screen-win screen-win-two" id="finish">
    // If it is a tie
        // Show the word "It's a Tie!" and <div class="screen screen-win screen-win-tie" id="finish">

// When player pushes the "New Game" button:
    // Extra credit:
        // Ask if playing computer and continue on as appropriate
        // As for names of both players
    // Start new game (initialize new "game" object?)
    // Hide (and reset?) #finish div
    // Show #board div











})(jQuery);
