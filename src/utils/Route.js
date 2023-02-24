import Rushmore from "../Rushmore";
import EventBus from '../eventbus.js';
import 'url-search-params-polyfill';

import { createBrowserHistory } from 'history';

const crossroads = require('crossroads');

export default class Route extends Rushmore {
    constructor() {
        super ();

        this.PATH = ""
        this.ORIGIN = "";
        
        this.routes_ = [];

        this.history_ = createBrowserHistory();   
        this.listen_ = Function;
        this.checkRoute = Function;

        this.actualFolfer = "";
        this.lastFolder = "";

        this.crossing = false;

        this.params = "";

        this.queue = [];
        this.pendding = false;

        EventBus.on(EventBus.events.CROSSING, ()=>{ this.stateChanger (true); } , this);
        EventBus.on(EventBus.events.CROSSED, ()=>{ this.stateChanger (false); }, this);
    }
    
    checkPath () {
        let act_Path = window.location.pathname;
        let our_Path = this.serverPath;
        let road_ = act_Path.slice (our_Path.length, act_Path.length);

        let par_ = window.location.search;

        if (par_) {
            this.params = new URLSearchParams(par_);
            //console.log (this.params.get ("coche"));
            console.log ("URL con parametros: " + this.params);
        } else {
            //console.log ("sin parametros");
        }
        return road_;
        //let d_ = getDifference ("http://eromhsurapps.com/test/Javi/ES6/minisite/", "https://eromhsurapps.com/test/Javi/ES6/minisite/home");
    }

    stateChanger (tf) {	this.crossing = tf;	}
}

function getDifference(a, b) {
    var i = 0;
    var j = 0;
    var st = "";
    var result = [];

    while (j < b.length) {
        if (a[i] != b[j] || i == a.length) st += b[j];
        else i++;
        j++;
    }
    return result;
}

