var Game_Over = {

    preload : function() {
        // Załadowanie potrzebnych elementów
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {

        // Po kliknięciu uruchamia grę
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Wynik
        game.add.text(235, 400, "Wynik: ", { font: "bold 20px sans-serif", fill: "#ffffff", align: "center"});
        game.add.text(330, 400, score.toString(), { font: "bold 20px sans-serif", fill: "#072b00", align: "center" });

    },

    startGame: function () {

        // Rozpoczęcie ponowne
        this.state.start('Game');

    }

};
