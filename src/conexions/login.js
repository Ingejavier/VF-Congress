import Rushmore from "../Rushmore";
import { myRequest } from "../utils/utilities";
import DialogBox from '../utils/DialogBox.js';

import EventBus from '../eventbus.js';

export default class login {

    constructor() {}

    getJson () {
      myRequest({url: "json/login.json"})
      .then(data => {
          let emp = JSON.parse(data);
          Rushmore.globalInfoSet ("textosEndesa", emp);

          /*
            console.log (emp[0].castellano);
            console.log (emp[1].catalan);
            console.log (emp[2].euskera);
          */

          EventBus.emit (EventBus.events.LOGIN); 
      })
      .catch(error => {
          console.log(error);
      });
    }
   
}
