let difficulty;
let first;
let second;


function checkWin() {
    if ($(".solved").length / 2 == difficulty) {
        console.log("You win");
    }
}
function createCard(v, i) {
    let card = `<div data-id="${i}" class="outter hide">
            <div>
                <div class="screen"></div>
                <div class="card" style="background-image:url(${v})"></div>
            </div>
        </div>`
    return card;
}


// let cardList = ["red", "blue", "green", "yellow", "purple", "pink", "grey", "orange", "lime", "cyan", "darkred", "darkgrey"];
let cardList = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/330px-Tomato_je.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/330px-Patates.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Iceberg_lettuce_in_SB.jpg/330px-Iceberg_lettuce_in_SB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cucumber_BNC.jpg/330px-Cucumber_BNC.jpg",
    
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mixed_onions.jpg/330px-Mixed_onions.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/JfGomezSanta_RosaNueva_Ecijafvf_02.JPG/330px-JfGomezSanta_RosaNueva_Ecijafvf_02.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/%27Lady_Williams%27_apples.jpg/330px-%27Lady_Williams%27_apples.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/330px-Pineapple_and_cross_section.jpg",

    "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single.jpg/330px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/330px-Table_grapes_on_white.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Raspberry_-_halved_%28Rubus_idaeus%29.jpg/216px-Raspberry_-_halved_%28Rubus_idaeus%29.jpg"
]

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
    $(".outter").click(function (d) {
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

}
$(".difficulty-btn").click(function (e) {
    console.log(this.dataset.diff);
    difficulty = parseInt(this.dataset.diff);
    startUp();
});


