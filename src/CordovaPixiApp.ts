import * as PIXI from 'pixi.js';

class CordovaPixiApp extends PIXI.Application {

  constructor() {
    console.log('create new instance of CordovaPixiApp');
    const gameWidth = 1000;
    const gameHeight = 500;

    super({
      width: gameWidth,
      height: gameHeight,
      backgroundColor: 0x00ff00,
      antialias: true,
      sharedTicker: false
    });

    const basicText = new PIXI.Text('Hello world');
    basicText.x = 50;
    basicText.y = 100;

    this.stage.addChild(basicText);
  }

}

export default CordovaPixiApp;



