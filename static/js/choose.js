let getOptions = document.getElementById('getOptions');
let select = document.getElementById('select');
let video = document.getElementById('video');
let file = document.getElementById('file');
let insVideo = document.getElementById('ins-video');
let rate = document.getElementById('rate');

    getOptions.onclick = () => {
        
        if (select.value === 'cap') {
            video.style.display = 'block';
            file.style.display = 'none';
            insVideo.style.display = 'none';
            console.log('camera')
        }
        if (select.value === 'file'){
            video.style.display = 'none';
            file.style.display = 'block';
            insVideo.style.display = 'none';
            console.log('file')
        }
        if(select.value === 'ins'){
            video.style.display = 'none';
            file.style.display = 'none';
            insVideo.style.display = 'flex';
            console.log('ins')
        }
    }
