import Rushmore from "../Rushmore";

//DialogBox
import { eD as eleDOM } from '../eleDOM.js';
import EventBus from '../eventbus.js';

//Template class to extend from
import template2 from "./template2";
import { gsap } from 'gsap';

export default class water_temp1 extends template2 {
    constructor() {
        super ();

        /*
            Ponemos el nombre del modulo
        */

        this.name = "water";
        this.seccionPadre = "customers";
        /* ******************************* */

        /*
                OBLIGATORIO
        */


        this.nameCont = "#" + this.name + "DIV";
        this.videoTAG = this.name + "_Video";

        this.createElements = this.createElementsF;
        this.createElements ();
    }

    createElementsF () {
      this.contenido_ = this.create (this.nameCont);

      this.titular_ = this.create (this.nameCont + " .titular_interior_temp2");
      this.description_ = this.create (this.nameCont + " .descripcion_interior_temp2");

      this.play_ = this.create(this.nameCont + " .play");
      this.play_.addEventListener ("click", ()=> { this.playVideo (); })

      this.video_ = this.create (this.nameCont + " .video");

      //this.player_ = document.getElementById(this.videoTAG);
      this.player_ = document.querySelector("#" + this.videoTAG);
    }
    
}