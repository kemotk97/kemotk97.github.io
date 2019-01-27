var Game_Over = {

    preload : function() {
        // Załadowanie potrzebnych elementów
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {

        // Po kliknięciu uruchamia grę
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Wynik
        game.add.text(235, 450, "Wynik: ", { font: "bold 16px sans-serif", fill: "#ffffff", align: "center"});
        game.add.text(350, 452, score.toString(), { font: "bold 20px sans-serif", fill: "#397200", align: "center" });

    },

    startGame: function () {

        // Rozpoczęcie ponowne
        this.state.start('Game');

    }

};
