
import Rushmore from "../Rushmore";

//Tween GASP y AJAX call
import { gsap } from 'gsap';

//Utilidades
import { myRequest } from "../utils/utilities";
import Regla from "../utils/Regla";
import { windowsize } from "../utils/utilities";
import { isMobileDevice } from "../utils/utilities";

//DialogBox
import DialogBox from '../utils/DialogBox.js';

import { eD as eleDOM } from '../eleDOM.js';
import EventBus from '../eventbus.js';

import appleButton from "../utils/appleButton";

import * as PIXI from 'pixi.js'
import seccionToday from "./seccionToday";
import seccionCustomers from "./seccionCustomers";
import seccionTomorrow from "./seccionTomorrow";

export default class home extends Rushmore {
   
  constructor() {
      super (); 

      EventBus.on(EventBus.events.DESMONTADO, this.desmontadaSeccion, this);
      
      this.secToday_ = new seccionToday ();
      this.secCustomers_ = new seccionCustomers ();
      this.secTomorrow_ = new seccionTomorrow ();

      /* Reize video */
      this.aspectvideoFS = {w:1920 , h:1080};

      this.createElements (); 

      this.createButtons ();
      this.createVideo ();
      this.createFondos ();
      
      this.createEvents ();

      this.resize ();

      this.onsec = false;
    }

    createVideo () {
      this.video = document.getElementById('mivideo');
      this.video.onended = function(e) {
        console.log ("video Ended");
      };
    }

    playVideo () {
      eleDOM.addClass (this.videowrapper_, "outBlur");
      eleDOM.hide (this.canvasMask_);
      
      eleDOM.hide (this.titular_);
      eleDOM.hide (this.hastag_); 

      gsap.to(this.titularHome_, {delay:1, duration: 1, opacity: 1, ease:"quad.inOut" });

      eleDOM.setStyles (this.botonera_, { top: "48%" });
      gsap.to(this.today_boton, {delay:1.2, duration: 1, opacity: 1, ease:"quad.inOut" });
      gsap.to(this.customers_boton, {delay:1.4, duration: 1, opacity: 1, ease:"quad.inOut" });
      gsap.to(this.tomorrow_boton, {delay:1.5, duration: 1, opacity: 1, ease:"quad.inOut" });

      this.video.play ();
    }

    createFondos () {
      this.app = new PIXI.Application({ width: this.aspectvideoFS.w, height: this.aspectvideoFS.h, backgroundAlpha: 0, resolution: window.devicePixelRatio || 1, });
      
      this.canvasMask_.appendChild(this.app.view);
      this.container = new PIXI.Container();
      this.app.stage.addChild(this.container);   

      const tMask_ = PIXI.Texture.from("img/trozo.png");

      this.maskEle = new PIXI.Sprite(tMask_);
      this.maskEle.anchor.set(.5,.5);
      this.maskEle.scale.x = 1.005;
      this.maskEle.scale.y = 0.95;

      const tBG_ = PIXI.Texture.from("img/fondo.png");
      this.bkEle = new PIXI.Sprite(tBG_);
      this.bkEle.anchor.set(.5,.5);

      this.container.addChild(this.bkEle);
      this.container.addChild(this.maskEle); 

      this.bkEle.mask = this.maskEle;
      this.canvas = this.create('canvas');
    }

    onClosed () {
      console.log("Apagado");
    }

    onOpened () {
      const complete = ()=> {
        this.playVideo ();
      }
      const o_ = this.maskEle.scale;
      gsap.to(o_, {duration: 2, x: 6.2, y:6.2, ease:"quad.inOut", onComplete: complete });

      gsap.to(this.startDiv_, {duration: .5, opacity: 0, ease:"quad.inOut" });
      gsap.to(this.startSombra_, {duration: .1, opacity: 0, ease:"quad.inOut" });

      console.log ("Encendido");
    }

    opacitiers (c_, v_) {
      if (c_ == 1) {
        eleDOM.setStyles (this.txtToday_, { opacity: 1-v_ }) ;
      }
      if (c_ == 2) {
        eleDOM.setStyles (this.txtCustomers_, { opacity: 1-v_ }) ;
      }
      if (c_ == 3) {
        eleDOM.setStyles (this.txtTomorrow_, { opacity: 1-v_ }) ;
      }            
    }

    openSeccion (cu_) {
      if (this.onsec) return; 
      this.onsec = true;

      let complete = () => { this.montaSeccion (cu_); }

      gsap.to(this.today_boton, {delay:0, duration: .3, opacity: 0, ease:"quad.inOut" });
      gsap.to(this.customers_boton, {delay:.2, duration: .3, opacity: 0, ease:"quad.inOut" });
      gsap.to(this.tomorrow_boton, {delay:.4, duration: .3, opacity: 0, ease:"quad.inOut", onComplete: complete });
    }

    montaSeccion (cu_) {
        //if (cu_ == 1 || cu_ == 3) this.secToday_.monta ();
        
        if (cu_ == 1) this.secToday_.monta ();
        if (cu_ == 2) this.secCustomers_.monta ();
        if (cu_ == 3) this.secTomorrow_.monta ();

        this.actusalSec = cu_;
    }

    desmontadaSeccion () {
      let complete = () => { 
        this.onsec = false;
       }

       if (this.actusalSec == 1) this.today_.checkStatus ();
       if (this.actusalSec == 2) this.customers_.checkStatus ();
       if (this.actusalSec == 3) this.tomorrow_.checkStatus ();

      gsap.to(this.today_boton, {delay:0, duration: .3, opacity: 1, ease:"quad.inOut" });
      gsap.to(this.customers_boton, {delay:.2, duration: .3, opacity: 1, ease:"quad.inOut" });
      gsap.to(this.tomorrow_boton, {delay:.4, duration: .3, opacity: 1, ease:"quad.inOut", onComplete: complete });
    }

    createButtons () {
      this.start_ = new appleButton ("start_boton", (v)=> {}, 1, this.onClosed.bind (this), this.onOpened.bind (this));

      this.today_ = new appleButton ("today_boton", (v)=> { this.opacitiers (1, v); }, 1, this.onClosed.bind (this),  (v)=> { this.openSeccion (1); });
      this.customers_ = new appleButton ("customers_boton", (v)=> { this.opacitiers (2, v); }, 1, this.onClosed.bind (this),  (v)=> { this.openSeccion (2); });
      this.tomorrow_ = new appleButton ("tomorrow_boton", (v)=> { this.opacitiers (3, v); }, 1, this.onClosed.bind (this),  (v)=> { this.openSeccion (3); });
    }

    createElements () {
      this.videowrapper_ = this.create (".videowrapper");

      this.canvasContainer  = this.create (".canvasContainer");
      this.canvasMask_  = this.create (".canvasMask");

      this.startDiv_ = this.create ("#start_boton");
      this.startSombra_ = this.create ("#start_boton .sombrasSCR");

      this.titular_ =  this.create (".titular");
      this.hastag_ =  this.create (".hastag");

      this.titularHome_ = this.create (".titularHome");

      this.botonera_ =  this.create ("#botonera");

      this.today_boton =  this.create ("#today_boton");
        this.txtToday_ =  this.create ("#today_boton .txtSCR");

      this.customers_boton =  this.create ("#customers_boton");
        this.txtCustomers_ =  this.create ("#customers_boton .txtSCR");

      this.tomorrow_boton =  this.create ("#tomorrow_boton");
        this.txtTomorrow_ =  this.create ("#tomorrow_boton .txtSCR");
    }    

    createEvents () { 
      this.addResizer (this.onresize, this);
      this.onresize (); 
    }

    onresize () {
      this.preserveAspect ();
    }

    preserveAspect () {
			let dW_ = parseInt(eleDOM.getStyle (this.canvasContainer,"width"));
			let dH_ = parseInt(eleDOM.getStyle (this.canvasContainer,"height"));

			let x_ = 1;
			let y_ = 1;

      let xdef_ = 0;
      let ydef_ = 0;
			
			let proportions = this.calculateAspectRatioFit(this.aspectvideoFS.w,this.aspectvideoFS.h,dW_,dH_);
      let newh_ = 0;
      let neww_ = 0;      

			if (dW_ != Math.round(proportions.width)) {
				newh_;
				newh_ = (dW_*proportions.height)/proportions.width;

        xdef_ = x_
        ydef_ = y_ - (Math.abs(newh_-dH_)/2)

        eleDOM.setStyles (this.canvas, {width: dW_, height: newh_});
        this.app.renderer.resize (dW_, newh_);

        eleDOM.setStyles (this.canvasMask_, {left: xdef_, top: ydef_  });
			} else {
				if (dH_ != Math.round(proportions.height)) {
					neww_;
					neww_ = (dH_*proportions.width)/proportions.height;
        
          xdef_ = x_ - (Math.abs(neww_-dW_)/2);
          ydef_ = y_;

          eleDOM.setStyles (this.canvas, {width: neww_, height: dH_});
          this.app.renderer.resize (neww_, dH_);
         
          eleDOM.setStyles (this.canvasMask_, {left: xdef_ , top: ydef_});
				}
			} 

      const cvsW = parseInt(eleDOM.getStyle (this.canvas, "width"));
      const cvsH = parseInt(eleDOM.getStyle (this.canvas, "height"));
      
      this.bkEle.x = cvsW/2;
      this.bkEle.y = cvsH/2;

      let valor = this.calculateAspectRatioFit(this.aspectvideoFS.w,this.aspectvideoFS.h,cvsW,cvsH);
      /*this.bkEle.scale.x = cvsW/valor.width;
      this.bkEle.scale.y = cvsH/valor.height;*/

      this.bkEle.scale.x = valor.width/this.aspectvideoFS.w;
      this.bkEle.scale.y = valor.height/this.aspectvideoFS.h;

      this.maskEle.x = cvsW/2;
      this.maskEle.y = cvsH/2;
		}

    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
      let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      return { width: srcWidth*ratio, height: srcHeight*ratio };
    }	

}

