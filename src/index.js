import * as PIXI from 'pixi.js-legacy';
import CordovaPixiApp from './CordovaPixiApp';

let app = null;

window.addEventListener("resize", () => {
  console.log("window resize");
  resizePixiApplication();
});

document.addEventListener("deviceready", () => {
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  if (cordova.platformId !== 'browser') {
    screen.orientation.lock('landscape');
  }
  startPixiApplication();
});

function resizePixiApplication() {
  if (!app || !app.view) {
    return;
  }

  const windowWidth = document.body.clientWidth,
    windowHeight = document.body.clientHeight,
    scaleX = windowWidth / app.view.width,
    scaleY = windowHeight / app.view.height,
    scale = Math.min(scaleX, scaleY);

  app.view.style.transform = "scale(" + scale + ")";
  app.view.style.transformOrigin = "left top";
  app.view.style.position = "absolute";
  app.view.style.left = (windowWidth - app.view.width * scale) / 2 + "px";
  app.view.style.top = (windowHeight - app.view.height * scale) / 2 + "px";
}

async function startPixiApplication() {
  if (app !== null) {
    // remove previous loaded application
    app.destroy(true);
    app = null;
  }

  console.log('Start application');

  app = new CordovaPixiApp();

  resizePixiApplication();

  // // if (process.env.NODE_ENV === 'dev') {

  const txtRendererFPS = new PIXI.Text('FPS', { fill: 0xff0000 });
  txtRendererFPS.x = 10;
  app.stage.addChild(txtRendererFPS);

  let _fpsValues = [];
  app.ticker.add((delta) => {
    _fpsValues.push(app.ticker.FPS);
    if (_fpsValues.length >= 30) {
      let total = 0;
      for (let i = 0; i < _fpsValues.length; i++) {
        total += _fpsValues[i];
      }
      txtRendererFPS.text = (total / _fpsValues.length).toFixed(2);
      _fpsValues = [];
    }
  });

  const txtRendererType = new PIXI.Text((app.renderer instanceof PIXI.CanvasRenderer) ? 'canvas' : 'webgl', { fill: 0xff0000 });
  txtRendererType.x = 150;
  app.stage.addChild(txtRendererType);

  // //}

  // add view in body
  document.body.appendChild(app.view);

  // remove loading text
  const loadingDiv = document.getElementById('loading');
  if (loadingDiv) {
    document.body.removeChild(loadingDiv);
  }
}
