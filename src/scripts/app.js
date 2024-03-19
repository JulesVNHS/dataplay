"use strict";

import { gsap } from "gsap";
console.log(gsap.version);

// Courbe de bezier pour l'animation
const easeCustom = gsap.parseEase("cubic-bezier(0.36, 0, 0.66, -0.56)");

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
document.querySelector('#incident__nombres--perturbation').textContent = totalMinutesPerturbation + " minutes de retards";
document.querySelector('#incident__nombres--avarie').textContent = totalMinutesAvarie + " minutes de retards";
document.querySelector('#incident__nombres--travaux').textContent = totalMinutesTravaux + " minutes de retards";
document.querySelector('#incident__nombres--grèves').textContent = totalMinutesGrèves + " minutes de retards";
document.querySelector('#incident__nombres--météo').textContent = totalMinutesMétéo + " minutes de retards";
document.querySelector('#incident__nombres--déraillement').textContent = totalMinutesDéraillement + " minutes de retards";
document.querySelector('#incident__nombres--erreur').textContent = totalMinutesErreur + " minutes de retards";
document.querySelector('#incident__nombres--dérangement').textContent = totalMinutesDérangement + " minutes de retards";
document.querySelector('#incident__nombres--affluence').textContent = totalMinutesAffluence + " minutes de retards";
document.querySelector('#incident__nombres--personnel').textContent = totalMinutesPersonnel + " minutes de retards";
document.querySelector('#incident__nombres--covid').textContent = totalMinutesCovid + " minutes de retards";
document.querySelector('#incident__nombres--fourniture').textContent = totalMinutesFourniture + " minutes de retards";
document.querySelector('#incident__nombres--pb-voyageur').textContent = totalMinutesVoyageur + " minutes de retards";


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

    // Fonction pour créer et ajouter des éléments li avec des "box2" pour chaque catégorie
    const addBoxesToList = (list, minutes) => {

      /*
      <ul class="stats" id="">
        <li class="stats__el">
          <div class="box3"></div>
        </li>
        <li class="stats__el">
          <div class="box1"></div>
        </li>
      </ul>

      */
      let trainLength = 12; 
      let scale = 20000;
      let numberOfBoxes = minutes / scale;
      let numberOfTrains = Math.max(1, Math.ceil(numberOfBoxes / trainLength));
      let animationTrain = numberOfTrains*5;
   

      console.log(numberOfBoxes)
      console.log(numberOfTrains)
      for(let trainCounter = 0; trainCounter < numberOfTrains; trainCounter++){
        let trainList = document.createElement("ul");
        trainList.classList.add("stats");

        let firstWagon = document.createElement("li");
        firstWagon.classList.add("stats__el");
        firstWagon.innerHTML = '<div class="box3"></div>';
        trainList.appendChild(firstWagon);
        let numberOfWagons = 10;
        if(numberOfBoxes - trainLength * trainCounter < 10){
          numberOfWagons = numberOfBoxes - trainLength * trainCounter
        }

        for (let i = 1; i <= numberOfWagons; i++) {
          // Créer le nouvel élément li avec la classe 'stats__el'
          const newStatsEl = document.createElement('li');
          newStatsEl.classList.add('stats__el');
  
          // Créer la nouvelle boîte 'box2'
          const newBox2 = document.createElement('div');
          newBox2.classList.add('box2');
  
          // Ajouter le nouvel élément li avec la classe 'stats__el' et la nouvelle boîte 'box2' après le premier enfant de la liste
          trainList.appendChild(newStatsEl);
          newStatsEl.appendChild(newBox2);
        }

        let lastWagon = document.createElement("li");
        lastWagon.innerHTML = '<div class="box1"></div>';
        lastWagon.classList.add("stats__el");
        trainList.appendChild(lastWagon);
        list.appendChild(trainList);
      }

    };

    // Ajouter les "box2" correspondantes pour chaque catégorie
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

  
    gsap.fromTo(
      ".stats__animation",
      { x: "-150%" },
      { 
          x: "100%", 
          duration: 50, // Utilisation de numberOfTrains pour calculer la durée
          ease: "easeInOut", 
          repeat: -1 
      }
  );
  })
  .catch(function(err) {
    console.log(err);
  });




