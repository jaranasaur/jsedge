const config = {
  logging: false,
  keyBinds: [ 
  // {
  //   action: "cursorMove",
  //   domEvent: "mousemove",
  //   test: () => true
  // }, {
  //   action: "cursorDown",
  //   domEvent: "mousedown",
  //   test: e => e.button == 0 ? true : false
  // }, {
  //   action: "cursorUp",
  //   domEvent: "mouseup",
  //   test: e => e.button == 0 ? true : false
  // }, {
  //   action: "cursorDown",
  //   domEvent: "keydown",
  //   test: e => e.code == "Space" ? true : false
  // }, {
  //   action: "cursorUp",
  //   domEvent: "keyup",
  //   test: e => e.code == "Space" ? true : false
  // }, 
  {
    action: "leftArrowDown",
    domEvent: "keydown",
    test: e => e.keyCode == 37 ? true : false
  },
  {
    action: "upArrowDown",
    domEvent: "keydown",
    test: e => e.keyCode == 38 ? true : false
  },
  {
    action: "rightArrowDown",
    domEvent: "keydown",
    test: e => e.keyCode == 39 ? true : false
  },
  {
    action: "downArrowDown",
    domEvent: "keydown",
    test: e => e.keyCode == 40 ? true : false
  },
  {
    action: "leftArrowUp",
    domEvent: "keyup",
    test: e => e.keyCode == 37 ? true : false
  },
  {
    action: "upArrowUp",
    domEvent: "keyup",
    test: e => e.keyCode == 38 ? true : false
  },
  {
    action: "rightArrowUp",
    domEvent: "keyup",
    test: e => e.keyCode == 39 ? true : false
  },
  {
    action: "downArrowUp",
    domEvent: "keyup",
    test: e => e.keyCode == 40 ? true : false
  },
 ],

  cursor: {
    minDistance: 2
  },

  button: {
    fontToRadiusRatio: 0.47,
    hoverScale: 1.1
  },

  math: {
    piHalf: 1.5707963267948966,
    pi2: 6.283185307179586,
    pi8: 25.132741228718345
  },

  colors: {
    background: {
      r: 241,
      g: 241,
      b: 241
    }
  },

  globalStyle: {
    lineWidthRatio: 0.003
  },

  zIndexes: {
    button: 10,
    buttonText: 11
  },
};

export default config;