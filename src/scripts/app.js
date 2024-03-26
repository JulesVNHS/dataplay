"use strict";

import {  gsap  } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
console.log(gsap.version);
const bodyStats = document.querySelector(".body__stats")
if(bodyStats){
    document.addEventListener('DOMContentLoaded', function () {
        var ul = document.querySelectorAll(".incident__all-stats");
    
        ul.forEach(element => {
            element.firstElementChild.classList.add("active");
        });
    
        function next() {
            var liActive = document.querySelectorAll(".active");
            liActive.forEach(element => {
                var liNext = element.nextElementSibling;
                if (liNext) {
                    element.classList.remove("active");
                    liNext.classList.add("active");
                } else {
                    element.classList.remove("active");
                    element.parentElement.firstElementChild.classList.add("active");
                }
            });
        }
    
        // Déclencher la fonction next() avec un intervalle de 500 ms
        const intervalID = setInterval(next, 500);
    });
     
//Sticky nav
let oldScrollY = 0;
let timer; // Variable pour stocker l'identifiant du timer

const menu = document.querySelector(".scrollnav__list");
const menuDesktop = document.querySelector(".scrollnav__desktop-list");
window.addEventListener("scroll", scrollListener);

function scrollListener() {
    // Réinitialiser le timer à chaque fois que l'utilisateur fait défiler la page
    clearTimeout(timer);

    if (oldScrollY > window.scrollY || isBottomReached()) {
        menu.classList.remove("scrollnav--hide");
        menuDesktop.classList.remove("scrollnav__desktop--hide");
    } else {
        menu.classList.add("scrollnav--hide");
        menuDesktop.classList.add("scrollnav__desktop--hide");
    }


    timer = setTimeout(() => {
        menu.classList.remove("scrollnav--hide");
    }, 3000);

    oldScrollY = window.scrollY;
}


function isBottomReached() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

// Courbe de bezier pour l'animation
const easeCustom = gsap.parseEase("cubic-bezier(0.85, 0, 0.15, 1)");

// Aller chercher la data du json
fetch("../assets/tab/data_cause_retard.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Initialiser le total des minutes de retard pour "Intrusion dans les voies"
    let totalMinutesPerturbation = 0;
    let totalMinutesAvarie = 0;
    let totalMinutesTravaux = 0;
    let totalMinutesGrèves = 0;
    let totalMinutesMétéo = 0;
    let totalMinutesDéraillement = 0;
    let totalMinutesErreur = 0;
    let totalMinutesDérangement = 0;
    let totalMinutesAffluence = 0;
    let totalMinutesPersonnel = 0;
    let totalMinutesCovid = 0;
    let totalMinutesFourniture = 0;
    let totalMinutesVoyageur = 0;
    // Parcourir les données pour calculer le total des minutes de retard pour "Intrusion dans les voies"
    data.forEach(entry => {
      if (
        entry.incident === "Intrusion dans les voies" ||
        entry.incident === "Heurt d'une personne" ||
        entry.incident === "Incendie à proximité des voies" ||
        entry.incident === "Incendie dans les voies" ||
        entry.incident === "Incident pendant un chantier" ||
        entry.incident === "Accident à un passage à niveau" ||
        entry.incident === "Heurt d'animal" ||
        entry.incident === "Dérangement à un passage à niveau" ||
        entry.incident === "Obstacle dans/à proximité de la voie" ||
        entry.incident === "Corps dans les voies" ||
        entry.incident === "Dérangement à un aiguillage" ||
        entry.incident === "Dérangement à la signalisation"
      ) {
        totalMinutesPerturbation += entry.minutes_de_retard_total;
      } else if (
        entry.incident === "Avarie matériel roulant" ||
        entry.incident === "Avarie caténaire" ||
        entry.incident === "Avarie train à grande vitesse"
      ) {
        totalMinutesAvarie += entry.minutes_de_retard_total;
      } else if (
        entry.incident === "Terminaison tardive de travaux" ||
        entry.incident === "Travaux urgents"
      ) {
        totalMinutesTravaux += entry.minutes_de_retard_total;
      } else if (entry.incident === "Mouvement de grève") {
        totalMinutesGrèves += entry.minutes_de_retard_total;
      } else if (entry.incident === "Conditions météorologiques exceptionnelles") {
        totalMinutesMétéo += entry.minutes_de_retard_total;
      } else if (
        entry.incident === "Déraillement d'un train de marchandises" ||
        entry.incident === "Déraillement d'un train de voyageurs"
      ) {
        totalMinutesDéraillement += entry.minutes_de_retard_total;
      } else if (
        entry.incident === "Dépassement d'un signal rouge" ||
        entry.incident === "Erreur lors d'une manœuvre"
      ) {
        totalMinutesErreur += entry.minutes_de_retard_total;
      } else if (
        entry.incident === "Acte de malveillance" ||
        entry.incident === "Vol de câbles" ||
        entry.incident === "Alerte à la bombe" ||
        entry.incident === "Présence d'un colis suspect" ||
        entry.incident === "Dérangement informatique" ||
        entry.incident === "Dérangement à l'infrastructure"
      ) {
        totalMinutesDérangement += entry.minutes_de_retard_total;
      } else if (entry.incident === "Affluence de voyageurs") {
        totalMinutesAffluence += entry.minutes_de_retard_total;
      } else if (entry.incident === "Problème de personnel") {
        totalMinutesPersonnel += entry.minutes_de_retard_total;
      } else if (entry.incident === "Mesures COVID 19") {
        totalMinutesCovid += entry.minutes_de_retard_total;
      } else if (entry.incident === "Défaut de fourniture d'électricité par le gestionnaire de réseau") {
        totalMinutesFourniture += entry.minutes_de_retard_total;
      } else if (entry.incident === "Problème avec un voyageur") {
        totalMinutesVoyageur += entry.minutes_de_retard_total;
      }
    });

    // Afficher le total des minutes de retard pour "Intrusion dans les voies"
 // Mettre à jour le nombre de minutes de retards dans chaque catégorie
// Fonction pour formater un nombre avec un point entre chaque millier
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Utilisation de la fonction pour formater les nombres et les afficher avec les heures de retard
document.querySelector('#incident__nombres--perturbation').textContent = formatNumberWithCommas(Math.round(totalMinutesPerturbation / 60)) + " heures de retard";
document.querySelector('#incident__nombres--avarie').textContent = formatNumberWithCommas(Math.round(totalMinutesAvarie / 60)) + " heures de retard";
document.querySelector('#incident__nombres--travaux').textContent = formatNumberWithCommas(Math.round(totalMinutesTravaux / 60)) + " heures de retard";
document.querySelector('#incident__nombres--grèves').textContent = formatNumberWithCommas(Math.round(totalMinutesGrèves / 60)) + " heures de retard";
document.querySelector('#incident__nombres--météo').textContent = formatNumberWithCommas(Math.round(totalMinutesMétéo / 60)) + " heures de retard";
document.querySelector('#incident__nombres--déraillement').textContent = formatNumberWithCommas(Math.round(totalMinutesDéraillement / 60)) + " heures de retard";
document.querySelector('#incident__nombres--erreur').textContent = formatNumberWithCommas(Math.round(totalMinutesErreur / 60)) + " heures de retard";
document.querySelector('#incident__nombres--dérangement').textContent = formatNumberWithCommas(Math.round(totalMinutesDérangement / 60)) + " heures de retard";
document.querySelector('#incident__nombres--affluence').textContent = formatNumberWithCommas(Math.round(totalMinutesAffluence / 60)) + " heures de retard";
document.querySelector('#incident__nombres--personnel').textContent = formatNumberWithCommas(Math.round(totalMinutesPersonnel / 60)) + " heures de retard";
document.querySelector('#incident__nombres--covid').textContent = formatNumberWithCommas(Math.round(totalMinutesCovid / 60)) + " heures de retard";
document.querySelector('#incident__nombres--fourniture').textContent = formatNumberWithCommas(Math.round(totalMinutesFourniture / 60)) + " heures de retard";
document.querySelector('#incident__nombres--pb-voyageur').textContent = formatNumberWithCommas(Math.round(totalMinutesVoyageur / 60)) + " heures de retard";



    // Sélectionner les ul par leur ID et renommer les variables
    const statsListPerturbation = document.querySelector('#stats__perturbation-1');
    const statsListAvarie = document.querySelector('#stats__avarie-1');
    const statsListTravaux = document.querySelector('#stats__travaux-1');
    const statsListGrèves = document.querySelector('#stats__grèves-1');
    const statsListMétéo = document.querySelector('#stats__météo-1');
    const statsListDéraillement = document.querySelector('#stats__déraillement-1');
    const statsListErreur = document.querySelector('#stats__erreur-1');
    const statsListDérangement = document.querySelector('#stats__dérangement-1');
    const statsListAffluence = document.querySelector('#stats__affluence-1');
    const statsListPersonnel = document.querySelector('#stats__personnel-1');
    const statsListCovid = document.querySelector('#stats__covid-1');
    const statsListFourniture = document.querySelector('#stats__fourniture-1');
    const statsListVoyageur = document.querySelector('#stats__voyageur-1');

    // Trouver le premier enfant de chaque liste
    const firstChildPerturbation = statsListPerturbation.firstElementChild;
    const firstChildAvarie = statsListAvarie.firstElementChild;
    const firstChildTravaux = statsListTravaux.firstElementChild;
    const firstChildGrèves = statsListGrèves.firstElementChild;
    const firstChildMétéo = statsListMétéo.firstElementChild;
    const firstChildDéraillement = statsListDéraillement.firstElementChild;
    const firstChildErreur = statsListErreur.firstElementChild;
    const firstChildDérangement = statsListDérangement.firstElementChild;
    const firstChildAffluence = statsListAffluence.firstElementChild;
    const firstChildPersonnel = statsListPersonnel.firstElementChild;
    const firstChildCovid = statsListCovid.firstElementChild;
    const firstChildFourniture = statsListFourniture.firstElementChild;
    const firstChildVoyageur = statsListVoyageur.firstElementChild;

    // Fonction pour créer et ajouter des éléments li avec des "stats__wagon" pour chaque catégorie
    const addBoxesToList = (list, minutes) => {

      let trainLength = 12; 
      let scale = 20000;
      let numberOfBoxes = minutes / scale;
      let numberOfTrains = Math.max(1, Math.ceil(numberOfBoxes / trainLength));


      for(let trainCounter = 0; trainCounter < numberOfTrains; trainCounter++){
        let trainList = document.createElement("ul");
        trainList.classList.add("stats__list");
        trainList.classList.add("stats__list"+trainCounter);



        let firstWagon = document.createElement("li");
        firstWagon.classList.add("stats__el");
        firstWagon.innerHTML = '<div class="stats__arriere-train"></div>';
        trainList.appendChild(firstWagon);
        let numberOfWagons = 10;
        if(numberOfBoxes - trainLength * trainCounter < 10){
          numberOfWagons = Math.round(numberOfBoxes - trainLength * trainCounter)
        }
        let TrainWidth = 600+ Math.round(300 * numberOfWagons);
        console.log(TrainWidth)
        trainList.setAttribute("data-width", TrainWidth);
        
     
        for (let i = 1; i <= numberOfWagons; i++) {
          // Créer le nouvel élément li avec la classe 'stats__el'
          const newStatsEl = document.createElement('li');
          newStatsEl.classList.add('stats__el');
  
          // Créer la nouvelle boîte 'stats__wagon'
          const newstats__wagon = document.createElement('div');
          newstats__wagon.classList.add('stats__wagon');


          // Ajouter le nouvel élément li avec la classe 'stats__el' et la nouvelle boîte 'stats__wagon' après le premier enfant de la liste
          trainList.appendChild(newStatsEl);
          newStatsEl.appendChild(newstats__wagon);
        }

        let lastWagon = document.createElement("li");
        lastWagon.innerHTML = '<div class="stats__avant-train"></div>';
        lastWagon.classList.add("stats__el");
        trainList.appendChild(lastWagon);
        list.appendChild(trainList);
      }

    };

    // Ajouter les "stats__wagon" correspondantes pour chaque catégorie
    addBoxesToList(statsListPerturbation, Math.floor(totalMinutesPerturbation));

    addBoxesToList(statsListAvarie, Math.floor(totalMinutesAvarie),);
    addBoxesToList(statsListTravaux, Math.floor(totalMinutesTravaux), );
    addBoxesToList(statsListGrèves, Math.floor(totalMinutesGrèves),);
    addBoxesToList(statsListMétéo, Math.floor(totalMinutesMétéo),);
    addBoxesToList(statsListDéraillement, Math.floor(totalMinutesDéraillement),);
    addBoxesToList(statsListErreur, Math.floor(totalMinutesErreur),);
    addBoxesToList(statsListDérangement, Math.floor(totalMinutesDérangement),);
    addBoxesToList(statsListAffluence, Math.floor(totalMinutesAffluence),);
    addBoxesToList(statsListPersonnel, Math.floor(totalMinutesPersonnel),);
    addBoxesToList(statsListCovid, Math.floor(totalMinutesCovid),);
    addBoxesToList(statsListFourniture, Math.floor(totalMinutesFourniture),);
    addBoxesToList(statsListVoyageur, Math.floor(totalMinutesVoyageur),);
    

  const sections =gsap.utils.toArray(".stats")
  sections.forEach(function(section){
  const selector = gsap.utils.selector(section)
  const trains = selector(".stats__list")

  trains.forEach(function(trainItem){
    let nombreAleatoire = Math.floor(Math.random() * 5) + 1;
    const width =trainItem.getAttribute("data-width");
    gsap.fromTo(
      trainItem,
      { x: -width },
      { 
          x: "100vw", 
          duration: 7, 
          ease: "linear", 
          repeat: -1, 
          delay: nombreAleatoire,
          scrollTrigger:{
            trigger: section,
            start: "top bottom"
          }
      }
  );
  })

    })

  })
 


  .catch(function(err) {
    console.log(err);
  });
}

const bodyAccueil = document.querySelector(".body__accueil")
const bodyAccueilNuit = document.querySelector(".body__accueil--nuit")


if(bodyAccueil || bodyAccueilNuit){

    var maintenant = new Date();
    var heure = maintenant.getHours();
    var conteneur = document.querySelector(".body__accueil");

    
    if (heure >= 16 || heure < 7) {
        conteneur.classList.add("body__accueil--nuit");
        conteneur.classList.remove("body__accueil--jour");
    } else {
        conteneur.classList.remove("body__accueil--nuit");
        conteneur.classList.add("body__accueil--jour");
    }
    
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
            delayBillboard.textContent = "+" + globalBillboardDelay + " '";
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
        if (typeof baseDelay !== 'undefined') {
            resultSection.classList.add('result--hide');
            snakeSection.classList.remove('snake--hide');
            startGame();
        } else {
            console.error('La variable baseDelay n\'est pas définie.');
        }
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
const overlay = document.getElementById('overlay');
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
var delayBillboard = document.getElementById('delayBillboard');
let timout;
let intrval;
delayBillboard.textContent = "+" + globalBillboardDelay + " '";
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
var retryButton = document.querySelector('.snake__btn');
var eventParagraph = document.querySelector('.snake__event');

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
        x: getRandomInt(1, canvas.width / grid - 2) * grid,
        y: getRandomInt(1, canvas.height / grid - 2) * grid
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
    if (!gamePaused) {
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
    eventParagraph.textContent = "Le train est en route !";
}

function pauseGame() {
    overlay.style.display = 'block';
    gamePaused = true;
    retryButton.classList.remove('snake__btn--hide');
}

function resetGame() {
    eventParagraph.textContent = "Train en gare ! Retard max +"+ maxDelay + " '";
    pauseGame();
    clearTimeout(timout);
    clearInterval(intrval);
    globalBillboardDelay = baseDelay;
    maxDelay = baseDelay;
    acceleration = baseAcceleration;
    delayBillboard.textContent = "+" + globalBillboardDelay + " '";
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
        overlay.style.display = 'none';
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

requestAnimationFrame(loop);}