import Rushmore from "../Rushmore";

//DialogBox
import { eD as eleDOM } from '../eleDOM.js';
import EventBus from '../eventbus.js';

//Template class to extend from
import template4 from "./template4";
import { gsap } from 'gsap';

export default class machine_temp4 extends template4 {
    constructor() {
        super ();

        /*
            Ponemos el nombre del modulo
        */

        this.name = "machine";
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

      this.titular_ = this.create (this.nameCont + " .titular_interior_temp4");
      this.description_ = this.create (this.nameCont + " .descripcion_interior_temp4");

      this.efecto_ = this.create (this.nameCont + " #efecto");
      
      this.step1_ = this.create (this.nameCont + " #step1");
      this.step2_ = this.create (this.nameCont + " #step2");
    }
  
}