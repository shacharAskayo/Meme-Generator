'use strict'

var gCanvas = document.querySelector('.my-canvas')
var gCtx;
var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 0, url: 'img/1.jpg', keyWords: ['funny,sad'] },
    { id: 1, url: 'img/2.jpg', keyWords: ['sad,animal'] },
    { id: 2, url: 'img/3.jpg', keyWords: ['sleep,animal'] },
    { id: 3, url: 'img/4.jpg', keyWords: ['animal'] },
    { id: 4, url: 'img/5.jpg', keyWords: ['funny'] },
    { id: 5, url: 'img/6.jpg', keyWords: ['funny'] },
    { id: 6, url: 'img/7.jpg', keyWords: ['funny'] },
    { id: 7, url: 'img/8.jpg', keyWords: ['funny'] },
    { id: 8, url: 'img/9.jpg', keyWords: ['funny'] },
    { id: 9, url: 'img/10.jpg', keyWords: ['funny'] },
    { id: 10, url: 'img/11.jpg', keyWords: ['funny'] },
    { id: 11, url: 'img/12.jpg', keyWords: ['funny'] },
    { id: 12, url: 'img/13.jpg', keyWords: ['funny'] },
    { id: 13, url: 'img/14.jpg', keyWords: ['funny'] },
    { id: 14, url: 'img/15.jpg', keyWords: ['funny'] },
    { id: 15, url: 'img/16.jpg', keyWords: ['funny'] },
    { id: 16, url: 'img/17.jpg', keyWords: ['animal'] },
    { id: 17, url: 'img/18.jpg', keyWords: ['funny'] },
];




var gSavedMemes = []



var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [createLines('')]
}


function createLines(txt) {
    return {
        txt,
        size: 30,
        align: 'center',
        color: 'white',
        stroke: 'black',
        fontFamily: 'memes',
        x: gCanvas.width / 2,
        y: getRandomInt(50, gCanvas.height)
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetImages() {
    return gImgs

}

    



function init() {
    initGallery()
    console.log(document.body.clientWidth)
}



function showCanvas() {
    var elCanvasContainer = document.querySelector('.canvas-container')
    gCanvas = document.querySelector('.my-canvas')
    gCtx = gCanvas.getContext('2d')
    gCanvas.width = (elCanvasContainer.offsetWidth) * 0.8
    gCanvas.height = (elCanvasContainer.offsetHeight) * 0.85
}

function touchAndDrop(x, y) {
    var X = x - gCtx.canvas.offsetLeft
    var Y = y - gCtx.canvas.offsetTop

    gMeme.lines[gMeme.selectedLineIdx].x = X
    gMeme.lines[gMeme.selectedLineIdx].y = Y
}

function getMemeForDisplay() {
    return gMeme
}

function getCanvas() {
    return gCanvas
}

function getGctx() {
    return gCtx
}

function chosenImage(imageId) {
    gMeme.selectedImgId = imageId
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}


function editLine(txt) {
    if (gMeme.selectedLineIdx !== -1) {
        gMeme.lines[gMeme.selectedLineIdx].txt = txt
    }
    else {
        nextLine
    }

}




function nextLine() {
    gMeme.lines.push(createLines('type here'))
    gMeme.selectedLineIdx++
}



function renderEmoji(emoji) {
    gMeme.lines.push(createLines(emoji))
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}
function updateColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function updateStrokeColor(strokeColor) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = strokeColor
    // SwitchLines()
}

function getText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function getFontSize() {
    return gMeme.lines[gMeme.selectedLineIdx].size
}

function increasSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function decreaseSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function updatePoistionDown() {
    gMeme.lines[gMeme.selectedLineIdx].y += 10

}

function updatePoistionUp() {
    gMeme.lines[gMeme.selectedLineIdx].y -= 10

}

function SwitchLines() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}



function clearText() {
    gMeme.lines.forEach(line => {
        line.txt = ''
    })
}


function changePosition(x, y) {
    // console.log('x',x)
    gMeme.lines[gMeme.selectedLineIdx].x = x
    gMeme.lines[gMeme.selectedLineIdx].y = y


}

function updateAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = font

}
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    SwitchLines()
}



var gImgsCopy = [...gImgs];
function filterGallery(letter) {
    console.log(letter)
    var filterdImage = gImgs.filter((img, idx) => {
        idx = img.keyWords.length - 1
        return img.keyWords[idx].split('').includes(letter)
    })
    gImgs = filterdImage


}























