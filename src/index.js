require("es6-symbol/implement");
import './style/main.scss';

//Para extender
import Rushmore from "./Rushmore";
import { gsap } from 'gsap';

//Eventos, CSS & Attr
//import { eBus as EventBus } from './eventbus.js';
import EventBus from './eventbus.js';
import DialogBox from './utils/DialogBox.js';

//Secciones
import loading from "./sections/loading";
import home from "./sections/home";

import { eD as eleDOM } from './eleDOM.js';

class index extends Rushmore { 

    constructor() {
      super ();

      window.addEventListener("beforeunload", function (event) {
        window.scrollTo(0, 0);
        event.preventDefault();
      });

      EventBus.on(EventBus.events.ENDLOADING, this.onEndLoading, this);

      /*
        Definicion de los elementos
      */
      this.createElements ();
      this.createEvents ();

      /* 
          Instancia del Loading 
      */
      this.loading_ = new loading ();
      this.loading_.init ();
      
      /* 
          Instacia Home
      */
      this.home_ = new home();

    }

    /*  Creacion de los elementos htmls a usar */
    createElements () {
      this.logo_ = this.create ("#logoVF");
    }

    createEvents () { 
      this.logo_.addEventListener ("click", ()=> { window.document.location.reload (); });
      this.addResizer (this.onresize, this);
     }

    onresize (f) {
      //console.log (this);
      //console.log ("Resizando main desde Rushmore Class");
    }

    onEndLoading () { 
      
    }

    goto (e,n_) {  }

}

let main_ = new index ();
