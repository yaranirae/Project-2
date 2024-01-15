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

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')
loadSprite('ja-block', 'bLmIfOx.png')
loadSprite('nee-block', 'hF3mbeX.png')
loadSprite('wall', 'pogC9x5.png')

loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')
loadSprite('vraag1', 'VHy4zKc.png')
loadSprite('vraag2', '2ZbD3Qd.png')
loadSprite('vraag3', '0CFAFcf.png')
loadSprite('vraag4', 'WuYrJEe.png')
loadSprite('vraag5', '7NZxVgJ.png')
loadSprite('finish-line', 'KPA4MkY.png')
loadSprite('exit', 'i9l631x.png')
loadSprite('gebruik', '7AUbZSH.png')
loadSprite('sign', 'ERZ9d6D.png')
loadSprite('info', 'K1vlxxE.png')





scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const maps = [
        [
            '£                                             £',
            '£      >                  [                   £',
            '£                                             £',
            '£                                             £',
            '£                 |                           £',
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
            '£  €                                               £',
            '£                                                  £',
            '£                   !/!_!               x x        £',
            '£                                     x x x        £',
            '£                                   x x x x  x   -+£',
            '£                          z   z  x x x x x  x   ()£',
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
            '£  é                                               £',
            '£                                                  £',
            '£                  !!!!!!               x x        £',
            '£                                     x x x        £',
            '£                                   x x x x  x   -+£',
            '£                          z   z  x x x x x  x   ()£',
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
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
        '^': [sprite('evil-shroom'), solid(), 'dangerous'],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],
        '!': [sprite('blue-block'), solid(), scale(0.5)],
        '£': [sprite('blue-brick'), solid(), scale(0.5)],
        'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
        '@': [sprite('blue-surprise'), solid(), scale(0.5), 'blue-surprise'],
        'x': [sprite('blue-steel'), solid(), scale(0.5)],
        'q': [sprite('vraag1'), scale(0.164)],
        '€': [sprite('vraag2'), scale(0.164)],
        'e': [sprite('vraag3'), scale(0.164)],
        'é': [sprite('vraag4'), scale(0.164)],
        'j': [sprite('vraag5'), scale(0.22)],
        '/': [sprite('ja-block'), solid(), scale(0.022), 'ja-block-coin'],
        '_': [sprite('nee-block'), solid(), scale(0.022), 'nee-block-mushroom'],
        '~': [sprite('wall'), solid()],
        'l': [sprite('finish-line'), scale(0.09), 'finish-line'],
        '<': [sprite('exit'), scale(0.042)],
        '>': [sprite('gebruik'), scale(0.17)],
        '|': [sprite('sign'), scale(0.134)],
        '[': [sprite('info'), scale(0.18)]

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



    player.on("headbump", (obj) => {
        if (obj.is('nee-block-mushroom')) {
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))

        }
    })






    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
    })


    player.collides('finish-line', () => {
        go('win', { score: 'You are ' + scoreLabel.value * 20 + '% suitable for this course' })
    })


    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.values
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