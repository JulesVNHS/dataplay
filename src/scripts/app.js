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
        xobj.onerror = function() {
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

    document.querySelector('.form-retard').addEventListener('submit', function(event) {
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

        loadJSON(function(error, response) {
            if (error) {
                console.error(error);
                return;
            }

            try {
                var jsonData = JSON.parse(response);
                var result = countMatchingElements(jsonData, departure, arrival);
                document.getElementById('averageDelay').textContent = convertSecondsToTime(result.averageDelay);

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
            timeString += hours + 'h ';
        }

        if (minutes > 0) {
            timeString += minutes + 'min ';
        }

        if (remainingSeconds > 0) {
            timeString += remainingSeconds + 's';
        }

        return timeString.trim();
    }


    /*validation form*/
    document.addEventListener('DOMContentLoaded', function() {
        var form = document.querySelector('.form-retard');
        var sectionResult = document.querySelector('.result');
    
        if (form && sectionResult) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                form.classList.add('form-retard--hide');
                
                sectionResult.classList.remove('result--hide');
            });
        } else {
            console.error("Les éléments .form-retard ou .result n'ont pas été trouvés.");
        }
    });