"use strict";

import {gsap} from "gsap";

/*recherches formulaire*/
function loadData(inputElementId, property, uniqueCities) {
    const inputElement = document.getElementById(inputElementId);
    const dataListId = inputElement.getAttribute('list');
    const dataList = document.getElementById(dataListId);

    inputElement.addEventListener('input', function() {
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