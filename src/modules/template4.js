import Rushmore from "../Rushmore";

//Tween GASP
import { gsap } from 'gsap';

//DialogBox, eleDom y EventBus
import { eD as eleDOM } from '../eleDOM.js';
import EventBus from '../eventbus.js';

export default class template4 extends Rushmore {
    constructor() {
        super ();

        this.name = "MODULE_NAME";
        this.nameCont = "MODULE_NAME_DIV";

        this.seccionPadre = "NONE";

        this.createElements = Function;

        this.titular_ = null;
        this.description_ = null;

        this.efecto_ = null;

        this.step1_ = null;
        this.step2_ = null;
        this.step3_ = null;

        this.index = 103;
        this.blocked = true;
    }

    monta () {
      console.log ("Montamos la seccion " + this.name);

      const complete = () => { 
        this.onEndMonta (); 
        this.strEffect ();
      }

      this.resetEffect ();

      eleDOM.show (this.contenido_);
      eleDOM.setStyles (this.contenido_, { opacity: 1 });

      gsap.to (this.titular_, { duration:1, opacity: 1 });
      gsap.to (this.description_, { delay:.4, duration:1, opacity: 1 });

      gsap.to (this.efecto_, { delay:.6, duration:1, opacity: 1, ease:"back.out", onComplete: complete });
    }

    desmonta () {
      this.blocked = true;

      console.log ("Desmontamos la seccion " + this.name);

      const complete = () => { 
        eleDOM.hide (this.contenido_);
        eleDOM.setStyles (this.contenido_, { opacity: 0 });
        this.onEndDesmonta (); 
      }

      gsap.to (this.efecto_, { duration:1.5, opacity: 0, ease:"back.out" });

      gsap.to (this.description_, { delay:.4, duration:.8, opacity: 0 });
      gsap.to (this.titular_, { delay: .6, duration:.8, opacity: 0, onComplete: complete });
    }

    resetEffect () {
      eleDOM.setStyles (this.efecto_, { opacity: 0 });
      eleDOM.setStyles (this.step1_, { opacity: 1 });
      eleDOM.setStyles (this.step2_, { opacity: 0 });

      gsap.killTweensOf (this.step1_);
      gsap.killTweensOf (this.step2_);
    }

    strEffect () {
      this.stepOne ();
    }

    stepOne () {
      eleDOM.setStyles (this.step2_, { "z-index": this.index++ });
      console.log ("step 1")
      gsap.to (this.step1_, {  duration:2.8, opacity: 0 });
      gsap.to (this.step2_, {  duration:3, opacity: 1, onComplete:  ()=> { this.stepTwo(); } });
    }

    stepTwo () {
      eleDOM.setStyles (this.step1_, { "z-index": this.index++ });
      console.log ("step 2")
      gsap.to (this.step2_, {  duration:2.8, opacity: 0 });
      gsap.to (this.step1_, {  duration:3, opacity: 1, onComplete: ()=> { this.stepOne (); } });
    }

    onEndMonta () {
      this.blocked = false;
      console.log ("Terminada de montar la subseccion " + this.name);
      EventBus.emit (EventBus.events.HIGTHMONTADO, this, this.seccionPadre ); 
    }

    onEndDesmonta () {
      
      gsap.killTweensOf (this.step1_);
      gsap.killTweensOf (this.step2_);

      console.log ("Terminada de desmontar la subseccion " + this.name);
      EventBus.emit (EventBus.events.HIGTHDESMONTADO, this, this.seccionPadre); 
    }
}



