'use strict'

var gCanvas;
var gCtx;
var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [];


createGallery()
function createGallery() {
    for (var i = 0; i <= 17; i++) {
        createImg(i, i + 1)
    }
}

function createImg(id, imgNum) {
    var meme = {
        id: id,
        url: `img/${imgNum}.jpg`,
        keywords: ['funny']
    }
    gImgs.push(meme)
}

var gSavedMemes = []

function createMemes (id,idx,txt1,txt2){
    return{
        selectedImgId:id,
        selectedLineIdx:idx,
        lines:[
            {
                txt:txt1,
                size: 20,
                align: 'left',
                color: 'red',
                x: 0,
                y: 75
            },
            {
            txt:txt2,
            size: 20,
            align: 'left',
            color: 'red',
            x: 0,
            y: 75
            }
        ]
    }
    
}

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red',
            x: 0,
            y: 75
        },
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red',
            x: 0,
            y: 100
        },
        // {
        //     txt: '',
        //     size: 20,
        //     align: 'left',
        //     color: 'red',
        //     x:0,
        //     y:75
        // }
    ]
}


function GetImages() {
    return gImgs

}

function init() {
    initGallery()
}
function showCanvas() {
    var elCanvasContainer = document.querySelector('.canvas-container')
    gCanvas = document.querySelector('.my-canvas')
    gCtx = gCanvas.getContext('2d')
    gCanvas.width = (elCanvasContainer.offsetWidth) * 0.8
    gCanvas.height = (elCanvasContainer.offsetHeight) * 0.85
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

var linesCounter = 0
function updateLinesTxt(text) {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) linesCounter = 0
    gMeme.selectedLineIdx = linesCounter
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    linesCounter++
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


function saveMeme() {
    // var currMeme = gMeme
    gSavedMemes.push(createMemes(gMeme.selectedImgId,gMeme.selectedLineIdx,gMeme.lines.forEach(line=>{return line.txt})))
    // var currMeme = Object.assign({}, gMeme)
    // gSavedMemes.push(currMeme)
    // saveToStorage('memes', gSavedMemes)

}

function clearText() {
    gMeme.lines.forEach(line => {
        line.txt = ''
    })
}

// function currPositionY() {
//     return gMeme.lines[gMeme.selectedLineIdx].y
// }
























// function currPositionX(){
//     return gMeme.lines[gMeme.selectedLineIdx].x
// }