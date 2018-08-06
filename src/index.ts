/** ***************************
**** Return to Top Button ****
*****************************/

const BETWEEN_UPDATE_CHECKS: number = 15;
const BETWEEN_PAGELOAD_CHECKS: number = 50;
const DEGREES_TO_TURN: number = 90;


enum Placement {
    right = 'right',
    left = 'left',
}

enum Shape {
    circle = 'circle',
    square = 'square',
}

interface Settings {
    arrowColour: string,
    placement: Placement,
    color: string,
    shape: Shape,
}

export class ReturnToTop {
    settings: Settings = {
        arrowColour: '#FFFFFF',
        placement: Placement.right,
        color: '#A11222',
        shape: Shape.square,
    };

    constructor(SETTINGS?: Settings) {
        this.setReturnTopRotation = this.setReturnTopRotation.bind(this)
        this.setReturnTopOpacity = this.setReturnTopOpacity.bind(this)

        if (SETTINGS || typeof SETTINGS === 'object') {
            this.settings = SETTINGS;
        }

        const returnTopContainerEl = this.elementHTML();
        const returnTopEl = returnTopContainerEl.children[0];
        const timer = setInterval(() => {
            if (document.readyState === 'complete') {
                document.getElementsByTagName('head')[0].appendChild(this.styleHTML());
                document.getElementsByTagName('body')[0].appendChild(returnTopContainerEl);
                clearInterval(timer);
            }
        }, BETWEEN_PAGELOAD_CHECKS);

        window.addEventListener('scroll', () => {
            this.setReturnTopRotation(returnTopEl as HTMLElement);
            this.setReturnTopOpacity(returnTopContainerEl);
        });

        returnTopEl.addEventListener('click', this.scrollToTop);
    }

    elementHTML(): HTMLElement {
        const el = document.createElement('div');
        el.id = 'returnToTopContainer';
        el.innerHTML = '<div id="returnToTop"><div class="wrapper" style="transform: rotate(45deg);"></div></div>';

        return el;
    }

    styleHTML(): HTMLElement {
        const styleString = this.styles();
        const styleEl = document.createElement('style');
        styleEl.innerHTML = styleString;

        return styleEl;
    }

    styles(): string {
        const { arrowColour, color, placement, shape } = this.settings;
        const shapeObject = {
            bottom: (shape === 'square') ? '0px' : '10px',
            borderRadius: (shape === 'square') ? 'none' : '99em',
            boxShadow: (shape === 'square') ? 'none' : '0px 0px 20px rgba(0,0,0,0.25)',
        };

        return `
            #returnToTopContainer {
                position: fixed;
                width: 50px;
                height: 50px;
                bottom: ${shapeObject.bottom};
                border-radius: ${shapeObject.borderRadius};
                box-shadow: ${shapeObject.boxShadow};
                overflow: hidden;
                background-color: ${color};
                z-index: 100;
                cursor: pointer;
                opacity: 0;
                ${placement.toString()}: 10px;
            }

            #returnToTop {
                z-index: 100;
                cursor: pointer;
                background-color: ${color};
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            #returnToTop .wrapper {
                position: relative;
                width: 100%;
                height: 100%;
            }

            #returnToTop .wrapper::before,#returnToTop .wrapper::after {
                content: "";
                position: absolute;
            }

            #returnToTop .wrapper::before {
                height: 40%;
                top: 25%;
                left: 35%;
                border-left: 3px solid ${arrowColour};
            }

            #returnToTop .wrapper::after {
                height: 0;
                width: 40%;
                bottom: 35%;
                left: 35%;
                border-top: 3px solid ${arrowColour};
            }
        `;
    }

    setReturnTopOpacity(el: HTMLElement): void {
        el.style.opacity = Math.min((window.scrollY / window.innerHeight), 1).toString();
    }

    setReturnTopRotation(el: HTMLElement): void {
        el.style.transform = `rotate(${(window.scrollY / ((Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)) - window.innerHeight)) * DEGREES_TO_TURN} deg)`;
    }

    scrollToTop(): void {
        const scroll = -window.scrollY;
        const timer = setInterval(() => {
            if (window.scrollY > 1) {
                window.scrollBy(0, (scroll / BETWEEN_UPDATE_CHECKS));
            } else {
                clearInterval(timer);
            }
        }, BETWEEN_UPDATE_CHECKS);
    }
}

export default new ReturnToTop();
