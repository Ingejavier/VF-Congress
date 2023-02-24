import Rushmore from "../Rushmore";

//Tween GASP
import { gsap } from 'gsap';

//DialogBox, eleDom y EventBus
import { eD as eleDOM } from '../eleDOM.js';
import EventBus from '../eventbus.js';

export default class template2 extends Rushmore {
    constructor() {
        super ();

        this.name = "MODULE_NAME";
        this.nameCont = "MODULE_NAME_DIV";

        this.seccionPadre = "NONE";

        this.createElements = Function;

        this.titular_ = null;
        this.description_ = null;

        this.play_ = null;
      
        this.video_ = null;
        this.player_ = null;

        this.endedConfigured = false;
    }

    monta () {
      console.log ("Montamos la seccion " + this.name);

      const complete = () => { this.onEndMonta (); }

      eleDOM.show (this.contenido_);
      eleDOM.setStyles (this.contenido_, { opacity: 1 });

      gsap.to (this.titular_, { duration:1, opacity: 1 });
      gsap.to (this.description_, { delay:.4, duration:1, opacity: 1 });
      
      gsap.to (this.video_, { delay:.5, duration:1, opacity: 1, onComplete: complete });
    }

    desmonta () {
      console.log ("Desmontamos la seccion " + this.name);

      const complete = () => { 
        eleDOM.hide (this.contenido_);
        eleDOM.setStyles (this.contenido_, { opacity: 0 });
        this.onEndDesmonta (); 
        
        this.stopVideo ();
        eleDOM.show (this.play_);
      }

      gsap.to(this.video_, { duration: .8, opacity: 0, ease:"quad.inOut" });

      gsap.to (this.description_, { delay:.8, duration:.8, opacity: 0 });
      gsap.to (this.titular_, { delay: 1, duration:.8, opacity: 0, onComplete: complete });
    }

    configVideo () {
      if (!this.endedConfigured) {
        this.endedConfigured = true;
        this.player_.addEventListener('ended',() => {
          console.log ("Video seccion solar terminado");
          this.player_.currentTime = 0;
          eleDOM.show (this.play_);
        });
      }
    }

    stopVideo () {
      this.player_.currentTime = 0;
      this.player_.pause ();
    }

    playVideo () {
      this.player_.play ();
     
      this.player_.addEventListener ("play", ()=> {
          console.log ("play dado");
          this.player_.currentTime = 0;
          this.configVideo ();
          eleDOM.hide (this.play_);
      });
    }

    onEndMonta () {
      console.log ("Terminada de montar la subseccion " + this.name);
      EventBus.emit (EventBus.events.HIGTHMONTADO, this, this.seccionPadre); 
    }

    onEndDesmonta () {
      console.log ("Terminada de desmontar la subseccion " + this.name);
      EventBus.emit (EventBus.events.HIGTHDESMONTADO, this, this.seccionPadre); 
    }
}



