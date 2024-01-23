//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
    global: true,
    fullscreen: false,
    scale: 1.7,
    debug: true,
    clearColor: [0, 0, 0, 1],
})

// Speed identifiers
const MOVE_SPEED = 160
const JUMP_FORCE = 400
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 20

// Game logic

let isJumping = true

loadSprite('coin', 'images/coin.png')
loadSprite('evil-shroom', 'images/evil.png')
loadSprite('block', 'images/block.png')
loadSprite('mario', 'images/mario.png')
loadSprite('mushroom', 'images/mushroom.png')
loadSprite('unboxed', 'images/unboxed.png')
loadSprite('pipe-top-left', 'images/pipe-top-left.png')
loadSprite('pipe-top-right', 'images/pipe-top-right.png')
loadSprite('pipe-bottom-left', 'images/pipe-bottom-left.png')
loadSprite('pipe-bottom-right', 'images/pipe-bottom-right.png')
loadSprite('ja-block', 'images/ja-block.png')
loadSprite('nee-block', 'images/nee-block.png')
loadSprite('brick', 'images/brick.png')

loadSprite('blue-block', 'images/blue-block.png')
loadSprite('blue-brick', 'images/blue-brick.png')
loadSprite('vraag1', 'images/vraag-1.png')
loadSprite('vraag2', 'images/vraag-2.png')
loadSprite('vraag3', 'images/vraag-3.png')
loadSprite('vraag4', 'images/vraag-4.png')
loadSprite('vraag5', 'images/vraag-5.png')
loadSprite('finish-line', 'images/finish-line.png')
loadSprite('exit', 'images/exit.png')
loadSprite('gebruik', 'images/gebruik.png')
loadSprite('sign', 'images/sign.png')
loadSprite('info', 'images/info.png')
loadSprite('blue-evil', 'images/blue-evil.png')



scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const maps = [
        [
            '£                                             £',
            '£      >                   [                  £',
            '£                                             £',
            '£                                             £',
            '£                  |                          £',
            '£                                             £',
            '£                                         <   £',
            '£                                             £',
            '£                                             £',
            '£                                         -+  £',
            '£                                         ()  £',
            '£!!!!!!!  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',

        ],
        [
            '~                                                  ~',
            '~                                                  ~',
            '~                                                  ~',
            '~  q                                               ~',
            '~                                                  ~',
            '~                  =/=_=                           ~',
            '~                                                  ~',
            '~                                      -+          ~',
            '~                               ^   ^  ()          ~',
            '~========================================   =======~',

        ],
        [
            '£                                                  £',
            '£                                                  £',
            '£                                                  £',
            '£  €                                    !          £',
            '£                                      !!          £',
            '£                   !/!_!             !!!          £',
            '£                                    !!!!          £',
            '£                                   !!!!!  !    -+ £',
            '£                          z   z  !!!!!!!  !    () £',
            '£!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],
        [
            '~                                                  ~',
            '~                                                  ~',
            '~                                       ~~~~~~     ~',
            '~  e                                 ~       ~     ~',
            '~                            ~~~~~~          ~     ~',
            '~                   =/=_=                    ~     ~',
            '~                                            ~     ~',
            '~                                            ~ -+  ~',
            '~                                            ~ ()  ~',
            '~===================================================',
        ],
        [
            '£                                                  £',
            '£                                                  £',
            '£                   /  _                           £',
            '£  é                                   !           £',
            '£                                     !!           £',
            '£                  !!!!!!            !!!           £',
            '£                                   !!!!           £',
            '£                                  !!!!!  !     -+ £',
            '£                          z   z !!!!!!!  !     () £',
            '£!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],
        [
            '~                                                       ~ ~   ~ ~         ~',
            '~                                                       ~~~   ~~~         ~',
            '~                                                       ~~~   ~~~         ~',
            '~                                       ~~~~~~    ~ ~ ~ ~ ~   ~ ~ ~ ~ ~   ~',
            '~                                    ~          ~ ~~~~~~~~~   ~~~~~~~~~   ~',
            '~  j                         ~~~~~~            ~  ~~ ~~~ ~~   ~~ ~~~ ~~   ~',
            '~                                               ~ ~~~~~~~~~   ~~~~~~~~~   ~',
            '~                   =/=_=                      ~  ~~~~~~~~ l   ~~~~~~~~   ~',
            '~                                               ~ ~~~~~~~~     ~~~~~~~~   ~',
            '~                                              ~  ~~~~~~~~     ~~~~~~~~   ~',
            '~                                               ~ ~~~~~~~~     ~~~~~~~~   ~',
            '~=========================================================================~',
        ],

    ]

    const levelCfg = {
        width: 20,
        height: 20,

        '=': [sprite('block'), solid()],
        '$': [sprite('coin'), 'coin'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
        '^': [sprite('evil-shroom'), solid(), 'dangerous'],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],
        '!': [sprite('blue-block'), solid(), scale(0.5)],
        '£': [sprite('blue-brick'), solid(), scale(0.5)],
        'q': [sprite('vraag1'), scale(0.16)],
        '€': [sprite('vraag2'), scale(0.16)],
        'e': [sprite('vraag3'), scale(0.16)],
        'é': [sprite('vraag4'), scale(0.16)],
        'j': [sprite('vraag5'), scale(0.16)],
        '/': [sprite('ja-block'), solid(), scale(0.022), 'ja-block-coin'],
        '_': [sprite('nee-block'), solid(), scale(0.022), 'nee-block-mushroom'],
        '~': [sprite('brick'), solid()],
        'l': [sprite('finish-line'), scale(0.09), 'finish-line'],
        '<': [sprite('exit'), scale(0.042)],
        '>': [sprite('gebruik'), scale(0.17)],
        '|': [sprite('sign'), scale(0.134)],
        '[': [sprite('info'), scale(0.18)],
        'z': [sprite('blue-evil'), scale(0.5), solid(), 'dangerous']

    }

    const gameLevel = addLevel(maps[level], levelCfg)

    const scoreLabel = add([
        text(score),
        pos(30, 6),
        layer('ui'),
        {
            value: score,
        }
    ])

    add([text('Question ' + parseInt(level)), pos(55, 6)])

    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                    timer -= dt()
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1)
                CURRENT_JUMP_FORCE = JUMP_FORCE
                timer = 0
                isBig = false
            },
            biggify(time) {
                this.scale = vec2(2)
                timer = time
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        big(),
        origin('bot')
    ])

    action('mushroom', (m) => {
        m.move(20, 0)
    })

    player.on("headbump", (obj) => {
        if (obj.is('ja-block-coin')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
        if (obj.is('nee-block-mushroom')) {
            gameLevel.spawn('#', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }

    })


    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(4)
    })


    player.collides('finish-line', () => {
        go('win', { score: 'You are ' + scoreLabel.value * 20 + '% suitable for this course' })
    })


    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })


    action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0)
    })

    player.collides('dangerous', (d) => {
        if (isJumping) {
            destroy(d)
        } else {
            go('lose', { score: "Your score is " + scoreLabel.value + "    Press 'R' to restart the quiz" })
        }

    })

    player.action(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            go('lose', { score: "Your score is " + scoreLabel.value + "    Press 'R' to restart the quiz" })


        }
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
            go('game', {
                level: (level + 1),
                score: scoreLabel.value



            })

        })
    })

    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    player.action(() => {
        if (player.grounded()) {
            isJumping = false
        }
    })

    keyPress('up', () => {
        if (player.grounded()) {
            isJumping = true
            player.jump(CURRENT_JUMP_FORCE)
        }
    })


})

scene('lose', ({ score }) => {
    add([text(score, 32, {
        width: 540,
    }), origin('center'), pos(width() / 2, height() / 2)])
    keyPress("r", () => go("game", {
        level: 0,
        score: 0
    }))

})

start("game", { level: 0, score: 0 })

scene('win', ({ score }) => {
    add([text(score, 16), origin('center'), pos(width() / 2, height() / 2)])

})