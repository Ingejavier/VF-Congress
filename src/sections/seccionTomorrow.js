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

import moduleClass from "../moduleClass"
 
import * as PIXI from 'pixi.js'

export default class seccionTomorrow extends Rushmore {
    
  constructor() {
      super (); 

      this.name = "tomorrow";

      this.aspectvideoFS = {w:1920 , h:1080};

      EventBus.on(EventBus.events.HIGTHMONTADO, this.highestMontado, this);
      EventBus.on(EventBus.events.HIGTHDESMONTADO, this.highestDesMontado, this);

      const Class1_ = moduleClass("openran_temp3"); 
      this.tomorrow_openran = new Class1_(); 

      const Class2_ = moduleClass("bigdata_temp3"); 
      this.tomorrow_bigdata = new Class2_(); 

      const Class3_ = moduleClass("circular_temp3"); 
      this.tomorrow_circular = new Class3_(); 

      const Class4_ = moduleClass("fleettomorrow_temp2"); 
      this.tomorrow_fleet = new Class4_(); 

      this.createElements ();
      this.createEvents ();

      this.dataSubsecciones ();

      this.moving = false;
      
      this.atWhere = "sec"; // sec || subsec
      this.numSubSec = -1;

      this.resize ();

      /*this.ru_ = new Regla (960, 4134, 890);
      console.log (377 + this.ru_.get_hallar (3800));*/
    }

    createElements () {
      this.tomorrowDIV_ = this.create ("#tomorrowDIV"); 

      this.bar_cont1_ = this.create ("#tomorrowDIV .bar_cont1");
        this.barra_1_ = this.create ("#tomorrowDIV .barra_1");
          this.barraIMG_1_ = this.create ("#tomorrowDIV .barra_1 img");
        this.txt_1_ = this.create ("#tomorrowDIV .txt_1");

      this.bar_cont2_ = this.create ("#tomorrowDIV .bar_cont2");
        this.barra_2_ = this.create ("#tomorrowDIV .barra_2");
        this.barraIMG_2_ = this.create ("#tomorrowDIV .barra_2 img");
        this.txt_2_ = this.create ("#tomorrowDIV .txt_2");

      this.bar_cont3_ = this.create ("#tomorrowDIV .bar_cont3");
          this.barra_3_ = this.create ("#tomorrowDIV .barra_3");
          this.barraIMG_3_ = this.create ("#tomorrowDIV .barra_3 img");
          this.txt_3_ = this.create ("#tomorrowDIV .txt_3");

      this.bar_cont4_ = this.create ("#tomorrowDIV .bar_cont4");
          this.barra_4_ = this.create ("#tomorrowDIV .barra_4");
          this.barraIMG_4_ = this.create ("#tomorrowDIV .barra_4 img");
          this.txt_4_ = this.create ("#tomorrowDIV .txt_4");

      this.close_ =  this.create ("#tomorrowDIV .close");
    }    

    createEvents () { 
      this.close_.addEventListener ("click", ()=> { 
        if (this.atWhere == "sec") this.desmonta (); 
        else {
          if (this.atWhere == "subsec") this.closeHigestLevel ();
        }
      })

      this.bar_cont1_.addEventListener ("click", ()=> { this.montaSubSeccion (1) });
      this.bar_cont2_.addEventListener ("click", ()=> { this.montaSubSeccion (2) });
      this.bar_cont3_.addEventListener ("click", ()=> { this.montaSubSeccion (3) });
      this.bar_cont4_.addEventListener ("click", ()=> { this.montaSubSeccion (4) });
      
      this.addResizer (this.onresize, this);
      this.onresize (); 
    }

    monta () {
      this.atWhere = "sec";

      const complete = ()=> {
        eleDOM.show (this.close_);
        gsap.to(this.close_, { duration: .5, opacity: 1, ease:"quad.out" });
      }

      eleDOM.show (this.tomorrowDIV_);
      gsap.to(this.tomorrowDIV_, { duration: .2, opacity: 1, ease:"quad.inOut" });

        gsap.to(this.bar_cont1_, { delay:.2, duration: 1, top: "0%", ease:"Expo.out" });
        gsap.to(this.bar_cont2_, { delay:.4, duration: 1, top: "0%", ease:"Expo.out" });
        gsap.to(this.bar_cont3_, { delay:.6, duration: 1, top: "0%", ease:"Expo.out" });
        gsap.to(this.bar_cont4_, { delay:.8, duration: 1, top: "0%", ease:"Expo.out" });

        gsap.to(this.txt_1_, { delay:1, duration: .5, opacity: 1, ease:"quad.inOut" });
        gsap.to(this.txt_2_, { delay:1.2, duration: .5, opacity: 1, ease:"quad.inOut" });
        gsap.to(this.txt_3_, { delay:1.4, duration: .5, opacity: 1, ease:"quad.inOut" });
        gsap.to(this.txt_4_, { delay:1.6, duration: .5, opacity: 1, ease:"quad.inOut", onComplete: complete });
    }

    desmonta () {
      if (this.moving) return;
      this.moving = true;

      const complete = () => {
        this.moving = false;
        eleDOM.hide (this.tomorrowDIV_); 
        EventBus.emit (EventBus.events.DESMONTADO); 
      }
      
        gsap.to(this.close_, { duration: .5, opacity: 0, onComplete: ()=> { eleDOM.hide (this.close_); }, ease:"quad.out" });

        gsap.to(this.txt_1_, { delay:0, duration: .5, opacity: 0, ease:"quad.inOut" });
        gsap.to(this.txt_2_, { delay:.2, duration: .5, opacity: 0, ease:"quad.inOut" });
        gsap.to(this.txt_3_, { delay:.4, duration: .5, opacity: 0, ease:"quad.inOut" });
        gsap.to(this.txt_4_, { delay:.6, duration: .5, opacity:0 , ease:"quad.inOut" });

        gsap.to(this.bar_cont1_, { delay:.5, duration: .8, top: "-100%", ease:"quad.inOut" });
        gsap.to(this.bar_cont2_, { delay:.7, duration: .8, top: "-100%", ease:"quad.inOut" });
        gsap.to(this.bar_cont3_, { delay:.9, duration: .8, top: "-100%", ease:"quad.inOut" });
        gsap.to(this.bar_cont4_, { delay:1.1, duration: .8, top: "-100%", ease:"quad.inOut" });

      gsap.to(this.tomorrowDIV_, { delay:2, duration: .2, opacity: 0, ease:"quad.inOut", onComplete: complete });
    }

    dataSubsecciones () {
      this.tm_plc = [
        [{ 
            delMon: [.4, .4, .2, .0],
            delDes: [.0, .0, .2, .4],
            places: [0, 100, 100, 100],
            bgXDes: ["-72%","-24%","-14%","-40%"],
            bgXMon: ["0%","-24%","-14%","-40%"]
        }],
        [{ 
            delMon: [.0, .2, .2, .0],
            delDes: [.6, .4, .0, .2],
            places: [0, 0, 100, 100],
            bgXDes: ["-72%","-24%","-14%","-40%"],
            bgXMon: ["-72%","0%","-14%","-40%"]
        }],
        [{ 
            delMon: [.0, .2, .4, .0],
            delDes: [.4, .2, .0, .6],
            places: [0, 0, 0, 100],
            bgXDes: ["-72%","-24%","-14%","-40%"],
            bgXMon: ["-72%","-24%","0%","-40%"]
        }],
        [{ 
            delMon: [0, .2, .4, .6],
            delDes: [.6, .4, .2, .0],
            places: [0, 0, 0, 0],
            bgXDes: ["-72%","-24%","-14%","-40%"],
            bgXMon: ["-72%","-24%","-14%","0%"]
        }]
      ];
    }

    montaSubSeccion (c_) {
      if (this.moving || this.atWhere == "subsec") return;
      this.moving = true;

      this.atWhere = "subsec"; 
      this.numSubSec = c_;

      this.quitaClose ();
 
      const tp = this.tm_plc[c_-1][0];

      this.setToHundred ();

      gsap.to(this.txt_1_, { delay:tp.delMon[0], duration: .5, opacity: 0, ease:"quad.inOut" });
      gsap.to(this.txt_2_, { delay:tp.delMon[1], duration: .5, opacity: 0, ease:"quad.inOut" });
      gsap.to(this.txt_3_, { delay:tp.delMon[2], duration: .5, opacity: 0, ease:"quad.inOut" });
      gsap.to(this.txt_4_, { delay:tp.delMon[3], duration: .5, opacity: 0, ease:"quad.inOut" });

      gsap.to(this.bar_cont1_, { delay:tp.delMon[0], duration: 1, left: String(tp.places[0] + "%") , ease:"quad.inOut" });
      gsap.to(this.bar_cont2_, { delay:tp.delMon[1], duration: 1, left: String(tp.places[1] + "%"),  ease:"quad.inOut" });
      gsap.to(this.bar_cont3_, { delay:tp.delMon[2], duration: 1, left: String(tp.places[2] + "%"),  ease:"quad.inOut" });
      gsap.to(this.bar_cont4_, { delay:tp.delMon[3], duration: 1, left: String(tp.places[3] + "%"),  ease:"quad.inOut" }); 

      gsap.to(this.barraIMG_1_, { delay:tp.delMon[0], duration: 1, x: tp.bgXMon[0], ease:"quad.inOut" });
      gsap.to(this.barraIMG_2_, { delay:tp.delMon[1], duration: 1, x: tp.bgXMon[1], ease:"quad.inOut" });
      gsap.to(this.barraIMG_3_, { delay:tp.delMon[2], duration: 1, x: tp.bgXMon[2], ease:"quad.inOut" });
      gsap.to(this.barraIMG_4_, { delay:tp.delMon[3], duration: 1, x: tp.bgXMon[3], ease:"quad.inOut" });

      if (this.timerid) clearTimeout (this.timerid);
      this.timerid = setTimeout(() => { 
        this.openHigestLevel ();
      }, 2000);
    }

    desmontaSubSeccion () {
      if (this.moving) return;
      this.desActiva ();
      
      //this.quitaClose ();

      const tp = this.tm_plc[this.numSubSec-1][0];

      gsap.to(this.txt_1_, { delay:tp.delDes[0]+.8, duration: .5, opacity: 1, ease:"quad.inOut" });
      gsap.to(this.txt_2_, { delay:tp.delDes[1]+.8, duration: .5, opacity: 1, ease:"quad.inOut" });
      gsap.to(this.txt_3_, { delay:tp.delDes[2]+.8, duration: .5, opacity: 1, ease:"quad.inOut" });
      gsap.to(this.txt_4_, { delay:tp.delDes[3]+.8, duration: .5, opacity: 1, ease:"quad.inOut" });

      gsap.to(this.bar_cont1_, { delay:tp.delDes[0], duration: 1, left: String("0%") , ease:"quad.inOut" });
      gsap.to(this.bar_cont2_, { delay:tp.delDes[1], duration: 1, left: String("25%"),  ease:"quad.inOut" });
      gsap.to(this.bar_cont3_, { delay:tp.delDes[2], duration: 1, left: String("50%"),  ease:"quad.inOut" });
      gsap.to(this.bar_cont4_, { delay:tp.delDes[3], duration: 1, left: String("75%"),  ease:"quad.inOut" }); 

      gsap.to(this.barraIMG_1_, { delay:tp.delDes[0], duration: 1, x: tp.bgXDes[0], ease:"quad.inOut" });
      gsap.to(this.barraIMG_2_, { delay:tp.delDes[1], duration: 1, x: tp.bgXDes[1], ease:"quad.inOut" });
      gsap.to(this.barraIMG_3_, { delay:tp.delDes[2], duration: 1, x: tp.bgXDes[2], ease:"quad.inOut" });
      gsap.to(this.barraIMG_4_, { delay:tp.delDes[3], duration: 1, x: tp.bgXDes[3], ease:"quad.inOut" });
      
      if (this.timerid) clearTimeout (this.timerid);
      this.timerid = setTimeout(() => { 
        this.activa ();
        this.atWhere = "sec";
        this.setToTwenty ();
        this.ponClose ();
      }, 2000);
    }

    openHigestLevel () {
      console.log ("Abrimos el nuevo tercer nivel, numero: " + this.numSubSec);
      if (this.numSubSec == 1) this.tomorrow_openran.monta ();
      if (this.numSubSec == 2) this.tomorrow_bigdata.monta ();
      if (this.numSubSec == 3) this.tomorrow_circular.monta ();
      if (this.numSubSec == 4) this.tomorrow_fleet.monta ();
    }

    closeHigestLevel () {
      if (this.moving) return;
      
      this.desActiva ();
      this.quitaClose ();

      if (this.numSubSec == 1) this.tomorrow_openran.desmonta ();
      if (this.numSubSec == 2) this.tomorrow_bigdata.desmonta ();
      if (this.numSubSec == 3) this.tomorrow_circular.desmonta ();
      if (this.numSubSec == 4) this.tomorrow_fleet.desmonta ();
    }

    highestMontado (e, from) {
      if (from != this.name) return;

      this.activa ();
      this.ponClose ();
    }

    highestDesMontado (e, from) {
      if (from != this.name) return;
      
      this.activa ();
      this.desmontaSubSeccion (); 
    }

    activa () {
      this.moving = false; 
    }

    desActiva () {
      this.moving = true; 
    }

    ponClose () {
      eleDOM.show (this.close_);
      gsap.to(this.close_, { duration: .3, opacity: 1, ease:"quad.out" });
    }

    quitaClose () {
      gsap.to(this.close_, { duration: .3, opacity: 0, ease:"quad.out", onComplete: ()=> { eleDOM.hide (this.close_); } });
    }

    setToHundred () {
      eleDOM.setStyles (this.bar_cont1_, { width: "100%" });
      eleDOM.setStyles (this.bar_cont2_, { width: "100%" });
      eleDOM.setStyles (this.bar_cont3_, { width: "100%" });
      eleDOM.setStyles (this.bar_cont4_, { width: "100%" });
    }

    setToTwenty () {
      eleDOM.setStyles (this.bar_cont1_, { width: "25%" });
      eleDOM.setStyles (this.bar_cont2_, { width: "25%" });
      eleDOM.setStyles (this.bar_cont3_, { width: "25%" });
      eleDOM.setStyles (this.bar_cont4_, { width: "25%" });      
    }

    onresize () { }
}

