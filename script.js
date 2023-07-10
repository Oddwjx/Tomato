// 收集字母
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// 手机字母下落的屏幕
var screen = $('.screen');

// 记分牌
var counters = $('.score');

// 分数
var score = 0;

// 字母初始下落
var len = 3;

// 初始关卡
var level = 1;

// 创建字母的定时器
var createTimer;

// 字母下落的定时器
var downTimer;

// 开始游戏
function init_game() {
  $('.defeat').hide();
  $('.success').hide();
  createLetter();
  downLetter();
  window.onkeydown = keyDown;
}

// 创建字母，设置样式，周期出现
function createLetter() {
  createTimer = setInterval(function() {
    //获取所有的字母
    var divs = screen.children('.letter');
    //当div已经有len个了，不在创建
    if (len != divs.length){
      var letter = $('<div class="letter"></div>');
    var math_left = Math.round(Math.random() * (screen.width() - letter.width())); // 生成随机的水平位置

    var l = Math.round(Math.random() * 25); // 生成 0 到 25 之间的随机整数
    var letterChar = letters[l]; // 获取随机字母

    letter.css({
      "background": "url(image/字母/" + letterChar + ".png)",
      "background-repeat": "no-repeat",
      "background-size": "100px",
      "top": "0px",
      "left": math_left + "px"
    });
    screen.append(letter);
    }
  }, 1000);
}

// 字母下落
function downLetter() {
  downTimer = setInterval(function() {
    var divs = screen.children('.letter');
    for (var i = 0; i < divs.length; i++) {
      var div = $(divs[i]);
      var top = div.css('top');
      top = parseFloat(top) + level;
      if (600>top){
        div.css({
        "top": top + "px",
      });
      } else {
        //如果top》600，游戏失败

        $('.screen').html('');
        stop_game();
        $('.defeat').show();
        $('.score').html(0);
        score = 0;
        len = 3;
        level = 1;
        $('.levelSpan').text(1);
      }
    }
  }, 20);
}

// 暂停游戏
function stop_game() {
  clearInterval(createTimer);
  clearInterval(downTimer);
  window.onkeydown = null;
}

//按键盘，消除字母
function keyDown(){
  var divs = screen.children();
    for (var i = 0; i < divs.length; i++) {
      var div = $(divs[i]);
      //获取图片的字母值
      //console.log(div.css("background")[div.css("background").indexOf(letters[event.keyCode - 30])]);
      var letter = div.data('letter'); // 获取存储的字母值
      if (letters[event.keyCode - 30] === letter) { // 直接比较按下的键与字母值
      div.remove();
      score += 1;
      counters.html(score);//分数+1 
      
      //如果分数大于10，下一关
      if (10 <= score){
        len += 1;
        level += 1;
        $('screen').html('');
        $('.score').html(0);
        score = 0;
        $('.success').show();
        stop_game();
        $('.levelSpan').text(level);
      }
      break;
      }
    }
}