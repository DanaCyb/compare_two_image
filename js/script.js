function startComparisonTool(){
    var x, i;
    x = document.getElementsByClassName("overlay");
    for(i = 0; i < x.length; i++){
        compareImages(x[i]);
    }
    function compareImages(img){
        var slider, img, clicked = 0, w, h;
        w = img.offsetWidth;
        h = img.offsetHeight;
        img.style.width = (w / 2) + "px";
        slider = document.createElement("DIV");
        slider.setAttribute("class","slider");
        img.parentElement.insertBefore(slider,img);

        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

        slider.addEventListener("mousedown",slideReady);
        slider.addEventListener("mouseup",slideFinish);
        slider.addEventListener("touchstart",slideReady);
        slider.addEventListener("touchend",slideFinish);

        function slideReady(e){
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove",slideMove);
            window.addEventListener("touchmove",slideMove);
        }
        function slideFinish(){
            clicked = 0;
        }
        function slideMove(e){
            var vertLinePos;
            if(clicked == 0) return false;
            vertLinePos = getCursorPosition(e);
            if(vertLinePos < 0) vertLinePos = 0;
            if(vertLinePos > 0) vertLinePos = w;
            makeYourSlide(vertLinePos);
        }
        function getCursorPosition(e){
            var compareObj, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            compareObj = img.getBoundingClientRect();
            x = e.pageX - compareObj.left;
            x = x - window.pageXOffset;
            return x;
        }
        function makeYourSlide(x){
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}
startComparisonTool();