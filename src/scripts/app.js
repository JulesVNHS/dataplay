"use strict";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
console.log(gsap.version);

//Sticky nav
let oldScrollY = 0;
let timer; // Variable pour stocker l'identifiant du timer

const menu = document.querySelector(".scrollnav__list");
window.addEventListener("scroll", scrollListener);

function scrollListener() {
    // Réinitialiser le timer à chaque fois que l'utilisateur fait défiler la page
    clearTimeout(timer);

    if (oldScrollY > window.scrollY || isBottomReached()) {
        menu.classList.remove("scrollnav--hide");
    } else {
        menu.classList.add("scrollnav--hide");
    }

    // Réinitialiser le timer pour supprimer la classe après 5 secondes
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



  