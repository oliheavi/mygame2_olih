var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var y_begin = 0, y_end = 5, x_begin = 0, x_end = 9, diff = 0;

var TIME = 0;
document.documentElement.addEventListener('touchend', function (e) {
    var now = new Date().getTime();
    if ((now - TIME) < 100000) {
        e.preventDefault();
    }
    TIME = now;
}, false);

function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var choice1 = [
    1
]

var choice2 = [
    1,
    2, 2,
    3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5, 5
]

var choice3 = [
    1,
    2, 2,
    3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7,
    8, 8, 8, 8, 8, 8, 8, 8,
    9, 9, 9, 9, 9, 9, 9, 9, 9
]

function randchoice() {

    var ret;
    if (diff == 1) {
        var key = randint(0, choice1.length);
        ret = choice1[key];
        choice1.splice(key, 1);
    } else if (diff == 2) {
        var key = randint(0, choice2.length);
        ret = choice2[key];
        choice2.splice(key, 1);
    } else if (diff == 3) {
        var key = randint(0, choice3.length);
        ret = choice3[key];
        choice3.splice(key, 1);
    }
    return ret;
}

var field = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
];

function field_init() {
    choice1 = [
        1
    ]

    choice2 = [
        1,
        2, 2,
        3, 3, 3,
        4, 4, 4, 4,
        5, 5, 5, 5, 5
    ]

    choice3 = [
        1,
        2, 2,
        3, 3, 3,
        4, 4, 4, 4,
        5, 5, 5, 5, 5,
        6, 6, 6, 6, 6, 6,
        7, 7, 7, 7, 7, 7, 7,
        8, 8, 8, 8, 8, 8, 8, 8,
        9, 9, 9, 9, 9, 9, 9, 9, 9
    ]
    for (var y = y_begin; y < y_end; y++) {
        for (var x = x_begin; x < x_end; x++) {
            field[y][x] = randchoice();
        }
    }
}

comment_string = [
    "やりなおし～～～!"
]

var click_x = -1, click_y = -1, click_flg = false;
var mycomment_flag = 0;
window.addEventListener("click", function () {
    let cx = event.clientX;
    let cy = event.clientY;

    let ob = document.elementFromPoint(cx, cy);
    let ob_x = ob.getBoundingClientRect().left;
    let ob_y = ob.getBoundingClientRect().top;

    click_x = cx - ob_x;
    click_y = cy - ob_y;
    click_flg = true;
});

window.addEventListener("load", function () {
    document.getElementById("canvas").addEventListener("touchend", pos);
});

function pos(e) {
    if (event.changedTouches[0]) {
        let cx = e.changedTouches[0].clientX;
        let cy = e.changedTouches[0].clientY;

        let ob = document.elementFromPoint(cx, cy);
        let ob_x = ob.getBoundingClientRect().left;
        let ob_y = ob.getBoundingClientRect().top;

        click_x = cx - ob_x;
        click_y = cy - ob_y;
        click_flg = true;
    }
}

function draw_frame() {
    context.fillStyle = "white";
    for (var y = y_begin; y <= y_end; y++) {
        context.fillRect(24 + 72 * x_begin, 24 + y * 72, 72 * (x_end - x_begin), 1);
    }
    for (var x = x_begin; x <= x_end; x++) {
        context.fillRect(24 + x * 72, 24 + 72 * y_begin, 1, 72 * (y_end - y_begin));
    }
}

function draw_field() {
    for (var y = y_begin; y < y_end; y++) {
        for (var x = x_begin; x < x_end; x++) {
            context.clearRect(24 + x * 72 + 1, 24 + y * 72 + 1, 72 - 2, 72 - 2);
            if (field[y][x] != -1) {
                decide_color(field[y][x]);
                context.fillRect(24 + x * 72 + 1, 24 + y * 72 + 1, 72 - 2, 72 - 2);

                context.strokeStyle = "skyblue";
                context.fillStyle = "skyblue";
                context.font = "bold 25pt sans-serif";
                context.textAlign = "center";
                if (field[y][x] >= 10) {
                    context.fillText(Math.floor(field[y][x] / 10 + 0.1), 24 + x * 72 + 36, 24 + y * 72 + 36 + 12.5);
                }
            }
        }
    }
}

function decide_color(field_num) {
    if (field_num < 10 && field_num != -1) {
        context.fillStyle = "gray";
    } else if (field_num != -1) {
        context.fillStyle = "white";
    }
}

function display_message() {
    window.alert("神経衰弱のアレンジゲーム。\nカードに書いてある数字の値だけ、同じカードがある。\n例えば、5のカードは5枚あり、3のカードは3枚ある。\n同じカードを全て表にできたら、そのカードは場から取り除かれる。\n一人用のゲーム。クリック回数が少ないほどランクは上がる。\n\nEASYではカードは1のみ。\nNORMALでは1~5のカードがある。\nHARDでは1~9のカードがある。");
}


var first_choose = -1;
function choosing() {
    var flag;
    var cnt = 0;

    for (var y = y_begin; y < y_end; y++) {
        for (var x = x_begin; x < x_end; x++) {
            if (field[y][x] == first_choose * 10) {
                cnt++;
            } else if (field[y][x] >= 10) {
                flag = 2;
            }
        }
    }

    if (flag != 2) {
        if (cnt == first_choose) flag = 1;
        else flag = 3;
    }

    return flag;
}

function remove_chosen_cards() {
    for (var y = y_begin; y < y_end; y++) {
        for (var x = x_begin; x < x_end; x++) {
            if (field[y][x] >= 10) {
                field[y][x] = -1;
            }
        }
    }
}

function reverse_all_cards() {
    for (var y = y_begin; y < y_end; y++) {
        for (var x = x_begin; x < x_end; x++) {
            if (field[y][x] >= 10) {
                field[y][x] /= 10;
            }
        }
    }
}

function game_clear() {
    var clear = true;
    for (var y = y_begin; y < y_end; y++) {
        for (var x = x_begin; x < x_end; x++) {
            if (field[y][x] != -1) {
                clear = false;
            }
        }
    }

    return clear;
}



var process = 1, click_counter = 0, player = 0, first_flg = true;
var point = 0, click_cnt = 0, mental_destroyer = 0, title_screen = true;
var disp_string = comment_string[randint(0, 3)], time_cnt = 0;

requestAnimationFrame(main);
function main() {
    context.clearRect(0, 0, 696, 696);

    if (first_flg == true && diff != 0) {
        field_init();
        first_flg = false;
    }
    if (diff != 0) {
        draw_frame();
        draw_field();
        context.strokeStyle = "yellow";
        context.fillStyle = "yellow";
        context.font = "bold 40pt sans-serif";
        context.textAlign = "center";
        context.fillText("クリック回数:" + click_counter, 24 + 5 * 72 - 36, 24 + 3 * 72 + 4 * 72);
    }



    switch (process) {
        case 1:
            if (title_screen == true) {
                context.strokeStyle = "skyblue";
                context.fillStyle = "skyblue";
                context.font = "bold 20pt sans-serif";
                context.textAlign = "center";
                context.fillText("ルールを確認", 24 + 72 * 4 + 36, 24 + 24, 200);


                context.fillStyle = "green";
                context.fillRect(24 + 72 * 2 - 36, 24 + 72 * 2, 72 * 6, 72);
                context.fillRect(24 + 72 * 2 - 36, 24 + 72 * 4, 72 * 6, 72);
                context.fillRect(24 + 72 * 2 - 36, 24 + 72 * 6, 72 * 6, 72);

                context.strokeStyle = "blue";
                context.fillStyle = "blue";
                context.font = "bold 62pt sans-serif";
                context.textAlign = "center";
                context.fillText("EASY", 24 + 72 * 4 + 36, 24 + 72 * 2 + 72 - 5);
                context.fillText("NORMAL", 24 + 72 * 4 + 36, 24 + 72 * 4 + 72 - 5);
                context.fillText("HARD", 24 + 72 * 4 + 36, 24 + 72 * 6 + 72 - 5);


                context.strokeStyle = "skyblue";
                context.fillStyle = "skyblue";
                context.font = "bold 20pt sans-serif";
                context.textAlign = "center";

                if (mycomment_flag % 2 == 0) context.fillText("onにする", 24 + 72 * 4 + 36, 24 + 72 * 8 + 72, 80);
                else context.fillText("offにする", 24 + 72 * 4 + 36, 24 + 72 * 8 + 72, 80);


                if (24 + 72 * 2 - 36 <= click_x && click_x < 24 * 72 * 8 - 36 && click_flg == true) {
                    if (24 + 72 * 2 <= click_y && click_y < 24 + 72 * 2 + 72) {
                        y_begin = 2;
                        y_end = 3;
                        x_begin = 4;
                        x_end = 5;
                        diff = 1;

                        click_flg = false;
                        title_screen = false;
                    } else if (24 + 72 * 4 <= click_y && click_y < 24 + 72 * 4 + 72) {
                        y_begin = 1;
                        y_end = 4;
                        x_begin = 2;
                        x_end = 7;
                        diff = 2;

                        click_flg = false;
                        title_screen = false;
                    } else if (24 + 72 * 6 <= click_y && click_y < 24 + 72 * 6 + 72) {
                        y_begin = 0;
                        y_end = 5;
                        x_begin = 0;
                        x_end = 9;
                        diff = 3;

                        click_flg = false;
                        title_screen = false;
                    }
                }
                if (24 + 72 * 4 + 36 - 40 <= click_x && click_x < 24 + 72 * 4 + 36 + 40 && 24 + 72 * 8 + 52 <= click_y && click_y < 24 + 72 * 8 + 72 && click_flg == true) {
                    mycomment_flag++;
                    click_flg = false;
                }
                if (24 + 72 * 4 + 36 - 100 <= click_x && click_x < 24 + 72 * 4 + 36 + 100 && 24 + 4 <= click_y && click_y < 24 + 24 && click_flg == true) {
                    display_message();
                    click_flg = false;
                }
                process = 1;
            } else {
                if (game_clear() == true) {
                    process = 5;
                } else if (first_choose != -1) {
                    if (choosing() == 1) {
                        first_choose = -1;
                        process = 3;
                    } else if (choosing() == 2) {
                        first_choose = -1;
                        process = 4;
                    } else if (choosing() == 3) {
                        process = 2;
                    }
                } else {
                    process = 2;
                }
            }

            break;
        case 2:
            var cursor_x = Math.floor((click_x - 24) / 72 + 0.01), cursor_y = Math.floor((click_y - 24) / 72 + 0.01);
            if (x_begin <= cursor_x && cursor_x < x_end && y_begin <= cursor_y && cursor_y < y_end && click_flg == true) {
                if (field[cursor_y][cursor_x] < 10 && field[cursor_y][cursor_x] != -1) {
                    if (first_choose == -1) {
                        first_choose = field[cursor_y][cursor_x];
                    }
                    field[cursor_y][cursor_x] *= 10;
                    click_counter++;
                }
            }


            click_flg = false;
            process = 1;



            break;
        case 3:
            if (time_cnt % 30 == 29) {
                time_cnt = 0;
                remove_chosen_cards();
                process = 1;
            } else {
                time_cnt++;
            }
            break;
        case 4:

            context.strokeStyle = "red";
            context.fillStyle = "red";
            context.font = "bold 60pt sans-serif";
            context.textAlign = "center";

            if (time_cnt % 30 == 29) {
                reverse_all_cards();
                if (mycomment_flag % 2 == 1) {
                    if (mental_destroyer % 80 == 79) {
                        process = 1;
                        mental_destroyer = 0;
                        time_cnt = 0;
                        disp_string = comment_string[randint(0, 3)];
                    } else {
                        mental_destroyer++;
                        context.fillText(disp_string, 24 + 5 * 72 - 36, 24 + 3 * 72 - 6, mental_destroyer * 9);
                    }
                    click_flg = 0;
                } else {
                    time_cnt = 0;
                    process = 1;
                }
            } else {
                time_cnt++;
            }

            break;
        case 5:
            context.strokeStyle = "yellow";
            context.fillStyle = "yellow";
            context.font = "bold 40pt sans-serif";
            context.textAlign = "center";
            context.fillText("CLEAR", 24 + 5 * 72 - 36, 24 + 2 * 72 + 4 * 72);

            if (diff == 1) {
                context.fillText("ランク:E", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
            } else if (diff == 2) {
                if (click_counter <= 25) {
                    context.fillText("ランク:S", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                    if (mycomment_flag % 2 == 1) {
                        context.font = "bold 10pt sans-serif";
                    }
                } else if (click_counter <= 45) {
                    context.fillText("ランク:A", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else if (click_counter <= 65) {
                    context.fillText("ランク:B", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else if (click_counter <= 85) {
                    context.fillText("ランク:C", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else if (click_counter <= 105) {
                    context.fillText("ランク:D", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else {
                    context.fillText("ランク:E", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                }
            } else if (diff == 3) {
                if (click_counter <= 100 && mycomment_flag % 2 == 1) {
                    context.fillText("ランク:ずる", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else if (click_counter <= 300) {
                    context.fillText("ランク:S", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else if (click_counter <= 400) {
                    context.fillText("ランク:A", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else if (click_counter <= 500) {
                    context.fillText("ランク:B", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else if (click_counter <= 600) {
                    context.fillText("ランク:C", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else if (click_counter <= 700) {
                    context.fillText("ランク:D", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                } else {
                    context.fillText("ランク:E", 24 + 5 * 72 - 36, 24 + 4 * 72 + 4 * 72);
                }
            }

            context.strokeStyle = "skyblue";
            context.fillStyle = "skyblue";
            context.font = "bold 20pt sans-serif";
            context.fillText("リスタートするなら画面をclick", 24 + 5 * 72 - 36, 24 + 5 * 72 + 4 * 72);
            if (click_flg == true && 0 <= click_y && click_y <= 696 && 0 <= click_x && click_x <= 696) {
                click_flg = false;
                first_flg = true;
                diff = 0;
                title_screen = true;
                click_counter = 0;
                mycomment_flag = 0;
                process = 1;
            }

            break;
    }

    requestAnimationFrame(main);
}