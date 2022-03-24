let nVal = localStorage.getItem("nValue");
let o = JSON.parse(nVal)
console.log(o)

if(o === null){
    localStorage.setItem('nValue', JSON.stringify({
      n: Number(1)
    }))
    console.log(o.n)
  }
  console.log(o.n)

let Auto = null;

$("#on").on("click", () => {
    console.log("Start");
    console.log("Detecting");
    On();
    Auto = setInterval(() => {
        console.log("Detecting");
        On();
        getInfo();
    }, document.getElementById('rate').value *1000 + 100);
})

$('#reset').on('click',()=>{
    console.log("Reset");
    clearInterval(Auto)
    Reset();
})

function On() {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    if (o.n == 1) {
        setTimeout(
            function () {
                $("#detected").attr('src', '/static/de/' + hours + 'h' + minutes + 'm' + seconds + 's_' + date + '_' + month + '_' + year + '.png');
                localStorage.setItem('nValue', JSON.stringify({
                    n: Number(o.n += 1)
                  }))
                console.log("On " + o.n);
            }, document.getElementById('rate').value *1000);
    }
    else {
        setTimeout(function () {
            $("#detected").attr('src', '/static/de' + o.n + '/' + hours + 'h' + minutes + 'm' + seconds + 's_' + date + '_' + month + '_' + year + '.png');
            localStorage.setItem('nValue', JSON.stringify({
                //Insert Number(value)
                n: Number(o.n += 1)
             }))
            console.log("On " + o.n);
        }, document.getElementById('rate').value *1000);
    }
    $.getJSON('/ins',
        function (data) {
            //do nothing
        });
    return false;
}

function Reset() {
    $.getJSON('/reset',
        function (data) {
            //do nothing
        });
    setTimeout(getInfo(),document.getElementById('rate').value *1000);
    return false;
}

function getInfo() {
    $.getJSON("../static/ins.json", function (data) {
        var items = [];
        $.each(data, function (key, val) {
            items.push("<p class='item' id='" + key + "'>"
                + key + " : " + val + "</p>");
        });

        console.log(items);

        $("#list2").html(items)
    });
}

$("#off").on('click', () => {
    console.log("Stop");
    clearInterval(Auto)
});