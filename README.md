# JavaScript Event-Driven Game Engine

**This README does not currently contain exhaustive documentation, just a high level overview and how to run the code yourself (more just for my own memory)**

This repo contains the in-browser game engine that was developed with/for my game [Populus](http://populus.gg). The engine features an event-driven architecture, so different components (in-game entities, UI elements, etc.) can communicate by raising events and passing arguments. This code is completely self-contained (no third-party dependencies), and written in plain-old, vanilla JavaScript (which seems to be pretty rare these days). Currently, just basic shapes, lines, and text can be drawn to the screen. The engine wraps around the HTML Canvas 2D context for rendering these graphics. The engine also features a nifty animation system which can be used to update 1D values over time with any equation you want. Keyboard and mouse input is queued up and processed every frame, which can then fire any in-game events you want.

## Getting Started

All that's required to run the code, is have an http server, serve out the `client` folder. On my system, I use a globally installed NodeJS package called `http-server`, The `startHttp.ps1` Windows PowerShell script starts http-server on port 8080 and serves the client folder. It's also technically possible to just open the `index.html` file in a browser, but since the code refers to the individual .js files as ES Modules (using `import` and `export`) that is a CORS violation in the browser.

This repo is setup with an example, that currently draws a purple square on screen that can be moved around with the arrow keys.

## Basic API Detail
### Global Objects
The `main.js` file in the `client/scripts/` folder serves as the entry point and is run by the `index.html` file in the `client` folder. The `main.js` file only imports and initializes an `Application` object which is where our game logic will take place. Initializing the `Application` object sets up the keyboard/mouse input DOM listeners (and a global `PlayerInput` object), and creates a full screen HTML Canvas element (and creates a global `CanvasWrapper` object). There is a also the global `EventEmitter` object, which contains methods that can add/remove event listener callbacks for a particular event as well as call/emit a particular event. I mimicked the NodeJS EventEmitter syntax which uses methods like `.on` and `.off` for adding removing event listeners respectively.
### Entities and Drawables
The poorly named `Entity` class should be extended from for any object that needs to listen to game events. The drawable objects (Circle, Rect, Text, and OpenPath) extend from the `Drawable` class (which extends from `Entity`). The `Circle` and `Rect` classes have some basic collision methods for testing if a point (vec2) is inside or outside the shape. The `Entity` class has an `.init()` and `.destruct()` methods which respectively add and remove event listeners from the global `EventEmitter` object. The `Drawable` class has another step in it's `.init()` method that sets up its `.draw()` callback with the global `CanvasWrapper` object.
### Timers and Animation
The `Timer` object can be used similarly to the `setTimeout` or `setInterval` JS functions, except that is used to ensure that the listener functions are called in sync with our game's frames. A `timer` object can call a callback every frame or just when the specified time elapses. The `Animation` class extends the `Timer` object and adds in the ability to interpolate between two values either linearly (or along any equation you specify). An `animation` object can be added as a property to your own entities to animation properties of those entities.
### UI
There is a `Button` object that extends that draws a circle with some text for the button (Populus used circular buttons, which is why it's that way currently). There is also a `ButtonWrapper` object which creates a HTML button (`<button>` tag). The plain `Text` drawable class can be used to draw any text you want to the screen.
### Debug Text
There is also a set of classes used for rendering debug text on the canvas for convenience. Update rates can be specified to keep values that update every frame from being too hard to read.
### Color and Fonts
There are classes for colors and fonts that make it easy to change colors or font-size values for `Drawable` objects. That way you don't have to write the HTML color or font style string yourself every time you change it.