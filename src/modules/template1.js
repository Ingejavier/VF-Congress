import Rushmore from "../Rushmore";

//Tween GASP
import { gsap } from 'gsap';

//DialogBox, eleDom y EventBus
import { eD as eleDOM } from '../eleDOM.js';
import EventBus from '../eventbus.js';

export default class template1 extends Rushmore {
    constructor() {
        super ();

        this.name = "MODULE_NAME";
        this.nameCont = "MODULE_NAME_DIV";

        this.seccionPadre = "NONE";

        this.createElements = Function;

        this.titular_ = null;
        this.description_ = null;

        this.circulo_ = null;
        this.circuloCont_ = null;
        this.mascara_ = null;
    }

    monta () {
      console.log ("Montamos la seccion " + this.name);

      const complete = () => { this.onEndMonta (); }

      eleDOM.show (this.contenido_);
      eleDOM.setStyles (this.contenido_, { opacity: 1 });

      gsap.to (this.titular_, { duration:1, opacity: 1 });
      gsap.to (this.description_, { delay:.4, duration:1, opacity: 1 });

      gsap.set (this.circulo_, { rotation: 45 });
      gsap.to (this.circulo_, { delay:1, duration:1, scale: 1, rotation: 360, ease:"back.out" });
      
      gsap.set (this.circuloCont_, { rotation: 370 });
      gsap.to (this.circuloCont_, { delay:1.8, duration:1, scale: 1, opacity:1, rotation: 360, ease:"back.out", onComplete: complete });
      
      gsap.to(this.mascara_, { delay: 2.5, duration: 1, clipPath: 'circle(50%)', ease:"quad.inOut" });
    }

    desmonta () {
      console.log ("Desmontamos la seccion " + this.name);

      const complete = () => { 
        eleDOM.hide (this.contenido_);
        eleDOM.setStyles (this.contenido_, { opacity: 0 });
        this.onEndDesmonta (); 
      }

      gsap.to(this.mascara_, { duration: .8, clipPath: 'circle(0%)', ease:"quad.inOut" });
      
      gsap.to (this.circuloCont_, { delay:.5, duration:1, scale: .9, opacity:0, rotation: 370, ease:"back.in" });
      gsap.to (this.circulo_, { delay:1.2, duration:1, scale: 0, rotation: 45, ease:"back.in" });

      gsap.to (this.description_, { delay:1.4, duration:.8, opacity: 0 });
      gsap.to (this.titular_, { delay: 1.6, duration:.8, opacity: 0, onComplete: complete });
    }

    onEndMonta () {
      console.log ("Terminada de montar la subseccion " + this.name);
      EventBus.emit (EventBus.events.HIGTHMONTADO, this, this.seccionPadre ); 
    }

    onEndDesmonta () {
      console.log ("Terminada de desmontar la subseccion " + this.name);
      EventBus.emit (EventBus.events.HIGTHDESMONTADO, this, this.seccionPadre); 
    }
}



