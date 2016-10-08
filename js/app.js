(function($) {

    'use strict';

    ////////// Tic-Tac-Toe //////////
    //
    // Author: Mason Embry
    // Created 10/6/2016
    // Last Updated: 10/8/2016
    //
    // Tested in current versions of Chrome, Safari, and Firefox.
    //
    /////////////////////////////////



    // Create global variables.
    var PLAYER_1;
    var PLAYER_2;
    var GAME_MODE;



    // Constructor for new player.
    var PlayerConstructor = function(name) {
        this.name = name;
        this.winner = false;
        this.turn = false;
        this.computerPlayer = false;
    };

    // Add coordinates to board using row/column ids.
    var addCoordinatesToBoard = function() {
        var grid = [11, 12, 13, 21, 22, 23, 31, 32, 33];
        for (var i = 0; i < 9; i++) {
            $(".box").slice(i).attr("id", grid[i]);
        }
    };

    // Setup new players and set game mode.
    var initializePlayers = function() {
        // Ask if playing another person or a computer.
        // Store 0 (falsey) for two player game and 1 (truthy) for one player game.
        GAME_MODE = parseInt(prompt("Press \"1\" to play a friend or \"2\" to play the computer.") - 1);

        // Get names of players and create player objects.
        PLAYER_1 = new PlayerConstructor(prompt("What is player 1's name?"));
        // Only ask for player2's name if two player game.
        if (GAME_MODE === 0) {
            PLAYER_2 = new PlayerConstructor(prompt("What is player 2's name?"));
        } else if (GAME_MODE === 1) {
            // If 1 player game, PLAYER_2 is Bob the Computer.
            PLAYER_2 = new PlayerConstructor("Bob the Computer");
            PLAYER_2.computerPlayer = true;
        }

        // Set player 1 turn to true.
        PLAYER_1.turn = true;
    };

    // Create and show start screen.
    var showStartScreen = function() {
        // Hide entire #board div.
        $("#board").hide();

        // Create #start div and append it to body.
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
        // Remove previous player names.
        $(".player-name").remove();
        // Remove all previous checked boxes.
        $(".box").removeClass("box-filled-1");
        $(".box").removeClass("box-filled-2");

        // Hide start screen and show board.
        $("#start").hide();
        $("#board").show();

        // Initialize players and game mode.
        initializePlayers();

        // Display the correct names for each player.
        $("#player1").prepend('<h4 class="player-name player-name-1">' +
            PLAYER_1.name + '</h4>');
        $("#player2").prepend('<h4 class="player-name player-name-2">' +
            PLAYER_2.name + '</h4>');

        // Set the active player.
        nextPlayer();
    };

    // Check current pattern for a winner,
    // set .winner property on player (if there is one),
    // and call gameOver().
    var checkForWinner = function() {
        // Check all patterns and return the winner flag as a string.
        var winner = aiWinnerCheck(); // "p1", "p2", or "tie"

        // Set the winner flags and call gameOver().
        if (winner === "p1") {
            PLAYER_1.winner = true;
            gameOver();
        } else if (winner === "p2") {
            PLAYER_2.winner = true;
            gameOver();
        } else if (winner === "tie") {
            gameOver();
        }
    };

    // Make a random move. No real AI.
    var aiMove = function() {
        // Add .empty to empty boxes and remove .empty from filled boxes.
        $(".box").each(function() {
            if ($(this).hasClass("box-filled-1") ||
                $(this).hasClass("box-filled-2")) {

                $(this).removeClass("empty");
            } else {
                $(this).addClass("empty");
            }
        });

        // Get a random empty box.
        var numberOfEmptyBoxes = $(".empty").length;
        var random = Math.floor(Math.random() * numberOfEmptyBoxes);
        var randomEmptyBox = $(".empty").eq(random);

        // Fill the random empty box.
        fillBox(randomEmptyBox);
    };

    var aiWinnerCheck = function() {
        var winnerFlag = '';

        // List of all possible winning combinations.
        var winningRows = [
            ["11", "12", "13"],
            ["21", "22", "23"],
            ["31", "32", "33"],
            ["11", "21", "31"],
            ["12", "22", "32"],
            ["13", "23", "33"],
            ["11", "22", "33"],
            ["31", "22", "13"]
        ];

        var p1SelectedBoxes = [];
        var p2SelectedBoxes = [];

        // Fill the above variables with selected boxes of each player.
        $(".box").each(function() {
            if ($(this).hasClass("box-filled-1")) {
                p1SelectedBoxes.push($(this).attr('id'));
            } else if ($(this).hasClass("box-filled-2")) {
                p2SelectedBoxes.push($(this).attr('id'));
            }
        });

        // Check p1SelectedBoxes against each item in winningRows array.
        function checkPlayer1() {
            function p1Win(val) {
                return p1SelectedBoxes.indexOf(val) > -1;
            }
            for (var i = 0; i < 8; i++) {
                var foundMatch = winningRows[i].every(p1Win);
                if (foundMatch) {
                    winnerFlag = "p1";
                }
            }
        }

        // Check p2SelectedBoxes against each item in winningRows array.
        function checkPlayer2() {
            function p2Win(val) {
                return p2SelectedBoxes.indexOf(val) > -1;
            }
            for (var i = 0; i < 8; i++) {
                var foundMatch = winningRows[i].every(p2Win);
                if (foundMatch) {
                    winnerFlag = "p2";
                }
            }
        }

        // Check for a tie. If all boxes are filled with no winner, it's a tie.
        function checkTie() {
            if ((p1SelectedBoxes.length + p2SelectedBoxes.length) === 9) {
                winnerFlag = "tie";
            }
        }

        checkTie();
        checkPlayer1();
        checkPlayer2();

        return winnerFlag;
    };

    // Fill a box by passing a jQuery object in as an argument.
    var fillBox = function($boxToFill) {
        // Fill O's for PLAYER_1.
        if (PLAYER_1.turn === true) {
            // Only fill a box if it is not already filled.
            if (!$boxToFill.hasClass("box-filled-1") &&
                !$boxToFill.hasClass("box-filled-2")) {

                $boxToFill.addClass("box-filled-1");
                takeTurn();
            }
            // Fill X's for PLAYER_2.
        } else if (PLAYER_2.turn === true)
        // Only fill a box if it is not already filled.
            if (!$boxToFill.hasClass("box-filled-1") &&
            !$boxToFill.hasClass("box-filled-2")) {

            $boxToFill.addClass("box-filled-2");
            takeTurn();
        }
    };

    // Change active player and make computer move if necessary.
    var nextPlayer = function() {
        // First remove active class from all list items.
        $("li").removeClass("active");

        // Add active class to list item based on who's turn it is.
        if (PLAYER_1.turn === true) {
            $("#player1").addClass("active");
        } else if (PLAYER_2.turn === true) {
            $("#player2").addClass("active");
        }

        // Make computer move after 1 second if 1 player game.
        if (PLAYER_2.computerPlayer === true &&
            PLAYER_2.turn === true &&
            PLAYER_1.winner === false) {
            setTimeout(aiMove, 1000);
        }
    };

    // Toggle the .turn property on each player. Check for a winner.
    // Move to next player.
    var takeTurn = function() {
        // Toggle boolean of .turn property for each player.
        if (PLAYER_1.turn === true) {
            PLAYER_1.turn = false;
        } else {
            PLAYER_1.turn = true;
        }
        if (PLAYER_2.turn === true) {
            PLAYER_2.turn = false;
        } else {
            PLAYER_2.turn = true;
        }

        // At end of each turn, check for winner.
        checkForWinner();

        // At end of each turn, change the active player.
        nextPlayer();
    };

    // Hide #board div, show #finish div, and indicate winner.
    var gameOver = function() {
        // Hide #board div.
        $("#board").hide();

        // Create #finish div and append to body.
        var finishDivContent = '<div class="screen screen-win" id="finish">';
        finishDivContent += '<header>';
        finishDivContent += '<h1>Tic Tac Toe</h1>';
        finishDivContent += '<p class="message"></p>';
        finishDivContent += '<a href="#" class="button">New game</a>';
        finishDivContent += '</header>';
        finishDivContent += '</div>';
        $("body").append(finishDivContent);

        // Indicate winner by changing paragraph text
        // and adding the correct class to the #finish div.
        if (PLAYER_1.winner === true) {
            $("#finish").addClass("screen-win-one");
            $(".message").html(PLAYER_1.name + " wins!");
        } else if (PLAYER_2.winner === true) {
            $("#finish").addClass("screen-win-two");
            $(".message").html(PLAYER_2.name + " wins!");
        } else {
            $("#finish").addClass("screen-win-tie");
            $(".message").html("It's a Tie!");
        }
    };

    // Display appropriate symbol over box on hover.
    $(".box").hover(function() {
        // Hover effect only works if box isn't filled.
        if (!$(this).hasClass("box-filled-1") &&
            !$(this).hasClass("box-filled-2")) {

            // Fill X or O depending on who's turn it is.
            if (PLAYER_1.turn === true) {
                $(this).css('background-image', 'url(img/o.svg)');
            } else if (PLAYER_2.turn === true) {
                $(this).css('background-image', 'url(img/x.svg)');
            }
        }
    }, function() {
        $(this).css('background-image', '');
    });

    // Click handler for "Start game" button.
    $(document).on("click", "#start .button", function() {
        newGame();
    });

    // Click handler for boxes.
    $(".box").click(function() {
        // Disable clicking if it's the computer's turn.
        if (PLAYER_2.computerPlayer === true &&
            PLAYER_2.turn === true) {

        } else {
            // Pass in clicked item as jQuery object.
            fillBox($(this));
        }
    });

    // Click handler for "New game" button.
    $(document).on("click", "#finish .button", function() {
        newGame();
    });



    addCoordinatesToBoard();
    showStartScreen();

})(jQuery);
