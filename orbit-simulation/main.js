"use strict";

// main.js:46 Uncaught TypeError: Failed to execute 'arc' on 'CanvasRenderingContext2D': 5 arguments required, but only 3 present.
//     at drawBall (main.js:46:9)
//     at loop (main.js:98:5)
//     at main.js:118:9


const BALL_RADIUS = 4
const HISTORY_RADIUS = 2


const LOOP_DELTA = 1
const EARTH_RADIUS_M = 6.3781 * 10 ** 6
const RADIUS_PER_PIXEL = (6.3781 * 10 ** 6) / 100

const RUNTIME_PER_HISTORY_ADDITION = 120;
let runtime = RUNTIME_PER_HISTORY_ADDITION - 1;

let oldInterval;

function renderContext() {
    const canvas = document.querySelector("#canvas")
    const ctx = canvas.getContext("2d")
    return ctx
}

function drawEarth(ctx) {
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.arc(0, 0, EARTH_RADIUS_M / RADIUS_PER_PIXEL, 0, 360)
    ctx.fill()
}
function drawHistory(ctx, history) {
    for(const point of history) {
        ctx.beginPath()
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.arc(point.x / RADIUS_PER_PIXEL, point.y / RADIUS_PER_PIXEL, HISTORY_RADIUS, 0, 360)
        ctx.fill()
    }
}

function drawBall(ctx, ball) {
    ctx.beginPath()
    ctx.fillStyle = "red"
    ctx.arc(ball.x / RADIUS_PER_PIXEL, ball.y / RADIUS_PER_PIXEL, BALL_RADIUS, 0, 360)
    ctx.fill()
}

function velocity(orbitRadiusM) {
    const velocity = G * EARTH_MASS_KG * (1 / (orbitRadiusM + EARTH_RADIUS_M));
    return Math.sqrt(velocity);
}

function circumference(orbitRadiusM) {
    const radius = orbitRadiusM + EARTH_RADIUS_M;
    return 2 * Math.PI * radius;
}

function rightUnitVector(ball) {
    const len = Math.sqrt(ball.x ** 2 + ball.y ** 2)
    const normalX = ball.x / len
    const normalY = ball.y / len
    return {x: normalX, y: normalY}
}

function drawText(ctx, lines) {
    ctx.beginPath()
    ctx.fillstyle()
    ctx.font = "16px monospace"
    for (let i = 0; i < lines.length; i++) 
        ctx.fillText(lines[i], -375, -375 + 16 * (i + 1))
    ctx.fill()
}

function tick(ball, history, orbitRadiusM, tickSpeed) {
const text = [
    `hastighed: ${velocity(orbitRadiusM)} m/s`,
    `omkreds: ${circumference(orbitRadiusM)} m`,
]
let vel = velocity(orbitRadiusM) * LOOP_DELTA * tickSpeed;
let right = rightUnitVector(ball)
ball.x += vel * right.x
ball.y += vel * right.y
drawText(renderContext(), text)
runTime++
if (runtime % RUNTIME_PER_HISTORY_ADDITION == 0) {
    history.push({ ...ball })
    runtime = 0;
}

}

function loop(ctx, history, ball, orbitRadiusM, tickSpeed) {
    ctx.clearRect(-375, -375, 750, 750)
    drawEarth(ctx)
    drawHistory(ctx, history);
    drawBall(ctx, ball);
    tick(ball, history, orbitRadiusM, tickSpeed);
}

function initializeLoop() {
    const ctx = renderContext()
    const speedInput = document.querySelector("#speed")
    const tickSpeed = parseFloat(speedInput.value)
    const radiusInput = document.querySelector("#radius")
    const orbitRadiusKM = parseFloat(radiusInput.value)
    const orbitRadiusM = orbitRadiusKM * 1000
    const earthGroundLayer = -EARTH_RADIUS_M - orbitRadiusM
    const history = []
    const ball = {
        x: 0,
        y: earthGroundLayer
    }

    clearInterval(oldInterval)
    oldInterval = setInterval(() => {
        loop(ctx, history, ball, orbitRadiusM, tickSpeed)
    }, LOOP_DELTA)

}

const ctx = renderContext()
ctx.translate(375, 375)
const radiusInput = document.querySelector("#radius")
radiusInput.addEventListener("input", () => {
    initializeLoop()
})
const speedInput = document.querySelector("#speed")
speedInput.addEventListener("input", () => {
    initializeLoop()
})

radiusInput.value = "250"
speedInput.value = "1"

initializeLoop()
