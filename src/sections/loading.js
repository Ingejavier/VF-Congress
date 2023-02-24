import IMGLoader from "../utils/IMGLoader";
import Rushmore from "../Rushmore";

import { gsap } from 'gsap';

//import { eBus, eBus as EventBus } from "../eventbus";
import EventBus from '../eventbus.js';
import { eD as eleDOM } from '../eleDOM.js';

import login from "../conexions/login";

export default class loading extends IMGLoader{
    constructor() {
        super ();

        EventBus.on(EventBus.events.LOGIN, this.jsonLoaded, this);

        this.login_ = new login ();
        this.rush_ = new Rushmore ();

        //Loading texto y la tapa del site
        this.tapa = null;
        this.loadDiv = null;

        this.pointTimes = 2;
        this.cleatInt = null;

        this.createElements ();

        this.adder ([
          {url: "img/color.jpg", bytes: 100000},
          {url: "img/BN.jpg", bytes: 145000}  
        ]);

        this.onload = function (c) {
            this.loadDiv.innerHTML = ("Cargado assets " + String(Math.ceil(c)) + "%");
        }.bind(this);

        this.onEndLoad = function () { this.call (); }.bind (this);
    }

    jsonLoaded () {
        gsap.to(this.tapa, {duration: 1, opacity:0, ease:"quad.out" });
        gsap.to(this.loadDiv ,{duration: 1, opacity:0, ease:"quad.out", onComplete: function () {
            eleDOM.hide (this.loadDiv);
            eleDOM.hide (this.tapa);

            this.onLogin ();
         }.bind (this)});
    }

    call () { this.login_.getJson (); }

    onLogin () { 
        clearInterval (this.cleatInt);
        EventBus.emit (EventBus.events.ENDLOADING); 
    }

    createElements () {
        this.tapa = this.rush_.create ("#tapa");
        this.loadDiv = this.rush_.create ("#loadDiv");
    }
}