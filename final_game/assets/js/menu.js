var Menu = {

    preload : function() {
        // Wczytaj wszystkie potrzebne elementy menu.
        game.load.image('menu', './assets/images/menu.png');
    },

    create: function () {

        // Ekran menu
        // Po przycisnieciu przycisku uruchamia grę
        this.add.button(0, 0, 'menu', this.startGame, this);

    },

    startGame: function () {

        // Rozpoczyna grę
        this.state.start('Game');

    }

};