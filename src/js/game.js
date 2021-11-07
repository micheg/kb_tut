import kaboom from "kaboom";

window.$DEBUG;
window.main = null;

;((self) => 
{
    // DEFINE
    const FLOOR_HEIGHT = 48;
    const JUMP_FORCE = 800;
    const SPEED = 480;
    const GRAVITY = 2400;
    
    G = {};

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
            k.sprite("dino"),
            k.pos(280, 40),
            k.area(),
            k.body(),
            k.z(10)
        ]);
    };
    
    G.add_base = function()
    {
        const k = G.get_library_ref();
        // add platform
        k.add([
            k.rect(k.width(), FLOOR_HEIGHT),
            k.pos(0, k.height() ),
            k.origin("botleft"),
            k.outline(4),
            k.area(),
            k.solid(),
            k.color(127, 200, 254),
        ]);    
    };
    
    G.bind = function()
    {
        const k = G.get_library_ref();
        const dino = G.objs.dino;
        
        const jump = () =>
        {
            if(dino.isGrounded())
            {
                dino.jump(JUMP_FORCE);
            }            
        };

        k.onKeyPress("space", () => jump());
        k.onTouchStart((id, pos) => jump());
        k.onMousePress((btn, pos) => jump());
        
        dino.onCollide("tree", () => {
            k.addKaboom(dino.pos);
            k.burp();
            k.shake();
            k.wait(0.5, () =>
            {
                k.go('game_over', this.vars.score);
            });
        });

        k.onUpdate(() =>
        {
            this.vars.score++;
            this.objs.score_lbl.text = this.vars.score;
        });
    
    };

    G.spawn_enemy = function()
    {
        const k = G.get_library_ref();
        k.add(
        [
            k.rect(48, k.rand(32, 96)),
            k.area(),
            k.outline(4),
            k.pos(k.width(), k.height() - FLOOR_HEIGHT),
            k.origin("botleft"),
            k.color(255, 180, 255),
            k.move(k.LEFT, SPEED),
            k.z(5),
            "tree"
        ]);
        k.wait(k.rand(0.5, 1.5), () =>
        {
            this.spawn_enemy();
        });   
    };

    G.game_over_screen = function(score)
    {
        const k = G.get_library_ref();
        k.add(
        [
            k.sprite('dino'),
            k.pos(k.width() / 2, k.height() / 2 - 80),
            k.scale(2),
            k.origin("center"),
        ]);
    
        // display score
        k.add(
        [
            k.text(score),
            k.pos(k.width() / 2, k.height() / 2 + 80),
            k.scale(2),
            k.origin("center"),
        ]);
    
        // go back to game with space is pressed
        k.onKeyPress("space", () => k.go('game_run'));
        k.onClick(() => k.go('game_run'));
    };

    G.create_score = function()
    {
        const k = G.get_library_ref();
        this.vars.score = 0;
        this.objs.score_lbl = k.add(
        [
            k.text(this.vars.score),
            k.pos(24, 24)
        ]);
    };
    
    G.init = function(lib)
    {
        // init hash for game objects
        this.objs = {};

        // init hash for game vars
        this.vars = {};

        // setting reference to game library
        G.get_library_ref = () =>
        {
            return lib;
        }
        G.load();

        // main scene

        lib.scene('game_run', () =>
        {
            lib.gravity(GRAVITY);
            G.add_base();
            G.add_player();
            G.create_score();
            G.spawn_enemy();
            G.bind();
        });

        // game over scene
        lib.scene('game_over', (score) =>
        {
            G.game_over_screen(score);
        });

        lib.go('game_run');
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
