var fontSize = 50


function initGallery() {
    renderGallery()

}

function renderGallery() {

    var imgs = GetImages()
    var strHTML = ''
    imgs.map(img => {
        strHTML += ` <img onclick="onChoseImg(${img.id})" src=${img.url} alt="">`
    })
    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTML
}

function renderCanvas(id) {
    var imgs = GetImages()
    var currImg = imgs.find(img => {
        return img.id === id
    })
    // console.log(currImg)
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
            drawText(line.txt, canvas.width / 2, line.y, line.size)
        })
    }
    img.src = image;
}


function drawText(text, x, y, size,) {
    if (x > 0 && y > 0) {
        var ctx = getGctx()
        ctx.font = `${size}px memes`
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'black'
        ctx.textAlign = 'center'
        ctx.fillText(text, x, y)
        ctx.strokeText(text, x, y)
    }
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
    var meme = getMemeForDisplay()
    var elInputTxt = document.querySelector('input[name=text-line')
    var memeText = elInputTxt.value
    updateLinesTxt(memeText)
    elInputTxt.value = ''
    renderCanvas(meme.selectedImgId)
}

function onReturn() {
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
    SwitchLines()
}

function onSaveMeme(){
saveMeme()

}


function onOpenSaved(){



}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}














// function renderText(fontSize) {
//     var canvas = getCanvas()
//     var meme = getMemeForDisplay()
//     var text = meme.lines[meme.selectedImgId].txt
//     drawText(text, canvas.width / 2, canvas.height / 10, fontSize)

// }