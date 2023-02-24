import Rushmore from "../Rushmore";

//Tween GASP
import { gsap } from 'gsap';

//DialogBox, eleDom y EventBus
import { eD as eleDOM } from '../eleDOM.js';
import EventBus from '../eventbus.js';

export default class template3 extends Rushmore {
    constructor() {
        super ();

        this.name = "MODULE_NAME";
        this.nameCont = "MODULE_NAME_DIV";

        this.seccionPadre = "NONE";

        this.createElements = Function;

        this.titular_ = null;
        this.description_ = null;

       this.carta1_ = null;
       this.carta2_ = null;
       this.carta3_ = null;
       this.carta4_ = null;

       this.index = 105;
       this.blocked = true;
    }

    monta () {
      console.log ("Montamos la seccion " + this.name);

      const complete = () => { 
        this.onEndMonta (); 
        this.savaInitialTransforms ();
      }

      eleDOM.show (this.contenido_);
      eleDOM.setStyles (this.contenido_, { opacity: 1 });

      gsap.to (this.titular_, { duration:1, opacity: 1 });
      gsap.to (this.description_, { delay:.4, duration:1, opacity: 1 });

      gsap.set (this.carta1_, { rotate:360 });
      gsap.set (this.carta2_, { rotate:0 });
      gsap.set (this.carta3_, { rotate:0 });
      gsap.set (this.carta4_, { rotate:0 });

      gsap.to (this.carta1_, { delay:1,   duration:1, opacity: 1, x: 220+(-100+Math.random()*100) , y: 180+(-80+Math.random()*80), rotate:355, scale: .9, ease:"back.out" });
      gsap.to (this.carta2_, { delay:1.2, duration:1, opacity: 1, x: 220+(-10+Math.random()*100) , y: 180+(-80+Math.random()*80), rotate:3, scale: .9, ease:"back.out" });
      gsap.to (this.carta3_, { delay:1.4, duration:1, opacity: 1, x: 220+(100+Math.random()*100) , y: 180+(-80+Math.random()*80), rotate:15, scale: .9, ease:"back.out" });
      gsap.to (this.carta4_, { delay:1.6, duration:1, opacity: 1, x: 220+(-100+Math.random()*100) , y: 180+(-80+Math.random()*80), rotate:9, scale: .9, ease:"back.out", onComplete: complete });
    }

    desmonta () {
      this.blocked = true;

      console.log ("Desmontamos la seccion " + this.name);

      const complete = () => { 
        eleDOM.hide (this.contenido_);
        eleDOM.setStyles (this.contenido_, { opacity: 0 });
        this.onEndDesmonta (); 
      }

      gsap.to (this.carta4_, { delay:0, duration:1, opacity: 0, x: 600, y: -1000, rotate:180, ease:"quad.in" });
      gsap.to (this.carta3_, { delay:.2, duration:1, opacity: 0, x: 600, y: -400, rotate:180, ease:"quad.in" });
      gsap.to (this.carta2_, { delay:.4, duration:1, opacity: 0, x: 600, y: 400, rotate:180, ease:"quad.in" });
      gsap.to (this.carta1_, { delay:.6, duration:1, opacity: 0, x: 600, y: 1000, rotate:180, ease:"quad.in" });

      gsap.to (this.description_, { delay:1.4, duration:.8, opacity: 0 });
      gsap.to (this.titular_, { delay: 1.6, duration:.8, opacity: 0, onComplete: complete });
    }

    configInteractive () {
      this.carta1_.addEventListener ("click", (e)=> { this.moveCard (e.currentTarget, 1); });
      this.carta2_.addEventListener ("click", (e)=> { this.moveCard (e.currentTarget, 2); });
      this.carta3_.addEventListener ("click", (e)=> { this.moveCard (e.currentTarget, 3); });
      this.carta4_.addEventListener ("click", (e)=> { this.moveCard (e.currentTarget, 4); });
    }

    moveCard (obj, n_) {
      if (this.blocked) return;
        let o_ = obj;
        const dataTrans = this.savedTrans [n_-1];

        let rot_ = 0;
        if (dataTrans.rot+40 > 360) {
            rot_ = dataTrans.rot-40;
        } else {
           if (dataTrans.rot-40 < 0) {
             rot_ = dataTrans.rot+40;
           }
        }

        console.log (dataTrans.rot+40)
        console.log (dataTrans.rot)

        let complete = ()=> {
            eleDOM.setStyles (o_, { "z-index": this.index++ });
            gsap.to (o_, { duration:.4, x: dataTrans.x , rotation: dataTrans.rot,  ease:"quad.in", onComplete: ()=> { this.endedMovement (); } });
        }

        gsap.to (obj, { duration:.4, x: -600, rotation: rot_ , ease:"quad.out", onComplete: complete });
    }

    savaInitialTransforms () {
      this.savedTrans = [];
      for (let x=0; x<4; x++) {
        let ob_ = this["carta" + (x+1) + "_"];
        this.savedTrans[x] = this.getTransforms (ob_);
      }
      console.log (this.savedTrans);
    }

    getTransforms (o_) {
      console.log (o_);
      let xy_ = this.getTransformXY (o_);
      let rot_ = this.getTranformRotation (o_);

      return { x: xy_.x, y: xy_.y, rot: rot_ };
    }

    getTransformXY(el) {
      let style = window.getComputedStyle(el);
      let matrix = new WebKitCSSMatrix(style.transform);
      return { x: matrix.m41, y: matrix.m42 };
    }

    getTranformRotation(el){
      let st = window.getComputedStyle(el, null);
      let tm = st.getPropertyValue("-webkit-transform") ||st.getPropertyValue("-moz-transform") ||st.getPropertyValue("-ms-transform") || st.getPropertyValue("-o-transform") || st.getPropertyValue("transform") || "none";
      if (tm != "none") {
        let values = tm.split('(')[1].split(')')[0].split(',');
        let radians = Math.atan2(values[1], values[0]);
        if ( radians < 0 ) {
          radians += (2 * Math.PI);
        }
        let angle = Math.round( radians * (180/Math.PI));
        return (angle < 0 ? angle + 360 : angle); 
      }
      return 0;
    }

    endedMovement () {
      console.log ("hemos terminado de mover la carta, ahora te dejo mover otra, hasta entonces no.");
    }

    onEndMonta () {
      this.blocked = false;
      console.log ("Terminada de montar la subseccion " + this.name);
      EventBus.emit (EventBus.events.HIGTHMONTADO, this, this.seccionPadre ); 
    }

    onEndDesmonta () {
      console.log ("Terminada de desmontar la subseccion " + this.name);
      EventBus.emit (EventBus.events.HIGTHDESMONTADO, this, this.seccionPadre); 
    }
}



