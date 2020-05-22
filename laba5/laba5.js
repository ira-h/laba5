let loadMore = true;
var gridCont = document.getElementById('grid-wrapper');
for(let i=0;i<50;i++)
{
	var di = document.createElement("div");
	di.className = "box";
	di.innerHTML="<img src='' alt=''>";
	gridCont.appendChild(di);
}
document.getElementById('load-btn').addEventListener('click', firstLoad);
let load = document.getElementById('loader');

function firstLoad(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let items = Array.from(document.getElementsByClassName('box'));
            let result = JSON.parse(xhr.responseText);
            for(let i = 0; i < 50; i++){
                items[i].children[0].setAttribute('src', `${result.results[i].picture.large}`);
            }
        }
    };
    xhr.open("GET", "https://randomuser.me/api/?results=50", true);
    $.ajax({
        beforeSend: function() {
            $('.loader').show();
        },
        complete: function() {
            $(".loader").fadeOut("slow");
        }
    });
    xhr.send();
}
$(window).on('load', preloader);

function preloader() {
    $(".loader").fadeOut("slow");
}


window.onscroll = function(ev) {
    if (((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) && loadMore) {
        for(let i = 0; i < 25; i++){
            gridCont.innerHTML += '<div class=\"box\"><img src=\"\" alt=\"\"></div>';
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let updatedItems = Array.from(document.getElementsByClassName('box'));
                let result = JSON.parse(xhr.responseText);
                let j = 0;
                for(let i = 50; i < 75; i++){
                    updatedItems[i].children[0].setAttribute('src', `${result.results[j].picture.large}`);
                    j++;
                }
            }
        };
        xhr.open("GET", "https://randomuser.me/api/?results=50", true);
        xhr.send();
        loadMore = false;
    }
};
