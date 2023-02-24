// Today
import renewable_temp3 from './modules/renewable_temp3';
import solar_temp3 from './modules/solar_temp3';
import machine_temp4 from './modules/machine_temp4';
import low_temp1 from './modules/low_temp1';

//Customers
import fire_temp1 from './modules/fire_temp1';
import water_temp2 from './modules/water_temp2';
import urbangreen_temp2 from './modules/urbangreen_temp2';
import electriccars_temp1 from './modules/electriccars_temp1';
import fleet_temp2 from './modules/fleet_temp2';

//Tomorrow
import openran_temp3 from './modules/openran_temp3';
import bigdata_temp3 from './modules/bigdata_temp3';
import circular_temp3 from './modules/circular_temp3';
import fleettomorrow_temp2 from './modules/fleettomorrow_temp2';

const classes  = { 
    // Today
    renewable_temp3,
    solar_temp3,
    machine_temp4, 
    low_temp1,

    // Customers
    fire_temp1,
    electriccars_temp1,
    urbangreen_temp2,
    water_temp2,
    fleet_temp2,

    ///Tomorrow
    openran_temp3,
    bigdata_temp3,
    circular_temp3,
    fleettomorrow_temp2
};
 
export default function moduleClass (name) { return classes[name]; }
