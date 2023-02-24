import Rushmore from "../Rushmore";

//DialogBox
import { eD as eleDOM } from '../eleDOM.js';
import EventBus from '../eventbus.js';

//Template class to extend from
import template1 from "./template1";
import { gsap } from 'gsap';

export default class fire_temp1 extends template1 {
    constructor() {
        super ();

        /*
            Ponemos el nombre del modulo
        */

        this.name = "fires";
        this.seccionPadre = "customers";
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

      this.titular_ = this.create (this.nameCont + " .titular_interior_temp1");
      this.description_ = this.create (this.nameCont + " .descripcion_interior_temp1");

      this.circulo_ = this.create (this.nameCont + " .circleIMG");
      this.circuloCont_ = this.create (this.nameCont + " .circleCONT");
      this.mascara_ = this.create (this.nameCont + " .mascara_circulo");
      
    }
    
}