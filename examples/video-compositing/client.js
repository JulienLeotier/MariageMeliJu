'use strict';

const createExample = require('../../lib/browser/example');
const $ = require('jquery')

const description = 'This example uses node-webrtc&rsquo;s RTCVideoSource and \
RTCVideoSink along with <a href="https://github.com/Automattic/node-canvas">\
node-canvas</a> to superimpose a spinning, colorful animation on top of the \
incoming video.';


const remoteVideo = document.createElement('video');
remoteVideo.autoplay = true;

async function beforeAnswer(peerConnection) {
    const localStream = await window.navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

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

        localStream.getTracks().forEach(track => track.stop());

        return close.apply(this, arguments);
    };
}

createExample('video-compositing', description, {
    beforeAnswer
});
const videos = document.createElement('div');
videos.style.width = '100%'
videos.className = 'grid';
videos.appendChild(remoteVideo);
document.body.appendChild(videos);
const mydiv = document.createElement('div')
mydiv.className = 'mybtnDiv'
document.body.appendChild(mydiv)
const pictureButton = document.createElement('button');
pictureButton.innerText = 'Prendre la photo'
mydiv.appendChild(pictureButton);
const div = document.createElement('div');
const divImage = document.createElement('div');
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function() {
            supportsPassive = true;
        }
    }));
} catch (e) {}

var wheelOpt = supportsPassive ? {
    passive: false
} : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
window.addEventListener('keydown', preventDefaultForScrollKeys, false);

document.body.appendChild(div);
document.body.appendChild(divImage);


pictureButton.addEventListener('click', async() => {
    var center = document.createElement('center')
    center.innerHTML = `  <div class="count-down">
    <span>5</span>
  </div>`
    document.body.appendChild(center)

    var counterDown = setInterval(function() {
        var span = $("span").html();
        var counter = parseInt(span);
        console.log(counter)
        if (counter !== 0) {
            $("span").html(counter - 1);
            if (counter === 10) {
                $(".count-down").css({
                    backgroundColor: "orange"
                });
            } else if (counter === 5) {
                $(".count-down").css({
                    backgroundColor: "black"
                });
            }
        } else {
            clearInterval(counterDown);
            var video = document.querySelector('video'),
                canvas;
            var img = document.querySelector('img') || document.createElement('img');
            var context;
            var width = video.offsetWidth,
                height = video.offsetHeight;

            canvas = canvas || document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, width, height);

            img.src = canvas.toDataURL('image/png');
            img.id = 'image-id'
            var image = canvas.toDataURL('image/png');
            $.ajax({
                url: '/upload',
                type: 'post',
                data: JSON.stringify({
                    base64image: image
                }),
                contentType: "application/json; charset=utf-8", // <- this is what you should add
                success: function(response) {
                    if (response != 0) {
                        location.reload()
                    } else {
                        alert('file not uploaded');
                    }
                },
            });
        }
    }, 1000);


});