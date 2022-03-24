const Elements = ['v-file', 'v-auto', 'v-manual']
let kVal = localStorage.getItem("kValues");
let l = JSON.parse(kVal)
let d = new Date();
let hours = d.getHours();
let minutes = d.getMinutes();
let seconds = d.getSeconds();
let date = d.getDate();
let month = d.getMonth() + 1;
let year = d.getFullYear();


for (let i = 0; i < Elements.length; i++) {
    const element = document.getElementById(Elements[i])
    element.addEventListener('click', () => {
        Style(element)
        document.getElementById('main').innerHTML = Elements[i]
        const E = Elements.filter(e => e !== element.id)
        console.log(E)
        for (let j = 0; j < E.length; j++) {
            unStyle(document.getElementById(E[j]))
        }
    })
}

const Style = (element) => {
    element.style.backgroundColor = 'blue'
    element.style.color = 'white'
}

const unStyle = (element) => {
    element.style.backgroundColor = 'rgb(248, 248, 248)'
    element.style.color = 'black'
}

for (let i = 0; i < l.k; i++) {
    let img = document.createElement('img')
    img.src = '/static/capture' 
    console.log(img)
    document.getElementById('main').appendChild(img)
}