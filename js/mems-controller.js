var fontSize = 50
var gMousedown;



function initGallery() {
    renderGallery()

}

function renderGallery() {

    var imgs = GetImages()
    var strHTML = ''
    imgs.map(img => {
        strHTML += ` <img class="gallery-imgs" onclick="onChoseImg(${img.id})" src=${img.url} alt="">`
    })
    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTML
}

function renderCanvas(id) {
    var imgs = GetImages()
    var currImg = imgs.find(img => {
        return img.id === id
    })
    drawImg(currImg.url)
}


function drawImg(image) {
    var canvas = getCanvas()
    var ctx = getGctx()
    var meme = getMemeForDisplay()
    var img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        meme.lines.forEach(line => {
            drawText(line.txt, line.x, line.y, line.size, line.color, line.stroke, line.align, line.fontFamily)

        })
        if (meme.lines.length > 0) {
            drawRect(meme.lines[meme.selectedLineIdx].x, meme.lines[meme.selectedLineIdx].y, ((meme.lines[meme.selectedLineIdx].txt.length) + (meme.lines[meme.selectedLineIdx].size)), meme.lines[meme.selectedLineIdx].size)
        }
    }

    img.src = image;
}






function drawText(text, x, y, size, fontColor, strokeColor, align = 'right', fontFamily = 'memes') {
    if (x > 0 && y > 0) {
        var ctx = getGctx()
        ctx.font = `${size}px ${fontFamily}`
        ctx.fillStyle = `${fontColor}`
        ctx.strokeStyle = `${strokeColor}`
        ctx.textAlign = align
        ctx.fillText(text, x, y)
        ctx.strokeText(text, x, y)
    }
}



function onChangeColor() {
    var meme = getMemeForDisplay()
    var elColor = document.querySelector('input[name=font-color]')
    updateColor(elColor.value)
    renderCanvas(meme.selectedImgId)

}

function onChangeStroke() {
    var meme = getMemeForDisplay()
    var elStroke = document.querySelector('input[name=stroke-color]')
    updateStrokeColor(elStroke.value)
    renderCanvas(meme.selectedImgId)

}


function onChoseImg(id) {
    var elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.hidden = true
    var elContainer = document.querySelector('.container')
    elContainer.hidden = false
    var elReturn = document.querySelector('.btn-return')
    elReturn.hidden = false
    showCanvas()
    chosenImage(id)
    renderCanvas(id)



}


function onSubmit() {
    gEdit = true
    var meme = getMemeForDisplay()
    var elInputTxt = document.querySelector('input[name=text-line')
    var memeText = elInputTxt.value
    updateLinesTxt(memeText)
    elInputTxt.value = ''
    renderCanvas(meme.selectedImgId)

}

function onReturn() {
    var elSaved = document.querySelector('.saved-memes')
    elSaved.hidden = true
    elSaved.style.display = 'none'

    var elReturn = document.querySelector('.btn-return')
    elReturn.hidden = true
    var elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.hidden = false
    var elContainer = document.querySelector('.container')
    elContainer.hidden = true
    clearText()
}


function onIncreaseFont() {

    var meme = getMemeForDisplay()
    increasSize()
    renderCanvas(meme.selectedImgId)

}

function onDecreaseFont() {
    var meme = getMemeForDisplay()
    decreaseSize()
    renderCanvas(meme.selectedImgId)
}

function onMoveDown() {
    var meme = getMemeForDisplay()
    updatePoistionDown()
    renderCanvas(meme.selectedImgId)
}

function onMoveUp() {
    var meme = getMemeForDisplay()
    updatePoistionUp()
    renderCanvas(meme.selectedImgId)
}

function onSwitchLines() {
    gEdit = true
    var meme = getMemeForDisplay()
    SwitchLines()
    drawRect(meme.lines[meme.selectedLineIdx].x, meme.lines[meme.selectedLineIdx].y, ((meme.lines[meme.selectedLineIdx].txt.length) + (meme.lines[meme.selectedLineIdx].size)), meme.lines[meme.selectedLineIdx].size)
    renderCanvas(meme.selectedImgId)
}


var gEdit = true
function drawRect(x, y, width, height) {
    var meme = getMemeForDisplay()
    width = width / 7
    gCtx.beginPath()
    gCtx.strokeStyle = 'white'
    var align = meme.lines[meme.selectedLineIdx].align
    if (meme.lines[meme.selectedLineIdx].txt.length >= 6 && meme.lines[meme.selectedLineIdx].txt.length < 11) {
        console.log('bigger the 6')
        width *= 2
        console.log(width)
    }
    else if (meme.lines[meme.selectedLineIdx].txt.length >= 11) {
        console.log('bigger the 11')
        width *= 3
        console.log(width)
    }
    if (align === 'left') {
        gCtx.rect(x - (width * 1.1), y - height, width * 13, height + 5)
    }
    else if (align === 'center') {
        gCtx.rect(x - (width * 7), y - height, width * 13, height + 5)
    }
    else if (align === 'right') {
        gCtx.rect(x - (width * 12.5), y - height, width * 13, height + 5)
    }

    if (gEdit) {
        gCtx.stroke()
    }
}

function finishEdit() {
    var meme = getMemeForDisplay()
    gEdit = false
    renderCanvas(meme.selectedImgId)
}

var saved = []

function onSaveMeme() {
    var canvas = getCanvas()
    const data = canvas.toDataURL();
    var elSaved = document.querySelector('.saved-memes')
    saved.push(data)
    var strHTML = ''
    saved.forEach(save => {
        strHTML += ` <img src=${save} alt="">`

    })
    elSaved.innerHTML = strHTML

}

function onOpenSaved() {
    var elSaved = document.querySelector('.saved-memes')
    elSaved.hidden = false
    elSaved.style.display = 'grid'

    var elContainer = document.querySelector('.container')
    elContainer.hidden = true
    var elReturn = document.querySelector('.btn-return')
    elReturn.hidden = false
    var elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.hidden = true


}



function downloadCanvas(elLink) {
    var canvas = getCanvas()
    const data = canvas.toDataURL();
    elLink.href = data;
    elLink.download = `meme.jpg`;

}

function onRenderEmoji(emojis, ev) {
    var emoji = emojis.innerText
    var meme = getMemeForDisplay()
    renderEmoji(emoji)
    renderCanvas(meme.selectedImgId)
}


function onDrag(ev) {
    gMousedown = true
}


function onDrop(ev) {
    gMousedown = false
}

function onMove(ev) {
    if (gMousedown) {
        var meme = getMemeForDisplay()
        var x = ev.offsetX
        var y = ev.offsetY
        console.log(x)
        console.log(y)
        changePosition(x, y)
        renderCanvas(meme.selectedImgId)
    }
}


function onAlignLeft() {
    var meme = getMemeForDisplay()
    updateAlign('left')
    renderCanvas(meme.selectedImgId)
}

function onAlignCenter() {
    var meme = getMemeForDisplay()
    updateAlign('center')
    renderCanvas(meme.selectedImgId)
}

function onAlignRight() {
    var meme = getMemeForDisplay()
    updateAlign('right')
    renderCanvas(meme.selectedImgId)
}

function onChangeFont(font) {
    var meme = getMemeForDisplay()
    changeFont(font.value)
    renderCanvas(meme.selectedImgId)
}

function onDeleteLine() {
    var meme = getMemeForDisplay()
    deleteLine()
    renderCanvas(meme.selectedImgId)

}

function onFilterGallery(ev) {
    filterGallery(ev.key)
    if (gImgs.length === 0) gImgs = gImgsCopy
    renderGallery()
}

function handleTouch(ev) {
    var meme = getMemeForDisplay()
    ev.preventDefault()
    gCanvas = document.querySelector('.my-canvas')
    const gCan = new Hammer(gCanvas);
    gCan.on('pan', function (ev) {
        touchAndDrop((ev.center.x), (ev.center.y))
        renderCanvas(meme.selectedImgId)
    });
}

