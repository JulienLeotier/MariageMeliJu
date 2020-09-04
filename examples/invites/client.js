'use strict';

const createExample = require('../../lib/browser/example');

const description = 'View a broadcast. You should have already started the \
broadcast example. Although you can prototype such a system with  node-webrtc, \
you should consider using an \
<a href="https://webrtcglossary.com/sfu/" target="_blank">SFU</a>.';

const remoteVideo = document.createElement('video');
remoteVideo.autoplay = true;

async function beforeAnswer(peerConnection) {
    const remoteStream = new MediaStream(peerConnection.getReceivers().map(receiver => receiver.track));
    remoteVideo.srcObject = remoteStream;

    // NOTE(mroberts): This is a hack so that we can get a callback when the
    // RTCPeerConnection is closed. In the future, we can subscribe to
    // "connectionstatechange" events.
    const {
        close
    } = peerConnection;
    peerConnection.close = function() {
        remoteVideo.srcObject = null;
        return close.apply(this, arguments);
    };
}

createExample('viewer', description, {
    beforeAnswer
});

const videos = document.createElement('div');
videos.className = 'grid';
videos.appendChild(remoteVideo);
document.body.appendChild(videos);
const div = document.createElement('div');
setInterval(() => {
    if (new Date() >= new Date('Sat Sep 26 2020 16:00:00 GMT+0200 (heure d’été d’Europe centrale)')) {
        div.innerHTML = `<p style="text-align: center; background: -webkit-linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
    background: linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">La cérémonie à commencer</p>`
    } else if (new Date() >= new Date('Sat Sep 26 2020 16:30:00 GMT+0200 (heure d’été d’Europe centrale)')) {
        div.innerHTML = `<p style="text-align: center; background: -webkit-linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
    background: linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">La cérémonie est terminer</p>`

    } else {
        div.innerHTML = `<p style="text-align: center; background: -webkit-linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
    background: linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">La cérémonie n'a pas commencer</p>`
    }
    document.body.appendChild(div)
}, 1000)
document.body.style.background = 'black';