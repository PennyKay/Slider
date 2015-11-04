(function(){
    function Slider(id, direction, speed) {
        this.slider = document.getElementById(id);
        this.contentUl = this.slider.firstElementChild;
        this.num = this.contentUl.children.length;
        this.direction = direction;
        this.speed = speed;
    }

    Slider.prototype = {
        start: function() {
            var contentUl = this.contentUl,
                pointUl,
                direction = this.direction,
                timerCounter = 1;

            this._addPoints();
            pointUl = this.pointUl;

            this.timer = setInterval(function() {
                var index = timerCounter % 5,
                    isH = direction == 'h',
                    distance = isH ? -400 * index : -100 * index,
                    currentPoint,
                    lastIndex,
                    lastPoint;
                contentUl.style.transitionProperty = 'transform';
                contentUl.style.transitionDuration = '.5s';
                contentUl.style.transitionTimingFunction = 'ease-in-out';
                contentUl.style.transform = isH ? 'translate(' + distance + 'px, 0)' : 'translate(0, ' + distance + 'px)';

                currentPoint = pointUl.children[index];
                currentPoint.style.background = 'rgba(256, 0, 0, .6)';

                lastIndex = index - 1 >= 0 ? index - 1 : 4;
                lastPoint = pointUl.children[lastIndex];
                lastPoint.style.background = 'rgba(0, 0, 0, .6)';
                
                timerCounter ++;
            }, this.speed);
        },

        stop: function() {
            if(this.timer) {
                clearInterval(this.timer);
            }
        },

        _addPoints: function() {
            var slider = this.slider,
                pointUl = document.createElement('ul'),
                i,
                pointLi;

            pointUl.className = 'slider-point-ul pa';

            for(i = 0; i < this.num; i ++) {
                pointLi = document.createElement('li');
                pointLi.className = 'slider-point-li';
                pointLi.innerText = i + 1;
                pointUl.appendChild(pointLi);
            }
            slider.appendChild(pointUl);
            this.pointUl = pointUl;
        }
    }

    var hSlider = new Slider('hSlider', 'h', 2000);
    var vSlider = new Slider('vSlider', 'v', 2000);
    hSlider.start();
    vSlider.start();
    //window.Slider = Slider;
})();