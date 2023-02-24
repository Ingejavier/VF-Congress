import Rushmore from "./Rushmore";
import EventBus from './eventbus.js';

export default class dataTreat {
    
    constructor() {
		EventBus.on(EventBus.events.ENDAPI, this.carGenerator, this);

		this.colorGroups = [
			{
			  name: "azul",
			  values : ["72300", "73400"],
			  count: 0
			},
			{
			  name: "blanco",
			  values : ["61400", "70700"],
			  count: 0
			},
			{
			  name: "gris",
			  values : ["73500", "73100", "72800", "73600", "71100", "72900", "72700"],
			  count: 0
			},
			{
			  name: "negro",
			  values : ["71700", "49200", "01900"],
			  count: 0
			},
			{
			  name: "rojo",
			  values : ["72500"],
			  count: 0
			},
			{
			  name: "Verde",
			  values : ["72400", "73300"],
			  count: 0
			}
		  ] ;

		this.allCars = new Array ();
	}

	getbyFilter (filter) {
		let findHere = this.allCars;
		let workCars = [];

		let buildFilter = (filter) => {
			let query = {};
			for (let keys in filter) {
				if (filter[keys].constructor === Array && filter[keys].length > 0) {
					query[keys] = filter[keys];
				}
			}
			return query;
		}		
		let filterData = (data, query) => {
			const filteredData = data.filter( (item) => {
				for (let key in query) {
					if (item[key] === undefined || !query[key].includes(item[key])) {
						return false;
					}
				}
				return true;
			});
			return filteredData;
		};

		const query = buildFilter(filter);
		workCars = filterData(findHere, query);
		
		/*const isEmpty = Object.keys(query).length === 0;
		if (!isEmpty) workCars = filterData(findHere, query);*/

		/*console.log ("Resultados");
		console.log (workCars);*/

		return workCars;
	}

	carGenerator (e, d_) {
		let contador = 0;
		for (const prop in d_) { 
			let o_ = {
				"id":  d_[prop].vehicle.id,
				"modelo": d_[prop].vehicle.model.description[0].text,
				"propulsion": d_[prop].vehicle.configuration.powerTrain.engine.fuelType,
				"potencia": d_[prop].vehicle.specification.technicalData.horsepowerTotal.exactValue.formatted,
				"asientos": d_[prop].vehicle.configuration.seats.numberOfSeats + String(" asientos.") ,
				"transmision": d_[prop].vehicle.configuration.powerTrain.driveTrain.gearbox.description[0].text,
				"precio":  d_[prop].vehicle.price.msrpAmount + String(" €"), 
				"color": this.askForColor (d_[prop].vehicle.configuration.color.code)
			}
			
			this.allCars.push(o_);
			contador++;
		}
    }

	askForColor (code) {
		let cName = "";
		for (const key in this.colorGroups) {
			if (Object.hasOwnProperty.call(this.colorGroups, key)) {
				const element = this.colorGroups[key];
				let v_ = element.values.findIndex(k => k== code);
				if (v_ > -1)  {
					cName = element.name;
					break;
				}
			}
		}
		return cName;
	}

	numberOf (a_, p_, v_) {
		//const filterValue = (obj, key, value)=> obj.find(v => v[key] === value);
		//return filterValue (a_,p_, v_);
		let counts = 0;
		for (let i=0;i<a_.length;i++) {
			if (a_[i][p_] == v_) counts++;
		}
		return counts;
	}
		
}

