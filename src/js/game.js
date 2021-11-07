import kaboom from "kaboom";

kaboom();

// load a sprite "bean" from an image
loadSprite("dino", "img/sprites/dino.png")

// add something to screen
const dino = add([
    sprite("dino"),
    pos(80, 40),
    area(),
    body(),
]);

// add platform
add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 254),
]);

// add tree
add([
    rect(48, 64),
    area(),
    outline(4),
    pos(width(), height() - 48),
    origin("botleft"),
    color(255, 180, 255),
    move(LEFT, 240),
]);

// .jump() when "space" key is pressed
onKeyPress("space", () =>
{
    if(dino.isGrounded())
    {
        dino.jump()
    }
});