import { Group } from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js';

class Controllers extends Group {
  constructor(renderer) {
    super();

    this.controller1 = renderer.xr.getController(0);
    this.add(this.controller1);

    this.controller2 = renderer.xr.getController(1);
    this.add(this.controller2);

    // Create controller and hand models
    const controllerModelFactory = new XRControllerModelFactory();
    const handModelFactory = new XRHandModelFactory().setPath('/oculus/');

    // Controller 1
    const controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
    this.add(controllerGrip1);

    // Hand 1
    const hand1 = renderer.xr.getHand(0);
    hand1.add(handModelFactory.createHandModel(hand1, 'oculus'));

    this.add(hand1);

    // Controller 2
    const controllerGrip2 = renderer.xr.getControllerGrip(1);
    controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
    this.add(controllerGrip2);

    // Hand 2
    const hand2 = renderer.xr.getHand(1);
    hand2.add(handModelFactory.createHandModel(hand2, 'oculus'));
    this.add(hand2);
  }
}

export default Controllers;
