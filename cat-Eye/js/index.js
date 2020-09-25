var imgs = [
    { imgUrl: "img/1.jpg", link: "" }, //每一项要记录：1. 图片的路径，2. 图片的超链接地址
    { imgUrl: "img/2.jpg", link: "" },
    { imgUrl: "img/3.jpg", link: "" }
];

var divImgs = document.querySelector(".imgs"); //装图片的div
var divDots = document.querySelector(".dots"); //装小圆点span的div
var divContainer = document.querySelector(".container"); //整个容器
var index = 0; //目前显示的是第几张图片，从0开始
var timerId = null; //记录自动切换计时器的id
/**
 * 初始化图片
 */
function initImages() {
    //1. 设置divImgs的宽度   例如：300%
    divImgs.style.width = imgs.length + "00%";
    //2. 生成包含img的a元素，加入到divImgs中
    for (var i = 0; i < imgs.length; i++) {
        var obj = imgs[i]; //拿到图片的数据对象
        var a = document.createElement("a"); //创建a元素
        a.href = obj.link;
        var img = document.createElement("img"); //创建图片元素
        img.src = obj.imgUrl;
        a.appendChild(img);
        divImgs.appendChild(a);
    }
    //3. 生成span元素（小圆点）
    for (var i = 0; i < imgs.length; i++) {
        // 一张图片，有一个span
        var span = document.createElement("span");
        divDots.appendChild(span);
    }
    //4. 设置状态
    setStatus();
    //5. 开始自动切换
    start();
}

/**
 * 根据index的值，设置相关的css样式
 */
function setStatus() {
    //调整图片容器的位置
    divImgs.style.marginLeft = -index * 100 + "%"
    //移除掉目前拥有selected样式的span元素的类样式
    //寻找 .dots span.selected 元素，如果返回null，则没有找到
    var span = document.querySelector(".dots span.selected")
    if (span) {
        //如果找到了
        span.className = "";
    }
    //设置相应的span元素的类样式为selected
    divDots.children[index].className = "selected";
}

initImages();

//开始自动切换
function start() {
    if (timerId) {
        return; //已经正在自动切换了，不需要再开启计时器了
    }
    timerId = setInterval(function () {
        // index++;
        // if (index === imgs.length) {
        //     //超过了最大下标，无效，回归到0
        //     index = 0;
        // }
        index = (index + 1) % imgs.length;
        setStatus();
    }, 3000); //每隔3秒钟切换一次
    console.log(timerId)
}

//停止自动切换
function stop() {
    clearInterval(timerId);
    timerId = null;
}


//处理事件

divDots.onclick = function (e) {
    if (e.target.tagName !== "SPAN") {
        //点击的不是span元素，而是span外层的div
        //没啥事，你继续
        return;
    }
    //e.target: 点击的是span元素
    //如何获取点击的是第几个span呢？
    for (var i = 0; i < divDots.children.length; i++) {
        var span = divDots.children[i]; //拿到每一个子元素（span）
        if (span === e.target) {
            //该span元素就是我点击的span元素
            //i：点击的第几个span
            index = i;
            setStatus();
            return; //没有必要继续找了
        }
    }
}

divContainer.onmouseenter = function () {
    stop();
}

divContainer.onmouseleave = function () {
    console.log("开始")
    start();
}