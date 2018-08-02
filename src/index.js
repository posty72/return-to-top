/* exported returnToTop */

/** ***************************
**** Return to Top Button ****
*****************************/

const BETWEEN_UPDATE_CHECKS = 15;
const BETWEEN_PAGELOAD_CHECKS = 50;
const DEGREES_TO_TURN = 90;

export class ReturnToTop {
    constructor(SETTINGS) {
        if (SETTINGS || typeof SETTINGS === 'object') {
            this.settings = SETTINGS;
        } else {
            this.settings = {
                'arrowColour': '#FFFFFF',
                'placement':   'right',
                'color':       '#A11222',
                'shape':       'circle',
            };
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
            this.setReturnTopRotation(returnTopEl);
            this.setReturnTopOpacity(returnTopContainerEl);
        });

        returnTopEl.addEventListener('mousedown', this.scrollToTop);
        returnTopEl.addEventListener('touchstart', this.scrollToTop);
    }

    elementHTML() {
        const el = document.createElement('div');
        el.id = 'returnToTopContainer';
        el.innerHTML = '<div id="returnToTop"><div class="wrapper" style="transform: rotate(45deg);"></div></div>';

        return el;
    }

    styleHTML() {
        const obj = this.styles();
        const styleEl = document.createElement('style');
        let styleContent = '';

        for (const key in obj) {
            styleContent += `${key}{`;

            for (const key2 in obj[key]) {
                styleContent += `${key2}: ${obj[key][key2]};`;
            }
            styleContent += '}';
        }

        styleEl.innerHTML = styleContent;

        return styleEl;
    }

    styles() {
        const { arrowColour, color, placement, shape } = this.settings;
        const shapeObject = {
            'bottom':       (shape === 'square') ? '0px' : '10px',
            'borderRadius': (shape === 'square') ? 'none' : '99em',
            'boxShadow':    (shape === 'square') ? 'none' : '0px 0px 20px rgba(0,0,0,0.25)',
            'color':        color,
        };
        const obj = {
            '#returnToTopContainer': {
                'position':         'fixed',
                'width':            '50px',
                'height':           '50px',
                'placement':        '10px',
                'bottom':           shapeObject.bottom,
                'border-radius':    shapeObject.borderRadius,
                'box-shadow':       shapeObject.boxShadow,
                'overflow':         'hidden',
                'background-color': color,
                'z-index':          '100',
                'cursor':           'pointer',
                'opacity':          '0',
            },

            '#returnToTop': {
                'z-index':          '100',
                'cursor':           'pointer',
                'background-color': color,
                'position':         'absolute',
                'top':              '0',
                'left':             '0',
                'width':            '100%',
                'height':           '100%',
            },

            '#returnToTop .wrapper': {
                'position': 'relative',
                'width':    '100%',
                'height':   '100%',
            },

            '#returnToTop .wrapper::before,#returnToTop .wrapper::after': {
                'content':  '""',
                'position': 'absolute',
            },

            '#returnToTop .wrapper::before': {
                'height':      '40%',
                'top':         '25%',
                'left':        '35%',
                'border-left': `3px solid ${arrowColour}`,
            },

            '#returnToTop .wrapper::after': {
                'height':     '0',
                'width':      '40%',
                'bottom':     '35%',
                'left':       '35%',
                'border-top': `3px solid ${arrowColour}`,
            },
        };

        obj['#returnToTopContainer'][placement] = '10px'; // Could be more elegant

        return obj;
    }

    setReturnTopOpacity(el) {
        el.style.opacity = Math.min((window.scrollY / window.innerHeight), 1);
    }

    setReturnTopRotation(el) {
        el.style.transform = `rotate(${(window.scrollY / ((Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)) - window.innerHeight)) * DEGREES_TO_TURN}deg)`;
    }

    scrollToTop() {
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
