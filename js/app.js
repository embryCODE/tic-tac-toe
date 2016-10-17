(function($) {

    'use strict';

    /* Tic-Tac-Toe

    Author: Mason Embry
    Created 10/6/2016
    Last Updated: 10/11/2016

    Tested in current versions of Chrome, Safari, and Firefox.

    */



    var PLAYER_1;
    var PLAYER_2;
    var GAME_MODE;



    var PlayerConstructor = function(name) {
        this.name = name;
        this.winner = false;
        this.turn = false;
        this.computerPlayer = false;
        this.tie = false;
    };

    /* Add coordinates to board using row/column ids. */
    var addCoordinatesToBoard = function() {
        var grid = [11, 12, 13, 21, 22, 23, 31, 32, 33];
        for (var i = 0; i < 9; i++) {
            $('.box').slice(i).attr('id', grid[i]);
        }
    };

    /* Setup new players and set game mode. */
    var initializePlayers = function() {
        var p1Name = 'Player 1';
        var p2Name = 'Player 2';

        if ($('#name-p1').val()) {
            p1Name = $('#name-p1').val();
        }

        if ($('#name-p2').val()) {
            p2Name = $('#name-p2').val();
        }

        if ($('.player1-select').is(':checked')) {
            GAME_MODE = 0;
            p2Name = 'Bob the Computer';
            PLAYER_1 = new PlayerConstructor(p1Name);
            PLAYER_2 = new PlayerConstructor(p2Name);
            PLAYER_2.computerPlayer = true;
        } else {
            GAME_MODE = 1;
            PLAYER_1 = new PlayerConstructor(p1Name);
            PLAYER_2 = new PlayerConstructor(p2Name);
        }

        PLAYER_1.turn = true;
    };

    /* Create and show start screen. */
    var showStartScreen = function() {
        $('.screen-start').remove();
        $('#board').hide();

        var startDivContent = '<div class="screen screen-start" id="start">';
        startDivContent += '<header>';
        startDivContent += '<h1>Tic Tac Toe</h1>';
        startDivContent += '<form id="game-setup">';
        startDivContent += '<label class="form-instructions">Please select 1 or 2 player mode:</label>';
        startDivContent += '<input class="player-select player1-select" type="radio" name="game-mode" value="1 Player" checked>';
        startDivContent += '<label class="player-select-label">1 Player </label>';
        startDivContent += '<input class="player-select player2-select" type="radio" name="game-mode" value="2 Player">';
        startDivContent += '<label class="player-select-label player2-select-label">2 Players </label>';
        startDivContent += '<label class="form-instructions">Please enter a name for each player:</label>';
        startDivContent += '<input type="text" id="name-p1" name="name-p1" placeholder="Player 1">';
        startDivContent += '<input type="text" id="name-p2" name="name-p2" placeholder="Bob the Computer" disabled>';
        startDivContent += '<input type="submit" class="button" value="Start game">';
        startDivContent += '</form>';
        startDivContent += '</header>';
        startDivContent += '</div>';

        $('body').append(startDivContent);
    };

    /* Player select button UI handling */
    $('body').on('click', 'input[type="radio"]', function() {
        if ($(this).val() === '1 Player') {
            $('#name-p2').prop('placeholder', 'Bob the Computer');
            $('#name-p2').prop('disabled', true);
        } else if ($(this).val() === '2 Player') {
            $('#name-p2').prop('placeholder', 'Player 2');
            $('#name-p2').prop('disabled', false);
        }
    });

    /* Start a new game. Removes and shows UI elements. Initializes game and
    players. Adds player names. Advances to next player. */
    var newGame = function() {
        $('#finish').remove();
        $('.player-name').remove();
        $('.box').removeClass('box-filled-1');
        $('.box').removeClass('box-filled-2');

        $('#start').hide();
        $('#board').fadeIn(1000);

        initializePlayers();

        $('#player1').prepend('<h4 class="player-name player-name-1">' +
            PLAYER_1.name + '</h4>');
        $('#player2').prepend('<h4 class="player-name player-name-2">' +
            PLAYER_2.name + '</h4>');

    };

    /* Check current pattern for a winner,
    set .winner property on player (if there is one),
    and call gameOver(). */
    var checkForWinner = function() {
        var winner = aiWinnerCheck(); /* 'p1', 'p2', or 'tie' */

        if (winner === 'p1') {
            PLAYER_1.winner = true;
            setTimeout(gameOver, 1000);
        } else if (winner === 'p2') {
            PLAYER_2.winner = true;
            setTimeout(gameOver, 1000);
        } else if (winner === 'tie') {
            PLAYER_1.tie = true;
            PLAYER_2.tie = true;
            setTimeout(gameOver, 1000);
        }
    };

    /* Make a random move. No real AI. */
    var aiMove = function() {
        $('.box').each(function() {
            if ($(this).hasClass('box-filled-1') ||
                $(this).hasClass('box-filled-2')) {

                $(this).removeClass('empty');
            } else {
                $(this).addClass('empty');
            }
        });

        var numberOfEmptyBoxes = $('.empty').length;
        var random = Math.floor(Math.random() * numberOfEmptyBoxes);
        var randomEmptyBox = $('.empty').eq(random);

        fillBox(randomEmptyBox);
    };

    /* Check's each player's filled boxes against all possible winning
    combinations. Returns a winner flag. */
    var aiWinnerCheck = function() {
        var winnerFlag = '';

        /* List of all possible winning combinations. */
        var winningRows = [
            ['11', '12', '13'],
            ['21', '22', '23'],
            ['31', '32', '33'],
            ['11', '21', '31'],
            ['12', '22', '32'],
            ['13', '23', '33'],
            ['11', '22', '33'],
            ['31', '22', '13']
        ];

        var p1SelectedBoxes = [];
        var p2SelectedBoxes = [];

        /* Fill the above variables with selected boxes of each player. */
        $('.box').each(function() {
            if ($(this).hasClass('box-filled-1')) {
                p1SelectedBoxes.push($(this).attr('id'));
            } else if ($(this).hasClass('box-filled-2')) {
                p2SelectedBoxes.push($(this).attr('id'));
            }
        });

        /* Check p1SelectedBoxes against each item in winningRows array. */
        function checkPlayer1() {
            function p1Win(val) {
                return p1SelectedBoxes.indexOf(val) > -1;
            }
            for (var i = 0; i < 8; i++) {
                var foundMatch = winningRows[i].every(p1Win);
                if (foundMatch) {
                    winnerFlag = 'p1';
                }
            }
        }

        /* Check p2SelectedBoxes against each item in winningRows array. */
        function checkPlayer2() {
            function p2Win(val) {
                return p2SelectedBoxes.indexOf(val) > -1;
            }
            for (var i = 0; i < 8; i++) {
                var foundMatch = winningRows[i].every(p2Win);
                if (foundMatch) {
                    winnerFlag = 'p2';
                }
            }
        }

        /* Check for a tie. If all boxes are filled with no winner, it's a tie */
        function checkTie() {
            if ((p1SelectedBoxes.length + p2SelectedBoxes.length) === 9) {
                winnerFlag = 'tie';
            }
        }

        checkTie();
        checkPlayer1();
        checkPlayer2();

        return winnerFlag;
    };

    /* Fill a box by passing a jQuery object in as an argument. */
    var fillBox = function($boxToFill) {
        if (PLAYER_1.turn === true) {
            if (!$boxToFill.hasClass('box-filled-1') &&
                !$boxToFill.hasClass('box-filled-2')) {

                $boxToFill.addClass('box-filled-1');
                takeTurn();
            }
        } else if (PLAYER_2.turn === true)
            if (!$boxToFill.hasClass('box-filled-1') &&
                !$boxToFill.hasClass('box-filled-2')) {

                $boxToFill.addClass('box-filled-2');
                takeTurn();
            }
    };

    /* Toggle the .turn property on each player. Check for a winner.
    Move to next player. */
    var takeTurn = function() {
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

        checkForWinner();
        nextPlayer();
    };

    /* Hide #board div, show #finish div, and indicate winner. */
    var gameOver = function() {
        $('#board').hide();

        var finishDivContent = '<div class="screen screen-win" id="finish">';
        finishDivContent += '<header>';
        finishDivContent += '<h1>Tic Tac Toe</h1>';
        finishDivContent += '<p class="message"></p>';
        finishDivContent += '<a href="#" class="button">New game</a>';
        finishDivContent += '</header>';
        finishDivContent += '</div>';
        $('body').append(finishDivContent);

        /* Indicate winner by changing paragraph text
        and adding the correct class to the #finish div. */
        if (PLAYER_1.winner === true) {
            $('#finish').addClass('screen-win-one');
            $('.message').html(PLAYER_1.name + ' wins!');
        } else if (PLAYER_2.winner === true) {
            $('#finish').addClass('screen-win-two');
            $('.message').html(PLAYER_2.name + ' wins!');
        } else {
            $('#finish').addClass('screen-win-tie');
            $('.message').html("It's a Tie!");
        }

        /* Set active player back to player 1. */
        $('li').removeClass('active');
        $('#player1').addClass('active');
    };

    /* Change active player and make computer move if necessary. */
    var nextPlayer = function() {
        $('li').removeClass('active');

        if (PLAYER_1.turn === true) {
            $('#player1').addClass('active');
        } else if (PLAYER_2.turn === true) {
            $('#player2').addClass('active');
        }

        if (PLAYER_2.computerPlayer === true &&
            PLAYER_2.turn === true &&
            PLAYER_1.winner === false &&
            PLAYER_1.tie === false) {

            setTimeout(aiMove, 1000);
        }
    };

    /* Display appropriate symbol over box on hover. */
    $('.box').hover(function() {
        if (!$(this).hasClass('box-filled-1') &&
            !$(this).hasClass('box-filled-2')) {

            if (PLAYER_1.turn === true) {
                $(this).css('background-image', 'url(img/o.svg)');
            } else if (PLAYER_2.turn === true) {
                $(this).css('background-image', 'url(img/x.svg)');
            }
        }
    }, function() {
        $(this).css('background-image', '');
    });

    /* Click handler for 'Start game' button. */
    $(document).on('click', '#start .button', function(e) {
        e.preventDefault();
        newGame();
    });

    /* Click handler for boxes. */
    $('.box').click(function() {
        if (PLAYER_2.computerPlayer === true &&
            PLAYER_2.turn === true) {

        } else {
            fillBox($(this));
        }
    });

    /* Click handler for 'New game' button. */
    $(document).on('click', '#finish .button', function() {
        showStartScreen();
    });



    addCoordinatesToBoard();
    showStartScreen();

})(jQuery);
