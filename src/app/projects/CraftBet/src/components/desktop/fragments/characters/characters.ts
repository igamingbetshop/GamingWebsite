export function dragger(element) {
    const callbacks = {
        _onDragEnd: undefined,
        _onDragStart: undefined,
        _onDrag: undefined
    };
    const functions = {
        onDragStart(cb) {
            callbacks._onDragStart = cb;
        },
        onDrag(cb) {
            callbacks._onDrag = cb;
        },
        onDragEnd(cb) {
            callbacks._onDragEnd = cb;
        }
    };

    let mouseIsDown = false,
        startX,
        startY,
        distanceX,
        distanceY,
        distance = 0;

    element.onmousedown = (e) => {
        mouseIsDown = true;

        startX = e.clientX;
        startY = e.clientY;

        if (typeof callbacks._onDragStart == "function") {
            callbacks._onDragStart({ startX, startY });
        }
    };

    window.oncontextmenu = () => {
        mouseIsDown = false

        startX = 0;
        startY = 0;
        distance = 0;
        distanceX = 0;
        distanceY = 0;
    }

    window.onmouseup = (e) => {
        mouseIsDown = false;

        if (typeof callbacks._onDragEnd == "function" && distance > 0) {
            callbacks._onDragEnd({ distanceX, distanceY, distance });
        }

        startX = 0;
        startY = 0;
        distance = 0;
        distanceX = 0;
        distanceY = 0;
    };

    window.onmousemove = (e) => {
        if (!mouseIsDown) return;
        distanceX = e.clientX - startX;
        distanceY = e.clientY - startY;
        distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

        if (typeof callbacks._onDrag == "function")
            callbacks._onDrag({ distanceX, distanceY, distance });
    };

    return functions;
}

export class Transitioner {
    requestId;
    static EasingFunctions = {
        linear: (t) => t,
        easeInQuad: (t) => t * t,
        easeOutQuad: (t) => t * (2 - t),
        easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
        easeInCubic: (t) => t * t * t,
        easeOutCubic: (t) => --t * t * t + 1,
        easeInOutCubic: (t) =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        easeInQuart: (t) => t * t * t * t,
        easeOutQuart: (t) => 1 - --t * t * t * t,
        easeInOutQuart: (t) =>
            t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
        easeInQuint: (t) => t * t * t * t * t,
        easeOutQuint: (t) => 1 + --t * t * t * t * t,
        easeInOutQuint: (t) =>
            t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
    };

    constructor() {
        this.requestId = undefined;
    }

    fromTo({ from, to, duration = 1, easing = "linear" }, cb) {
        const _duration = duration * 1000;
        const diff = to - from;

        let start = undefined;

        if (this.requestId != undefined) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }

        function loop(timestamp) {
            if (!start) start = timestamp;

            let timepassed = timestamp - start;

            if (timepassed >= _duration) return cb(to, true);

            const n = Transitioner.EasingFunctions[easing](timepassed / _duration);

            cb(n * diff + from, false);

            this.requestId = window.requestAnimationFrame(loop.bind(this));
        }

        this.requestId = window.requestAnimationFrame(loop.bind(this));
    }
}

export class CircleCarousel {
    transition;
    container;
    radius;
    items;
    radiusFunction;
    mainItem;
    rotation;
    rotated;
    sA;
    centerIndex;
    mainElement;
    scaleMultiplier

    constructor(container, radius = () => window.innerWidth / 5, scaleMultiplier = 500) {
        this.scaleMultiplier = scaleMultiplier;
        this.transition = new Transitioner();
        this.container = container;

        this.radius = radius; // Can be a function
        this.radiusFunction = undefined;
        this.items = [];
        this.mainItem = undefined

        this.rotation = 0;
        this.rotated = 0;

        this.init();
    }

    initResize() {
        if (typeof this.radius != "function") return;

        this.radiusFunction = this.radius;
        this.radius = this.radiusFunction();

        function debounce(time) {
            let timer = null;

            return function (cb) {
                if (timer != null) {
                    clearTimeout(timer);
                }

                timer = setTimeout(() => {
                    cb();
                }, time);
            };
        }

        const debouncer = debounce(100);

        window.addEventListener("resize", () => {
            this.radius = this.radiusFunction();
            debouncer(() => {
                this.drawElements();
            });
        });
    }


    init() {
        this.initResize();

        const carouselElements = [
            ...this.container.querySelectorAll(":scope > .carousel__item")
        ];

        this.setSA(carouselElements.length);

        carouselElements.forEach(this.createItem.bind(this));

        this.drawElements();

    }

    setSA(itemsAmount = undefined) {
        this.sA = (Math.PI * 2) / itemsAmount;
    }

    createItem(element, _order = 0)
    {
        const order = this.items.length;

        const item = {element, order: order, angle: -(this.sA * order - Math.PI / 2)}

        if (order == 0) {
            this.mainItem = item
        }

        this.mainItem.element.classList.add("main")

        this.items.push(item);

        element.addEventListener("click", (item) => {
            if(item.target !== this.mainElement.element)
            {
                const step = item.target.getAttribute("step");
                let a = item.currentTarget.getBoundingClientRect();
                let b = this.mainElement.element.getBoundingClientRect();
                if(!isNaN(step))
                {
                    if(a.x < b.x)
                        this.rotateLeft(Math.abs(step));
                        else this.rotateRight(Math.abs(step));
                }
            }
            this.container.classList.add("rotated");
            this.mainElement.element.classList.remove("main");

        })
    }

    drawElement(item?, angle?)
    {
        const x = Math.cos(angle || item.angle) * this.radius;
        const y = Math.sin(angle || item.angle) * this.radius * .7;

        item.x = x;
        item.y = y;
        item.z = (item.y + this.radius) / (this.radius * 2);
        const opacity = Transitioner.EasingFunctions.easeInOutQuad(item.z) + .5
        const _x = item.x
        const scale = item.z
        item.element.style.transform = `translate(${_x}px,${Math.abs(scale*this.scaleMultiplier)}px) scale(${scale})`;
        if(opacity < 0.59){
            item.element.style.opacity = `0`;
        } else{
            item.element.style.opacity = opacity;
        }
        /*item.element.style.opacity = opacity > 1 ? 1 : opacity;*/
        item.roundedZIndex = Math.round(item.z * 100000);
        item.element.style.zIndex = item.roundedZIndex;
        this.mainElement = (this.items.length - 1) / 2;
    }

    drawElements()
    {
        this.mainItem = (this.items.length - 1) / 2;
        this.items.forEach((item, index) => {
            const i = index - this.mainItem;
            this.drawElement(item, false);
        });
        this.setSteps();
    }

    updateItems(angle?, setAngle?)
    {
        this.mainItem = (this.items.length - 1) / 2;
        this.items.forEach((item, index) => {
            // Force CSS Redraw (src: https://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes)
            // item.element.style.display = "none";
            // item.element.offsetHeight;
            // item.element.style.display = "";
            // // item.element.style.transform = "translateZ(0)"

            /**
             Note:
             Need to force css redraws when elements are visible
             */
            item.element.style.zIndex = Math.round(item.z * 100000);

            if (item.angle > Math.PI * 2) {
                item.angle -= Math.PI * 2;
            }

            if (item.angle < Math.PI * -2) {
                item.angle += Math.PI * 2;
            }
            const i = index - this.mainItem;

            if (setAngle) {
                item.angle += angle;
                this.rotated = 0;
                this.rotation = 0;

                this.drawElement(item, false);
            } else {
                this.drawElement(item, item.angle + angle);
            }

            const z = Math.round(item.z * 100000);

            if (parseInt(item.element.style.zIndex) != z) {
                item.element.style.zIndex = z;
            }
        });
        this.setSteps();
        this.container.classList.add("rotated");
    }

    setSteps()
    {
        const orderedByZIndex = [...this.items].sort((a,b) => b.roundedZIndex - a.roundedZIndex);

        for(let i = 0, k = 0; i < orderedByZIndex.length; i++)
        {
            if(i === 0)
            {
                orderedByZIndex[i].step = k;
                orderedByZIndex[i].element.setAttribute("step", k);
                k++
                orderedByZIndex[i].element.classList.add("highlight");
                this.mainElement = orderedByZIndex[i];
            }
            else
            {
                if(i%2===0)
                {
                    orderedByZIndex[i].step = -k;
                    orderedByZIndex[i].element.setAttribute("step", -k);
                    k++;
                  /*  if(orderedByZIndex[i].step >= -4){
                        orderedByZIndex[i].element.style.display = `flex`;
                    } else{
                        orderedByZIndex[i].element.style.display = `none`;
                    }*/
                }

                else
                {
                    orderedByZIndex[i].step = k;
                    orderedByZIndex[i].element.setAttribute("step", k);
                   /* if(orderedByZIndex[i].step <= 4){
                        orderedByZIndex[i].element.style.display = `flex`;
                    } else{
                        orderedByZIndex[i].element.style.display = `none`;
                    }*/
                }

                orderedByZIndex[i].element.classList.remove("highlight");
                orderedByZIndex[i].element.classList.remove("main")
            }
        }
    }


    rotate() {
        this.transition.fromTo(
            {
                from: this.rotated,
                to: this.rotation,
                duration: 0.3,
                easing: "easeInOutQuad"
            },
            (angle, end) => {
                this.rotated = angle;
                this.updateItems(angle, end);
            }
        );
    }

    rotateLeft(step)
    {
        for(let i = 0; i < step; i++){
            this.rotation -= this.sA;
        }
        this.rotate();
    }

    rotateRight(step)
    {
        for(let i = 0; i < step; i++){
            this.rotation += this.sA;
        }
        this.rotate();
    }

    rotateToLeft() {
        this.rotation -= this.sA;
        this.rotate();
    }

    rotateToRight() {
        this.rotation += this.sA;
        this.rotate();
    }
}

