let difficulty;
let first;
let second;


function checkWin() {
    if ($(".solved").length / 2 == difficulty) {
        console.log("You win");
    }
}
function createCard(v, i) {
    let card = `<div class="outter">
            <div class="screen hide" data-id="${i}">
                <div class="card" style="background-image:url(${v})"></div>
            </div>
        </div>`
    return card;
}


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);

}


function resetFlips() {
    $(first).addClass("hide");
    $(second).addClass("hide");
    first = second = null;


}

function flip(ele) {
    console.log("ehllo");
    if (!ele.classList.contains("solved")) {

        if (!first) {
            first = ele;
            $(ele).removeClass("hide");
        } else if (!second && ele != first) {
            second = ele;
            $(ele).removeClass("hide");

            
            // console.log("aaa", $(first).children(":first")[0].attr("data-id"));
            if ($(first).attr("data-id") == $(second).attr("data-id")) {
                $(first).addClass("solved");
                $(second).addClass("solved");
                first = second = null;
                checkWin();
            }
            else {
                setTimeout(function () {
                    resetFlips();
                }, 1000);

            }

        } else {
            return;
        }


    }

}
function buttonSetUp() {
    $(".screen").click(function (d) {
        console.log(this)
        flip(this);
    });
}

$("#reset").click(function (d) {
    reset();
    buttonSetUp();
});

function startUp() {
    let array = [];
    first = second = null;

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < difficulty; j++) {
            cc = createCard(cardList[j], j);
            console.log(cc)
            array.push(cc);
        }
    }
    console.log(array)
    let shuffled = shuffle(array);
    let htmlBack = "";
    shuffled.forEach(card => {
        htmlBack = htmlBack + card;
    })
    $("#grid").html(htmlBack);
    buttonSetUp();
    resize();

}
$(".difficulty-btn").click(function (e) {
    console.log(this.dataset.diff);
    difficulty = parseInt(this.dataset.diff);
    startUp();
});

function resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let elemList = document.getElementsByClassName("outter");
    if (elemList.length > 0) {
        console.log(elemList[0].clientWidth);
        $(".outter").height(elemList[0].clientWidth);
        
    }
    
    
}

window.onresize = resize;
