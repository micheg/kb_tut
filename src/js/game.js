import kaboom from "kaboom";

window.$DEBUG;
window.main = null;

;((self) => 
{
    G = {};
    G.objs = {};
    G.load = function()
    {
        const k = this.get_library_ref();
        // load a sprite "bean" from an image
        k.loadSprite("dino", "img/sprites/dino.png")
    };
    
    G.add_player = function()
    {
        const k = this.get_library_ref();
        // add something to screen
        G.objs.dino = k.add([
            k.sprite("dino", {jumpForce:740}),
            k.pos(80, 40),
            k.area(),
            k.body(),
        ]);
    };
    
    G.add_base = function()
    {
        const k = G.get_library_ref();
        // add platform
        k.add([
            k.rect(k.width(), 48),
            k.pos(0, k.height() - 48),
            k.outline(4),
            k.area(),
            k.solid(),
            k.color(127, 200, 254),
        ]);
    
        // add tree
        k.add([
            k.rect(48, 64),
            k.area(),
            k.outline(4),
            k.pos(k.width(), k.height() - 48),
            k.origin("botleft"),
            k.color(255, 180, 255),
            k.move(k.LEFT, 240),
            "tree"
        ]);
    };
    
    G.bind = function()
    {
        const k = G.get_library_ref();
        const dino = G.objs.dino;
        // .jump() when "space" key is pressed
        k.onKeyPress("space", () =>
        {
            if(dino.isGrounded())
            {
                dino.jump(650);
            }
        });

        k.onTouchStart((id, pos) =>
        {
            if(dino.isGrounded())
            {
                dino.jump(650);
            }
        });
    
        dino.onCollide("tree", () => {
            k.addKaboom(dino.pos);
            k.shake();
        });
    };
    
    G.init = function(lib)
    {
        // getting reference to game library
        G.get_library_ref = () =>
        {
            return lib;
        }
        G.load();
        G.add_base();
        G.add_player();
        G.bind();
    };

    // entry point
    let main = (game) =>
    {
        const k = kaboom(
        {
            global: false,
        });
        game.init(k);
    };

    main(G);
})();
