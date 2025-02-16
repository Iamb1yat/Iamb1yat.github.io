// 常量定义
const SCALE_FACTOR = 1.2;
const OFFSET_FACTOR = 50;
const MOVE_UP_FACTOR = 25;
const MAX_CLICKS = 5;

// DOM 元素
const elements = {
    yesButton: document.getElementById("yes"),
    noButton: document.getElementById("no"),
    questionText: document.getElementById("question"),
    mainImage: document.getElementById("mainImage")
};

let clickCount = 0;

// 图片映射
const imageMap = {
    1: "images/shocked.png",
    2: "images/think.png",
    3: "images/angry.png",
    4: "images/crying.png",
    5: "images/crying.png"
};

// No 按钮的文字变化
const noTexts = [
    "？你认真的吗…", 
    "要不再想想？", 
    "不许选这个！ ", 
    "我会很伤心…", 
    "不行:("
];

// 动画函数
const animate = {
    scaleYes: (count) => `scale(${1 + (count * SCALE_FACTOR)})`,
    moveNo: (count) => `translateX(${count * OFFSET_FACTOR}px)`,
    moveUp: (count) => `translateY(-${count * MOVE_UP_FACTOR}px)`
};

// No 按钮点击事件
elements.noButton.addEventListener("click", function() {
    clickCount = Math.min(clickCount + 1, MAX_CLICKS);

    // 应用动画效果
    elements.yesButton.style.transform = animate.scaleYes(clickCount);
    elements.noButton.style.transform = animate.moveNo(clickCount);
    elements.mainImage.style.transform = animate.moveUp(clickCount);
    elements.questionText.style.transform = animate.moveUp(clickCount);

    // 更新文本和图片
    if (clickCount <= MAX_CLICKS) {
        elements.noButton.innerText = noTexts[clickCount - 1];
        elements.mainImage.src = imageMap[clickCount] || imageMap[MAX_CLICKS];
    }
});

// Yes 按钮点击事件
elements.yesButton.addEventListener("click", function() {
    const successContent = `
        <div class="yes-screen">
            <h1 class="yes-text">!!!喜欢你!! ( >᎑<)♡︎ᐝ</h1>
            <img src="images/hug.png" alt="拥抱" class="yes-image">
            <div class="heart-animation"></div>
        </div>
    `;
    
    document.body.innerHTML = successContent;
    document.body.style.overflow = "hidden";
});

window.addEventListener("popstate", function () {
    // 如果有前一个页面，返回到上一个页面，否则跳转到主页
    if (document.referrer) {
      location.href = document.referrer;
    } else {
      location.href = "/";
    }
  });

  // 由于 pjax 可能影响历史记录，我们主动添加一个历史记录
window.history.pushState({}, "", location.href);