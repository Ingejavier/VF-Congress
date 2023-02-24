import Rushmore from "../Rushmore";
import { eD as eleDOM } from '../eleDOM.js';

import displace from 'displacejs';
import Regla from "./Regla";

import { gsap } from 'gsap';

export default class appleButton extends Rushmore {

    constructor(ft_, funct_, value_, onO_, onC_) {
      super ();

      this.father = ft_;
      this.orientacion = "horizontal";
      this.callback = funct_;
      this.retorno = value_;

      this.onO = onO_;
      this.onC = onC_;

      this.movingAlone = false;
      this.opened = false;

      this.createElements ();

      this.dragBar ();
    }

      /*  Creacion de los elementos htmls a usar */
    createElements () { 
      this.dragdrop = this.create ("#" + this.father + " .dragdropSCR");
      this.bounds = this.create ("#" + this.father + " .boundsSCR");     
    }

    dragBar () {
      if (this.orientacion == "horizontal") {
        this.longitud = parseInt(eleDOM.getStyle (this.bounds, "width")) - parseInt(eleDOM.getStyle (this.dragdrop, "width"));
      } else  {
          if (this.orientacion == "vertical") {
            this.longitud = parseInt(eleDOM.getStyle (this.bounds, "height")) - parseInt(eleDOM.getStyle (this.dragdrop, "height"));
          }
      }
      //Regla DragBar
      this.rscr = new Regla (0,this.longitud, this.retorno);
    
      this.options = {
        constrain: true,
        relativeTo: this.bounds,
    
        onMouseDown: this.strSCR.bind(this),
        onMouseUp: this.stpSCR.bind(this),
        onMouseMove: this.moveSCR.bind(this),
        onTouchMove:this.moveSCR.bind(this)
      };
    
      this.drdisplace = displace(this.dragdrop, this.options);

      const target_ = this;
      this.bounds.addEventListener ("click", function (e)  { if(e.target != this) return; target_.checkStatus (); });
    }

    newDataRule (v_) {
      this.retorno = v_;
      this.rscr.newData (0, this.longitud, this.retorno );
    }
    
    strSCR () {
      if (this.movingAlone) {
        gsap.killTweensOf (this.dragdrop);
      }
    }

    stpSCR () {
      this.checkMiddle ();
    }

    checkMiddle () {
      this.movingAlone = true;

      const pl_ = parseInt(eleDOM.getStyle (this.dragdrop, "left"));
      const passed = (pl_ > this.longitud/2);

      const complete = ()=> {  
        this.movingAlone = false;
        this.endAction ();
      };
      const update = ()=> {  this.moveSCR (); };
      
      if (passed) {
        this.opened = true;
        gsap.to(this.dragdrop, {duration: .3, left: this.longitud, ease:"quad.out", onUpdate: update ,onComplete: complete });
      } else    {
        this.opened = false;
        gsap.to(this.dragdrop, {duration: .3, left: 0, ease:"quad.out", onUpdate: update, onComplete: complete });
      }
    }

    moveSCR () {
      let offset = (this.orientacion == "horizontal")?this.dragdrop.offsetLeft:this.dragdrop.offsetTop;
      this.value = (this.rscr.get_hallar (offset));
      this.callback (this.value);
    }

    checkStatus () {
      const complete = ()=> {  
        this.movingAlone = false; 
        this.endAction ();
      };
      const update = ()=> {  this.moveSCR (); };
      
      this.movingAlone = true;

      if (!this.opened) {
        this.opened = true;
        gsap.to(this.dragdrop, {duration: .3, left: this.longitud, ease:"quad.out", onUpdate: update ,onComplete: complete });
      } else {
        this.opened = false;
        gsap.to(this.dragdrop, {duration: .3, left: 0, ease:"quad.out", onUpdate: update, onComplete: complete });
      }
    }

    endAction () {
      if (!this.opened) {
        this.onO ();
      } else {
        this.onC ();
      } 
    }
}

