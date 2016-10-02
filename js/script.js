

$(document).ready(function() {
	$('.modal-trigger').leanModal();
	$('#bntiniciar').click(function(event) {
		if (!swState) {
			swState = true;
			$('#idloading').removeClass('hide');
			$('#idsimulador').addClass('hide');
			getStarted();		
		}
	});

	$('#btnestadisticas').click(function(event) {
		agregarGraficos();
	});
});

var jsonData = "";
var swState = false;
var intervalTime = "";
var count = 0;
var countHombre = 0, 
	countMujer = 0, 
	countNinia = 0, 
	countAnciano = 0,
	countNinio = 0, 
	countParticular = 0, 
	countTaxi = 0, 
	countBicicleta = 0, 
	countMotocicleta = 0, 
	countPublico = 0, 
	countRepartidor = 0;

function getStarted() {
	getData($('#selectTimeStart').val(), $('#selectTimeEnd').val(), 
			$('#selectStreet').val(), $('#selectStreetA').val(), 
			$('#selectStreetB').val())
		.then(function(data) {
			hideshowelement();
			jsonData = data;
			addElement();
		})
}

function agregarGraficos() {
	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
		        labels: ["Hombre", "Mujer", "Ninia", "Anciano", "Ninio", "Particular","Bicicleta", 
		        			"Motocicleta", "Taxi", "Publico", "Repartidor"],
		        datasets: [{
		            label: '#',
		            data: [jsonData.hombre, jsonData.mujer, 
		            		jsonData.ninia, jsonData.anciano, 
		            		jsonData.ninio, jsonData.particular, 
		            		jsonData.bicicleta, jsonData.motocicleta, 
		            		jsonData.taxi, jsonData.publico, jsonData.repartidor],
		            backgroundColor: [
		                'rgba(63, 81, 181, 0.2)',
		                'rgba(156, 39, 176, 0.2)',
		                'rgba(244, 67, 54, 0.2)',
		                'rgba(158, 158, 158, 0.2)',
		                'rgba(62, 39, 35, 0.2)',
		                'rgba(0, 150, 136, 0.2)',
		                'rgba(255, 152, 0, 0.2)',
		                'rgba(205, 220, 57, 0.2)',
		                'rgba(3, 169, 244, 0.2)',
		                'rgba(0, 0, 0, 0.2)',
		                'rgba(96, 125, 139, 0.2)'
		            ],
		            borderColor: [
		                'rgba(63, 81, 181, 1)',
		                'rgba(156, 39, 176, 1)',
		                'rgba(244, 67, 54, 1)',
		                'rgba(158, 158, 158, 1)',
		                'rgba(62, 39, 35, 1)',
		                'rgba(0, 150, 136, 1)',
		                'rgba(255, 152, 0, 1)',
		                'rgba(205, 220, 57, 1)',
		                'rgba(3, 169, 244, 1)',
		                'rgba(0, 0, 0, 1)',
		                'rgba(96, 125, 139, 1)'
		            ],
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});
}

function hideshowelement() {
	$('#idsimulador').removeClass('hide');
	$('#idloading').addClass('hide');
}

function getData(hora_inicio, hora_fin, nombre_calle, laterala, lateralb) {
	var urlGet = "http://159.203.182.38/restfullv2/public/restPersonCar/";
	var params = hora_inicio + "/" + hora_fin + "/" + nombre_calle + "/" + laterala + "/" + lateralb;

	return $.ajax({
		url: urlGet+params,
		type: 'GET'
	})
}

function getSizeJson() {
	return 	jsonData.hombre + jsonData.mujer + 
			jsonData.ninia + jsonData.anciano + jsonData.ninio + 
			jsonData.particular + jsonData.taxi + 
			jsonData.bicicleta + jsonData.motocicleta + 
			jsonData.repartidor + jsonData.publico;
}

function initVariable() {
	count = 0; countHombre = 0; countMujer = 0; countNinia = 0; countAnciano = 0, countNinio = 0;
	countParticular = 0; countTaxi = 0; countMotocicleta = 0; countBicicleta = 0; countPublico = 0; countRepartidor = 0;
}

function addElement() {
	initVariable();
	var sizeJson = getSizeJson();

	intervalTime = setInterval(function() {

		if (count < sizeJson) {
			$('#idcalle').append(addElementsPeople('left', 'down') + addElementsPeople('right', 'up') + addElementsCars());
		} else {
			stopIntervalTime();
		}
		
	}, 500)
}

function addElementsCars() {
	var rectanguleCars = "";
	if (countParticular < jsonData.particular && ($('#particular').is(':checked') || $('#all').is(':checked'))) {
		count++;
		countParticular++;
		rectanguleCars += getElementCars('rectangule-particular', countParticular, 
										'#countParticular', 'animation-rectangule-left-particular');
	}

	if (countTaxi < jsonData.taxi && ($('#taxi').is(':checked') || $('#all').is(':checked'))) {
		count++;
		countTaxi++;
		rectanguleCars += getElementCars('rectangule-taxi', countTaxi, 
										'#countTaxi', 'animation-rectangule-left-taxi');
	}

	if (countBicicleta < jsonData.bicicleta && ($('#bicicleta').is(':checked') || $('#all').is(':checked'))) {
		count++;
		countBicicleta++;
		rectanguleCars += getElementCars('rectangule-bicicleta', countBicicleta, 
										'#countBicicleta', 'animation-rectangule-left-bicicleta');
	}

	if (countMotocicleta < jsonData.motocicleta && ($('#motocicleta').is(':checked') || $('#all').is(':checked'))) {
		count++;
		countMotocicleta++;
		rectanguleCars += getElementCars('rectangule-motocicleta', countMotocicleta, 
										'#countMotocicleta', 'animation-rectangule-left-motocicleta');
	}

	if (countPublico < jsonData.publico && ($('#publico').is(':checked') || $('#all').is(':checked'))) {
		count++;
		countPublico++;
		rectanguleCars += getElementCars('rectangule-publico', countPublico, 
										'#countPublico', 'animation-rectangule-left-publico');
	}

	if (countRepartidor < jsonData.repartidor && ($('#repartidor').is(':checked') || $('#all').is(':checked'))) {
		count++;
		countRepartidor++;
		rectanguleCars += getElementCars('rectangule-repartidor', countRepartidor, 
										'#countRepartidor', 'animation-rectangule-left-repartidor');
	}

	return rectanguleCars;
}

function getElementCars(type_rectangule, type_number, type_element, animation) {
	updateCount(type_element, type_number);
	if (count % 2 == 0) {
		return `<div class="position-absolute rectangule ${type_rectangule} ${animation} position-rectangule-up"></div>` 	
	}
	return `<div class="position-absolute rectangule ${type_rectangule} ${animation} position-rectangule-down"></div>` 	
}

function addElementsPeople(position, align) {
	var circlePeople = "";
	if (countHombre < jsonData.hombre && ($('#hombre').is(':checked') || $('#all').is(':checked'))) {
			count++;
			countHombre++;
			circlePeople += getElementPeople('circle-hombre', countHombre, '#countHombre', 
										'animation-circle-'+position+'-hombre', 'position-circle-'+align);
		}

		if (countMujer < jsonData.mujer && ($('#mujer').is(':checked') || $('#all').is(':checked'))) {
			count++;				
			countMujer++;
			circlePeople += getElementPeople('circle-mujer', countMujer, '#countMujer', 
										'animation-circle-'+position+'-mujer', 'position-circle-'+align);
		}

		if (countNinia < jsonData.ninia && ($('#ninia').is(':checked') || $('#all').is(':checked'))) {
			count++;
			countNinia++;
			circlePeople += getElementPeople('circle-ninia', countNinia, '#countNinia', 
										'animation-circle-'+position+'-ninia', 'position-circle-'+align);
		}

		if (countAnciano < jsonData.anciano && ($('#anciano').is(':checked') || $('#all').is(':checked'))) {
			count++;
			countAnciano++;
			circlePeople += getElementPeople('circle-anciano', countAnciano, '#countAnciano', 
										'animation-circle-'+position+'-anciano', 'position-circle-'+align);
		}

		if (countNinio < jsonData.ninio && ($('#ninio').is(':checked') || $('#all').is(':checked'))) {
			count++;
			countNinio++;
			circlePeople += getElementPeople('circle-ninio', countNinio, '#countNinio', 
										'animation-circle-'+position+'-ninio', 'position-circle-'+align);
		}

		return circlePeople;
}

function getElementPeople(type_circle, type_number, type_element, animation, position) {
	updateCount(type_element, type_number);
	return `<div class="position-absolute circle ${type_circle} ${animation} ${position}"></div>`
}

// function getElementPeople(type_circle, type_number, type_element, animation_left, animation_right) {
// 	updateCount(type_element, type_number);
// 	if (count % 2 == 0) {
// 		return `<div class="position-absolute circle ${type_circle} ${animation_left} position-circle-down"></div>`
// 	}
// 	return `<div class="position-absolute circle ${type_circle} ${animation_right} position-circle-up"></div>`
// }

function updateCount(type_element, type_number) {
	$(type_element).text(type_number)
	$('#idcantidad').text(count)
}


function stopIntervalTime() {
	swState = false;
	clearInterval(intervalTime);
}