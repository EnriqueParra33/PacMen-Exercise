var pos = 0;
    const pacArray = [
        ['pacman1.png', 'pacman2.png'],
        ['pacman3.png', 'pacman4.png']
    ];
    const pacMen = []; // This array holds all the pacmen
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(500);
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        let newImgString = 'images/pacman1.png'
        newimg.src = newImgString;
        newimg.width = 100;
        //
        // set position here 
        //
        newimg.style.left = position.x;
        newimg.style.top = position.y;

        // add new Child image to game
        game.appendChild(newimg);
        // return details in an object
        let focus = 0;
        let direction = 0
        return {
            position,
            velocity,
            newimg,
            focus,
            direction
        }
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            checkCollisions(item)
            item.focus = (item.focus + 1) % 2;
            let newString = 'images/'+ pacArray[item.direction][item.focus];
            item.newimg.src = newString;
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;
        })
        setTimeout(update, 20);
    }

    function checkCollisions(item) {
        //
        // detect collision with all walls and make pacman bounce
        //
        if( item.position.x > pageWidth ) {
            item.velocity.x = item.velocity.x * -1
            item.direction = 1;
        }
        if( item.position.x < 0 ) {
            item.velocity.x = item.velocity.x * -1
            item.direction = 0;
        }
        if( item.position.y > pageHeight) {
            item.velocity.y = item.velocity.y * -1
        }
        if( item.position.y < 0 ) {
            item.velocity.y = item.velocity.y * -1
        }
    }

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
    }