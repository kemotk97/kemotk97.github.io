var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var Game = {

    preload : function() {
        // Załadowanie potrzebnych elementów
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
    },

    create : function() {

        // Deklaracja zmiennych

        snake = [];                     
        apple = {};                     
        squareSize = 15;                
        score = 0;                      
        speed = 0;                      
        updateDelay = 0;                
        direction = 'right';            
        new_direction = null;           
        addNew = false;                 

        // Ustawienie klawiatury jako kontrolera
        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#9bc604';

        // Początkowa długość węża
        for(var i = 0; i < 5; i++){
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');  
        }


        // Generowanie pierwszego jabłka
        this.generateApple();

        // Tekst na górze ekranu
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#ffffff", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#ffffff", align: "center" };

        // Wynik
        game.add.text(30, 20, "WYNIK", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
        // Prędkość
        game.add.text(450, 20, "PRĘDKOŚĆ", textStyle_Key);
        speedTextValue = game.add.text(550, 18, speed.toString(), textStyle_Value);

    },

    update: function() {

        // Zmiana kierunku

        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }

        // Zwiększanie prędkości węża na podstawie punktów
        speed = Math.min(10, Math.floor(score/5));
        speedTextValue.text = '' + speed;
        
        updateDelay++;
        if (updateDelay % (10 - speed) == 0) {


            // Poruszanie się węża

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            // Po naciśnięciu klawisza wąż zmienia kierunek na odpowiedni
            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }


            // Zmiana lokalizacji ostatniej komórki węża w odniesieniu do głowy na podstawie kierunku
            if(direction == 'right'){

                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            // Przeniesienie ostatniej komórki na początek
            snake.push(lastCell);
            firstCell = lastCell;





            // Wydłużanie węża po zjedzeniu jabłka, dodanie kolejnej komórki węża na końcu
            // 
            if(addNew){
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            // Kolizja z jabłkiem
            this.appleCollision();

            // Kolizja z samym sobą
            this.selfCollision(firstCell);

            // Kolizja ze ścianą
            this.wallCollision(firstCell);
        }


    },

    generateApple: function(){

        // Generowanie jabłka w losowym miejscu planszy
        var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;

        apple = game.add.sprite(randomX, randomY, 'apple');
    },

    appleCollision: function() {

        // Kolizja z jabłkiem, sprawdzenie czy jabłko nie pojawiło się pod wężem
        for(var i = 0; i < snake.length; i++){
            if(snake[i].x == apple.x && snake[i].y == apple.y){

                // Przy kolejnym przesunięciu się węża dodajemy kolejną jego komórkę
                addNew = true;

                // Usunięcie zjedzonego jabłka
                apple.destroy();

                // Stworzenie nowego
                this.generateApple();

                // Zwiększenie punktów
                score++;

                // Odświeżenie tablicy wyników
                scoreTextValue.text = score.toString();

            }
        }

    },

    selfCollision: function(head) {

        // Sprawdzenie czy głowa węża nie nachodzi na jego resztę
        for(var i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){

                // Jeśli tak, gra się kończy
                game.state.start('Game_Over');
            }
        }

    },

    wallCollision: function(head) {

        // Sprawdzenie czy głowa węża znajduje się w polu gry (nie wychodzi poza ściany)

        if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){


            // Jeżeli dotknie ściany gra się kończy
            game.state.start('Game_Over');
        }

    }

};
