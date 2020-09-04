const $ = require('jquery')

$.ajax({
    url: '/images',
    type: 'get',
    contentType: "application/json; charset=utf-8", // <- this is what you should add
    success: function(response) {
        if (response != 0) {
            console.log(response);
            const div = document.createElement('div')
            div.className = 'row'
            document.body.appendChild(div)
            response.files.forEach((element) => {
                console.log(element)
                let myElment = document.createElement('div')
                myElment.className = 'col s12'
                div.appendChild(myElment)
                let img = document.createElement('img')
                img.style.width = '100%'
                img.src = '../' + element
                myElment.appendChild(img)
            })
        } else {
            alert('file not uploaded');
        }
    },
});