const gameContainer = document.getElementById("gameContainer");
const clearButton = document.getElementById("clearButton");

let sessionPrototype = {
    positions: [    [0,0,0], 
                    [0,0,0], 
                    [0,0,0] ],
    isRunning: true, // false when game is finished
    turn: true, // X if true, O if false
    end: function end() {
        this.isRunning = !this.isRunning;
    },
    changePosition: function changePosition(i, j, value){

    },
    changeTurn: function changeTurn() {
        this.turn = !this.turn;
    },
    checkForWin: function checkForWin() {
        let indice = [[0,0], [0,0], [0,0]];

        // test rows
        for (let i=0; i<3; i++) {
            let count = 0,
                sum = 0;

            for(let j=0; j<3; j++) {
                indice[count][0] = i;
                indice[count][1] = j;
                count++;

                sum += parseFloat(this.positions[i][j])
            }

            if (sum == 3 || sum == -3) {
                return indice;
            }
        }

        //test columns
        for (let i=0; i<3; i++) {
            let count = 0,
                sum = 0;

            for(let j=0; j<3; j++) {
                indice[count][0] = j;
                indice[count][1] = i;
                count++;

                sum += parseFloat(this.positions[j][i])
            }

            if (sum == 3 || sum == -3) {
                return indice;
            }
        }

        //test first diagonal
        let sum = 0;
        indice = [[0,0],[1,1],[2,2]];
        sum = this.positions[0][0] + this.positions[1][1] + this.positions[2][2];

        if (sum == 3 || sum == -3) {
            return indice;
        }

        // test second diagonal
        sum = 0;
        indice = [[2,0],[1,1],[0,2]];
        sum = this.positions[2][0] + this.positions[1][1] + this.positions[0][2];

        if (sum == 3 || sum == -3) {
            return indice;
        }
    }
}

function colorIcons (indice) {
    const first = document.getElementById("s" + indice[0][0] + indice[0][1]);
    const second = document.getElementById("s" + indice[1][0] + indice[1][1]);
    const third = document.getElementById("s" + indice[2][0] + indice[2][1]);
    
    first.children[0].style.color = "red";
    second.children[0].style.color = "red";
    third.children[0].style.color = "red";
}

let session = Object.create(sessionPrototype);

gameContainer.addEventListener("click", function(e) {
    if (session.isRunning) {
        let str,
        element = e.target,
        id = element.attributes.id.value;
        
        // this condition prevents clicking on the same square twice
        if (!element.children[0]) {
            if (session.turn) {
                str = `<i class="fas fa-times"></i>`;
                session.positions[parseFloat(id[1])][parseFloat(id[2])] = 1;
            } else {
                str = `<i class="far fa-circle"></i>`;
                session.positions[parseFloat(id[1])][parseFloat(id[2])] = -1;
            }
    
            element.insertAdjacentHTML("beforeend", str);
            session.changeTurn();
            let indice = session.checkForWin();
            if (indice) {
                session.end();
                colorIcons(indice);
            }
        }
    }
});

clearButton.addEventListener("click", function(e) {
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            gameContainer.children[i].children[j].innerHTML = "";
        }
    }
    session = Object.create(sessionPrototype);
    // overcoming delegate protype issue
    session.positions = [   [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0]];
});