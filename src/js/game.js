import kaboom from "kaboom";

kaboom();

add([
    text("hello world"),
    pos(120, 80),
]);

// load a sprite "bean" from an image
loadSprite("dino", "img/sprites/dino.png")

// add something to screen
add([
    sprite("dino"),
    pos(80, 40),
])