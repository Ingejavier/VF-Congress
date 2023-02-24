import Rushmore from "../Rushmore";

//DialogBox
import { eD as eleDOM } from '../eleDOM.js';
import EventBus from '../eventbus.js';

//Template class to extend from
import template3 from "./template3";
import { gsap } from 'gsap';

export default class solar_temp3 extends template3 {
    constructor() {
        super ();

        /*
            Ponemos el nombre del modulo
        */

        this.name = "solar";
        this.seccionPadre = "today";
        /* ******************************* */

        /*
                OBLIGATORIO
        */

        this.nameCont = "#" + this.name + "DIV";

        this.createElements = this.createElementsF;
        this.createElements ();
    }

    createElementsF () {
      this.contenido_ = this.create (this.nameCont);

      this.titular_ = this.create (this.nameCont + " .titular_interior_temp3");
      this.description_ = this.create (this.nameCont + " .descripcion_interior_temp3");

      this.carta1_ = this.create (this.nameCont + " .carta1");
      this.carta2_ = this.create (this.nameCont + " .carta2");
      this.carta3_ = this.create (this.nameCont + " .carta3");
      this.carta4_ = this.create (this.nameCont + " .carta4");

      this.configInteractive ();
    }
  
}