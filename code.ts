figma.showUI(__html__);

(function sendData () {
  let img = getImg();
  if (img) {
    img.then((img) => {
      figma.ui.postMessage({ pluginMessage: { type: 'img', img } })
    })
  } else {
    sendMsg("No frame has been selected");
  }
})()

figma.on('selectionchange', () => {
  let img = getImg();
  if (img) {
    img.then((img) => {
      figma.ui.postMessage({ pluginMessage: { type: 'img', img } })
      sendMsg("Download your image!")
    })
  } else {
    sendMsg("Try Again");
  }
})

figma.ui.onmessage = msg => {
  if (msg.type === 'download') {
    figma.closePlugin();
  }
}

function getImg() {
  let nodes = figma.currentPage.selection;
  if (nodes.length > 0) {
    let node = nodes[0] 
    let img = node.exportAsync({format: "PNG"});
    return img
  } else {
    return false
  }
}

function sendMsg(text) {
  figma.ui.postMessage({ pluginMessage: { type: 'msg', text } });
}