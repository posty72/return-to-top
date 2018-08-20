/** ***************************
**** Return to Top Button ****
*****************************/

const BETWEEN_UPDATE_CHECKS: number = 15;
const BETWEEN_PAGELOAD_CHECKS: number = 50;
const DEGREES_TO_TURN: number = 90;
const baseClassName = 'return-to-top'

export enum ReturnToTopPlacement {
    right = 'right',
    left = 'left',
}

export enum ReturnToTopShape {
    circle = 'circle',
    square = 'square',
}

interface Settings {
    arrowColour?: string,
    placement?: ReturnToTopPlacement,
    color?: string,
    shape?: ReturnToTopShape,
}

export class ReturnToTop {
    settings: Settings = {
        arrowColour: '#FFFFFF',
        placement: ReturnToTopPlacement.right,
        color: '#000000',
        shape: ReturnToTopShape.square,
    };
    returnTopEl: HTMLElement
    returnTopContainerEl: HTMLElement

    constructor(SETTINGS?: Settings) {
        this.setReturnTopRotation = this.setReturnTopRotation.bind(this)
        this.setReturnTopOpacity = this.setReturnTopOpacity.bind(this)

        if (SETTINGS || typeof SETTINGS === 'object') {
            this.settings = {
                ...this.settings,
                ...SETTINGS
            };
        }

        this.returnTopContainerEl = this.createElement();
        this.returnTopEl = this.returnTopContainerEl.children[0] as HTMLElement;

        const timer = setInterval(() => {
            if (document.readyState === 'complete') {
                document.getElementsByTagName('head')[0].appendChild(this.createStyleElement());
                document.getElementsByTagName('body')[0].appendChild(this.returnTopContainerEl);
                clearInterval(timer);
            }
        }, BETWEEN_PAGELOAD_CHECKS);

        window.addEventListener('scroll', () => {
            this.setReturnTopRotation();
            this.setReturnTopOpacity();
        });

        this.returnTopEl.addEventListener('click', this.scrollToTop);
    }

    createElement(): HTMLElement {
        const el = document.createElement('div');
        el.classList.add(baseClassName);
        el.innerHTML = `
            <div class="${baseClassName}--inner">
                <div class="${baseClassName}--icon" style="transform: rotate(45deg);"></div>
            </div>
        `;

        return el;
    }

    createStyleElement(): HTMLElement {
        const styleEl = document.createElement('style');
        styleEl.innerHTML = this.getStyles();

        return styleEl;
    }

    getStyles(): string {
        const { arrowColour, color, placement, shape } = this.settings;
        const shapeObject = {
            bottom: (shape === 'square') ? '0px' : '10px',
            borderRadius: (shape === 'square') ? '0' : '99em',
            boxShadow: (shape === 'square') ? 'none' : '0px 0px 20px rgba(0,0,0,0.25)',
        };

        return `
            .${baseClassName} {
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
                ${placement || ReturnToTopPlacement.right}: 10px;
            }

            .${baseClassName}--inner {
                z-index: 100;
                cursor: pointer;
                background-color: ${color};
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .${baseClassName}--icon {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .${baseClassName}--icon::before,
            .${baseClassName}--icon::after {
                content: "";
                position: absolute;
            }

            .${baseClassName}--icon::before {
                height: 40%;
                top: 25%;
                left: 35%;
                border-left: 3px solid ${arrowColour};
            }

            .${baseClassName}--icon::after {
                height: 0;
                width: 40%;
                bottom: 35%;
                left: 35%;
                border-top: 3px solid ${arrowColour};
            }
        `;
    }

    setReturnTopOpacity(): void {
        this.returnTopContainerEl.style.opacity = Math.min((window.scrollY / window.innerHeight), 1).toString();
    }

    setReturnTopRotation(): void {
        const rotation = Math.min((window.scrollY / window.innerHeight), 1) * DEGREES_TO_TURN

        this.returnTopEl.style.transform = `rotate(${rotation}deg)`;
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
