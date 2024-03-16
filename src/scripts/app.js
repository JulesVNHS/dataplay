"use strict";

import {gsap} from "gsap";
console.log(gsap.version)

//courbe de bezier pour l'animation
const easeCustom = gsap.parseEase("cubic-bezier(0.36, 0, 0.66, -0.56)");

//Aller chercher la data du json

fetch("../assets/tab/data_cause_retard.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Initialiser le total des minutes de retard pour "Intrusion dans les voies"
    let totalMinutesIntrusion = 0;

    // Parcourir les données pour calculer le total des minutes de retard pour "Intrusion dans les voies"
    data.forEach(entry => {
      if (entry.incident === "Intrusion dans les voies") {
        totalMinutesIntrusion += entry.minutes_de_retard_total;
      }
    });

    // Afficher le total des minutes de retard pour "Intrusion dans les voies"
    console.log("Total des minutes de retard pour 'Intrusion dans les voies':", totalMinutesIntrusion);

    // Trouver le premier élément de la classe 'stats__el' dans le parent '.stats'
    const secondStatsEl = document.querySelectorAll('.stats__el')[1];

    // Calculer le nombre de "box2" à ajouter en fonction du total des minutes de retard
    const numberOfBoxes = Math.floor(totalMinutesIntrusion / 20000);

    // Ajouter les "box2" correspondantes pour chaque palier
    for (let i = 1; i <= numberOfBoxes; i++) {
      // Créer le nouvel élément li avec la classe 'stats__el'
      const newStatsEl = document.createElement('li');
      newStatsEl.classList.add('stats__el');

      // Créer la nouvelle boîte 'box2'
      const newBox2 = document.createElement('div');
      newBox2.classList.add('box2');

      // Ajouter le nouvel élément li avec la classe 'stats__el' et la nouvelle boîte 'box2' après le deuxième li
      secondStatsEl.insertAdjacentElement('afterend', newStatsEl);
      newStatsEl.appendChild(newBox2);
    }
  })
  .catch(function(err) {
    console.log(err);
  });



//animation des trains (test avec des boxs)
gsap.fromTo(".stats", 
  { x: "-150%" }, 
  { x: "100%", duration: 15, ease: easeCustom, repeat: -1 } 
);