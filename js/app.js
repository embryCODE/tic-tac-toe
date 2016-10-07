/*globals $:false */

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

    var addCoordinatesToBoard = function() {
        var grid = [11, 12, 13, 21, 22, 23, 31, 32, 33];
        for (var i = 0; i < 9; i++) {
            $(".box").slice(i).attr("id", grid[i]);
        }
    };

    // Show start screen before first game.
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
        // Ask if playing another person or a computer.
        // Store 0 (falsey) for two player game and 1 (truthy) for one player game.
        GAME_MODE = parseInt(prompt("Press \"1\" to play a friend or \"2\" to play the computer.") - 1);

        // Get names of players and create player objects.
        PLAYER_1 = new PlayerConstructor(prompt("What is player 1's name?"));
        if (GAME_MODE === 0) {
            PLAYER_2 = new PlayerConstructor(prompt("What is player 2's name?"));
        } else if (GAME_MODE === 1) {
            PLAYER_2 = new PlayerConstructor("Bob the Computer");
            PLAYER_2.computerPlayer = true;
        }

        // Set player 1 turn to true.
        PLAYER_1.turn = true;

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

        // Display the correct names for each player.
        $("#player1").prepend('<h4 class="player-name player-name-1">' + PLAYER_1.name + '</h4>');
        $("#player2").prepend('<h4 class="player-name player-name-2">' + PLAYER_2.name + '</h4>');

        // Set the active player.
        nextPlayer();
    };

    // Display appropriate symbol over box on hover.
    $(".box").hover(function() {
        // Hover effect only works if box isn't filled.
        if (!$(this).hasClass("box-filled-1") && !$(this).hasClass("box-filled-2")) {
            if (PLAYER_1.turn === true) {
                $(this).css('background-image', 'url(img/o.svg)');
            } else if (PLAYER_2.turn === true) {
                $(this).css('background-image', 'url(img/x.svg)');
            }
        }
    }, function() {
        $(this).css('background-image', '');
    });

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
        if (PLAYER_2.computerPlayer === true && PLAYER_2.turn === true) {
            setTimeout(aiMove, 1000);
        }
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
        // Add .empty to empty boxes and remove it from filled boxes.
        $(".box").each(function() {
            if ($(this).hasClass("box-filled-1") || $(this).hasClass("box-filled-2")) {
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

        $(".box").each(function() {
            if ($(this).hasClass("box-filled-1")) {
                p1SelectedBoxes.push($(this).attr('id'));
            } else if ($(this).hasClass("box-filled-2")) {
                p2SelectedBoxes.push($(this).attr('id'));
            }
        });

        function checkPlayer1() {
            function p1Win(val) {
                return p1SelectedBoxes.indexOf(val) >= 0;
            }
            for (var i = 0; i < 8; i++) {
                var foundMatch = winningRows[i].every(p1Win);
                if (foundMatch) {
                    winnerFlag = "p1";
                }
            }
        }

        function checkPlayer2() {
            function p2Win(val) {
                return p2SelectedBoxes.indexOf(val) >= 0;
            }
            for (var i = 0; i < 8; i++) {
                var foundMatch = winningRows[i].every(p2Win);
                if (foundMatch) {
                    winnerFlag = "p2";
                }
            }
        }

        function checkTie() { //check if player one wins
            if (p2SelectedBoxes.length === 8) {
                winnerFlag = "tie";
            }
        }

        checkPlayer1();
        checkPlayer2();
        checkTie();

        return winnerFlag;
    };

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

        // Indicate winner by changing paragraph text and adding the correct class to the #finish div.
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

    var fillBox = function($boxToFill) {
        if (PLAYER_1.turn === true) {
            if (!$boxToFill.hasClass("box-filled-1") && !$boxToFill.hasClass("box-filled-2")) {
                $boxToFill.addClass("box-filled-1");
                takeTurn();
            }
        } else if (PLAYER_2.turn === true)
            if (!$boxToFill.hasClass("box-filled-1") && !$boxToFill.hasClass("box-filled-2")) {
                $boxToFill.addClass("box-filled-2");
                takeTurn();
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

    // Click handler for boxes.
    $(".box").click(function() {
        fillBox($(this));
    });


    addCoordinatesToBoard();
    showStartScreen();

})(jQuery);
