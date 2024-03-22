"use strict";

import { gsap } from "gsap";

/*recherches formulaire*/
function loadData(inputElementId, property, uniqueCities) {
    const inputElement = document.getElementById(inputElementId);
    const dataListId = inputElement.getAttribute('list');
    const dataList = document.getElementById(dataListId);

    inputElement.addEventListener('input', function () {
        const searchTerm = this.value.trim().toUpperCase();
        const filteredCities = uniqueCities.filter(city => city && city.toUpperCase().startsWith(searchTerm)).slice(0, 3);

        dataList.innerHTML = '';

        filteredCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            dataList.appendChild(option);
        });
    });
}

fetch('assets/data_duree_retard.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de chargement du fichier JSON');
        }
        return response.json();
    })
    .then(data => {
        const uniqueCitiesDeparture = [...new Set(data.map(item => item['zone_depart']))];
        const uniqueCitiesDestination = [...new Set(data.map(item => item['destination']))];

        loadData('form-retard__departure-input', 'zone_depart', uniqueCitiesDeparture);
        loadData('form-retard__arrival-input', 'destination', uniqueCitiesDestination);
    })
    .catch(error => console.error('Erreur lors du chargement du JSON :', error));

/*résultat*/
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'assets/data_duree_retard.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4) {
            if (xobj.status == 200) {
                callback(null, xobj.responseText);
            } else {
                callback(new Error('Error loading JSON: ' + xobj.statusText));
            }
        }
    };

    xobj.onerror = function () {
        callback(new Error('Network error occurred while loading JSON'));
    };
    xobj.send();
}

function countMatchingElements(data, departure, arrival) {
    var count = 0;
    var totalDelay = 0;

    var depToLower = departure.toLowerCase();
    var arrToLower = arrival.toLowerCase();

    for (var i = 0; i < data.length; i++) {
        if (data[i].zone_depart.toLowerCase() === depToLower && data[i].destination.toLowerCase() === arrToLower) {
            count++;
            totalDelay += data[i].retard_arr_sec;
        }
    }

    var averageDelay = count > 0 ? Math.round(totalDelay / count) : 0;

    return { averageDelay: averageDelay };
}

document.querySelector('.form-retard').addEventListener('submit', function (event) {
    event.preventDefault();
    var departureInput = document.getElementById("form-retard__departure-input");
    var arrivalInput = document.getElementById("form-retard__arrival-input");
    var frequencyInput = document.getElementById("form-retard__frequency-input");
    var departure = departureInput.value.trim();
    var arrival = arrivalInput.value.trim();
    var frequency = parseInt(frequencyInput.value.trim());
    if (!departure || !arrival) {
        console.error("Veuillez entrer à la fois une zone de départ et une destination.");
        return;
    }

    loadJSON(function (error, response) {
        if (error) {
            console.error(error);
            return;
        }
        try {
            var jsonData = JSON.parse(response);
            var result = countMatchingElements(jsonData, departure, arrival);
            document.getElementById('averageDelay').textContent = convertSecondsToTime(result.averageDelay);
            globalBillboardDelay = convertSecondsToMinutes(result.averageDelay);
            baseDelay = globalBillboardDelay;
            maxDelay = baseDelay;
            document.getElementById('delayBillboard').textContent = "+" + globalBillboardDelay + " '";
            var monthlyEstimation = Math.round(result.averageDelay * frequency * 4);
            var yearlyEstimation = Math.round(result.averageDelay * frequency * 52);
            document.getElementById('monthlyEstimation').textContent = convertSecondsToTime(monthlyEstimation);
            document.getElementById('yearlyEstimation').textContent = convertSecondsToTime(yearlyEstimation);
        } catch (parseError) {
            console.error("Erreur lors de l'analyse de la réponse JSON :", parseError);
        }
    });
});

function convertSecondsToTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    var timeString = '';
    if (hours > 0) {
        timeString += hours + ' h ';
    }
    if (minutes > 0) {
        timeString += minutes + ' min ';
    }
    if (remainingSeconds > 0) {
        timeString += remainingSeconds + ' s';
    }
    return timeString.trim();
}

function convertSecondsToMinutes(seconds) {
    var minutes = Math.ceil(seconds / 60);
    return minutes;
}

/*validation form*/
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.form-retard');
    var sectionResult = document.querySelector('.result');

    if (form && sectionResult) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            form.classList.add('form-retard--hide');

            sectionResult.classList.remove('result--hide');
        });
    } else {
        console.error("Les éléments .form-retard ou .result n'ont pas été trouvés.");
    }
});

/*vérification itinéraire*/
document.querySelectorAll('.form-retard__input').forEach(function (input) {
    input.addEventListener('change', function () {
        var departure = document.getElementById('form-retard__departure-input').value.toUpperCase();
        var arrival = document.getElementById('form-retard__arrival-input').value.toUpperCase();

        fetch('assets/data_duree_retard.json')
            .then(response => response.json())
            .then(data => {
                var trainExists = data.some(train => train.zone_depart.toUpperCase() === departure && train.destination.toUpperCase() === arrival);
                var submitButton = document.querySelector('.form-retard__submit');
                submitButton.disabled = !trainExists;

                var warningMessage = document.querySelector('.form-retard__warning-message');
                if (!trainExists) {
                    warningMessage.textContent = 'Aucun train avec cet itinéraire n\'existe.';
                } else {
                    warningMessage.textContent = '';
                }
            })
            .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
    });
});

/*afficher le snake*/
document.addEventListener("DOMContentLoaded", function () {
    const resultSection = document.querySelector('.result');
    const snakeSection = document.querySelector('.snake');
    const button = document.querySelector('.result__btn');

    button.addEventListener('click', function () {
        resultSection.classList.add('result--hide');
        snakeSection.classList.remove('snake--hide');
    });
});

/*Affichage heure*/
function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var timeString = hours + ':' + minutes;

    var billboardHourElement = document.querySelector('.snake__billboard-hour');
    if (billboardHourElement) {
        billboardHourElement.textContent = timeString;
    }
}

setInterval(updateTime, 60000);
updateTime();

/*snake*/
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var snake = {
    x: 192,
    y: 192,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4,
    headImg: new Image(),
    tailImg: new Image()
};
var posEmoji = {
    x: 0,
    y: 0
};
var emojiData;
var emojiImages = [];
var globalBillboardDelay;
var baseDelay;
var maxDelay;
var acceleration = 1;
var baseAcceleration = 1;
var delayBillboard = document.querySelector('#delayBillboard');
let timout;
let intrval;
delayBillboard.textContent = "+" + globalBillboardDelay + " '";
console.log("Max " + maxDelay + " minutes");
snake.headImg.src = 'assets/images/tete_gauche.svg';
snake.tailImg.src = 'assets/images/tete_snake.svg';
var emojiImg = new Image();
var initialEmojiPosition = getRandomPositionAwayFromSnake();
posEmoji.x = initialEmojiPosition.x;
posEmoji.y = initialEmojiPosition.y;
var snakeSpeed = 9;
var updateInterval = 1000 / snakeSpeed;
var lastUpdateTime = 0;
var gamePaused = true;
document.querySelector('.result__btn').addEventListener('click', startGame);
var retryButton = document.querySelector('.snake__btn');

function decrementAndLog() {
    if (globalBillboardDelay > 0) {
        globalBillboardDelay -= acceleration;
        acceleration += 1;
        delayBillboard.textContent = "+" + globalBillboardDelay + " '";
    } if (globalBillboardDelay <= 0) {
        resetGame();
        return;
    }
    timout = setTimeout(decrementAndLog, 7000);
    clearInterval(intrval);
    progress();
}

function progress() {
    const progressBar = document.getElementById('progressBar');

    let width = 0;

    const incrementWidth = 100 / (7 * 1000 / 50);

    const increaseWidth = () => {
        width += incrementWidth;

        progressBar.style.width = width + '%';

        if (width >= 100) {
            clearInterval(intrval);
        }
    };

    intrval = setInterval(increaseWidth, 50);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPositionAwayFromSnake() {
    var position = {
        x: getRandomInt(0, canvas.width / grid - 1) * grid,
        y: getRandomInt(0, canvas.height / grid - 1) * grid
    };
    for (var i = 0; i < snake.cells.length; i++) {
        if ((position.x === snake.cells[i].x && position.y === snake.cells[i].y) ||
            (position.x + 1 === snake.cells[i].x && position.y === snake.cells[i].y) ||
            (position.x === snake.cells[i].x && position.y + 1 === snake.cells[i].y) ||
            (position.x + 1 === snake.cells[i].x && position.y + 1 === snake.cells[i].y)) {
            return getRandomPositionAwayFromSnake();
        }
    }
    return position;
}

function loadEmojiImages() {
    fetch('assets/data_snake.json')
        .then(response => response.json())
        .then(data => {
            emojiData = data;
            emojiData.forEach(emoji => {
                var img = new Image();
                img.src = emoji.Image;
                emojiImages.push(img);
            });
            setRandomEmojiImage();
        })
        .catch(error => console.error('Erreur lors du chargement des données JSON :', error));
}

function setRandomEmojiImage() {
    var randomNumber = Math.random() * 100;

    var accumulatedPercentage = 0;
    for (var i = 0; i < emojiData.length; i++) {
        accumulatedPercentage += emojiData[i].Pourcentage;
        if (randomNumber <= accumulatedPercentage) {

            emojiImg = emojiImages[i];
            break;
        }
    }
}

function loop(timestamp) {
    if (!gamePaused) { // Exécutez le jeu seulement s'il n'est pas en pause
        requestAnimationFrame(loop);
        var deltaTime = timestamp - lastUpdateTime;
        if (deltaTime > updateInterval) {
            lastUpdateTime = timestamp - (deltaTime % updateInterval);
            context.clearRect(0, 0, canvas.width, canvas.height);
            snake.x += snake.dx;
            snake.y += snake.dy;
            if (snake.x < 0) {
                snake.x = canvas.width - grid;
            } else if (snake.x >= canvas.width) {
                snake.x = 0;
            }
            if (snake.y < 0) {
                snake.y = canvas.height - grid;
            } else if (snake.y >= canvas.height) {
                snake.y = 0;
            }
            snake.cells.unshift({ x: snake.x, y: snake.y });
            if (snake.cells.length > snake.maxCells) {
                snake.cells.pop();
            }
            context.drawImage(emojiImg, posEmoji.x, posEmoji.y, grid * 2, grid * 2);
            snake.cells.forEach(function (cell, index) {
                if (index === 0) {
                    context.drawImage(snake.headImg, cell.x, cell.y, grid, grid);
                } else if (index === snake.cells.length - 1) {
                    var nextCell = snake.cells[index - 1];
                    var dx = cell.x - nextCell.x;
                    var dy = cell.y - nextCell.y;
                    var angle = Math.atan2(dy, dx);
                    context.save();
                    context.translate(cell.x + grid / 2, cell.y + grid / 2);
                    context.rotate(angle);
                    context.drawImage(snake.tailImg, -grid / 2, -grid / 2, grid, grid);
                    context.restore();
                } else {
                    context.fillStyle = '#C6C6C6';
                    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
                }
                if (
                    snake.x < posEmoji.x + grid * 2 &&
                    posEmoji.x < snake.x + grid &&
                    snake.y < posEmoji.y + grid * 2 &&
                    posEmoji.y < snake.y + grid
                ) {
                    var emojiIndex = emojiImages.findIndex(img => img.src === emojiImg.src);
                    onEmojiEaten(emojiIndex);
                }
                for (var i = index + 1; i < snake.cells.length; i++) {
                    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                        resetGame();
                    }
                }
            });
        }
    }
}

function getExplanationForEmoji(emojiIndex) {
    if (emojiIndex !== -1) {
        var emojiExplanation = emojiData[emojiIndex].Explication;

        var eventParagraph = document.querySelector('.snake__event');
        var tempsEmoji = emojiData[emojiIndex].Temps;
        eventParagraph.textContent = "+" + tempsEmoji + " ' " + emojiExplanation;
    }
}

function calculateTotalDelay(emojiIndex) {
    if (emojiIndex !== -1) {
        var delay = emojiData[emojiIndex].Temps;
        globalBillboardDelay += delay;
        if (maxDelay < globalBillboardDelay) {
            maxDelay = globalBillboardDelay;
        }
        delayBillboard.textContent = "+" + globalBillboardDelay + " '";
        console.log("Max " + maxDelay + " minutes");
    }
}

function onEmojiEaten(emojiIndex) {
    snake.maxCells++;
    var newPosition = getRandomPositionAwayFromSnake();
    posEmoji.x = newPosition.x;
    posEmoji.y = newPosition.y;
    setRandomEmojiImage();
    getExplanationForEmoji(emojiIndex);
    calculateTotalDelay(emojiIndex);
}

retryButton.addEventListener('click', resumeGame);

function resumeGame() {
    resetGame();
    startGame();
    retryButton.classList.add('snake__btn--hide');
}

function pauseGame() {
    gamePaused = true;
    retryButton.classList.remove('snake__btn--hide');
}

function resetGame() {
    var eventParagraph = document.querySelector('.snake__event');
    eventParagraph.textContent = "Train en gare ! Retard max +"+ maxDelay + " '";
    pauseGame(); 
    clearTimeout(timout);
    clearInterval(intrval);
    globalBillboardDelay = baseDelay;
    maxDelay = baseDelay;
    acceleration = baseAcceleration;
    delayBillboard.textContent = "+" + globalBillboardDelay + " '";
    console.log("Max " + maxDelay + " minutes");
    snake.x = 192;
    snake.y = 192;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    var newPosition = getRandomPositionAwayFromSnake();
    posEmoji.x = newPosition.x;
    posEmoji.y = newPosition.y;
    snake.headImg.src = 'assets/images/tete_snake.svg';
}

function startGame() {
    if (gamePaused) {
        gamePaused = false;
        requestAnimationFrame(loop);
        setTimeout(decrementAndLog, 7000);
        progress();
        loadEmojiImages();
    }
}

let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', function (e) {
    const distX = e.changedTouches[0].clientX - startX;
    const distY = e.changedTouches[0].clientY - startY;

    if (Math.abs(distX) > Math.abs(distY)) {
        if (distX < 0 && snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
            snake.headImg.src = 'assets/images/tete_droite.svg';
        } else if (distX > 0 && snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
            snake.headImg.src = 'assets/images/tete_gauche.svg';
        }
    } else {
        if (distY < 0 && snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
            snake.headImg.src = 'assets/images/tete_haut.svg';
        } else if (distY > 0 && snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;
            snake.headImg.src = 'assets/images/tete_bas.svg';
        }
    }
});

document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
        snake.headImg.src = 'assets/images/tete_droite.svg';
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
        snake.headImg.src = 'assets/images/tete_haut.svg';
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
        snake.headImg.src = 'assets/images/tete_gauche.svg';
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
        snake.headImg.src = 'assets/images/tete_bas.svg';
    }
});

requestAnimationFrame(loop);