let getOptions = document.getElementById('getOptions');
let select = document.getElementById('select');
let video = document.getElementById('video');
let file = document.getElementById('file');

    getOptions.onclick = () => {
        if (select.value === 'camera') {
            video.style.display = 'block';
            file.style.display = 'none';
            console.log('camera')
        }
        else {
            video.style.display = 'none';
            file.style.display = 'block';
            console.log('file')
        }
    }
