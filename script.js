/* exported returnToTop */

/*****************************
**** Return to Top Button ****
*****************************/
var returnToTopSettings = {
  'placement': 'right', // Default is 'right'
  'arrowColour': '#fff', // Will take any hex or rgb[a] value. Default is '#ffffff' (white)
  'color': '#A11222', // Will take any hex or rgb[a] value. Default is '#000000' (black)
  'shape': 'square' // Options are 'round' or 'square'
},
returnToTop = (function(s) {
  if (!s || typeof s !== 'object') {
    s = {
      'placement': 'right',
      'color': '#A11222',
      'shape': 'square'
    };
  }
  var returnTopContainerEl = elementHTML(),
    returnTopEl = returnTopContainerEl.children[0],
  timer = setInterval(function(){
    if (document.readyState === "complete"){
      document.getElementsByTagName('head')[0].appendChild(styleHTML(s));
      document.getElementsByTagName('body')[0].appendChild(returnTopContainerEl);
      clearInterval(timer);
    }
  }, 50);

  window.addEventListener('scroll', function() {
    setReturnTopRotation(returnTopEl);
    setReturnTopOpacity(returnTopContainerEl);
  });

  returnTopEl.addEventListener('mousedown', scrollToTop);
  returnTopEl.addEventListener('touchstart', scrollToTop);

  function elementHTML(){
    var el = document.createElement('div');
    el.id = "returnToTopContainer";
    el.innerHTML = '<div id="returnToTop"><div class="wrapper" style="transform: rotate(45deg);"></div></div>';
    return el;
  }

  function styleHTML(s){
    var placement = (s.placement !== 'left') ? 'right' : 'left',
      color = (!s.color) ? 'background-color: #000;' : 'background-color: '+s.color+';',
      arrowColor = (!s.arrowColour) ? '#ffffff' : s.arrowColour,
      shape = {
      'bottom': (s.shape !== 'square') ? '10px;' : '0px;',
      'borderRadius': (s.shape !== 'square') ? 'border-radius: 99em;' : '',
      'boxShadow': (s.shape !== 'square') ? 'box-shadow: 0px 0px 20px rgba(0,0,0,0.25);' : '',
      'color': color
    },
    styles = '#returnToTopContainer {';
    styles +=   'position: fixed;';
    styles +=   'width: 50px;';
    styles +=   'height: 50px;';
    styles +=   placement + ': 10px;';
    styles +=   'bottom: '+ shape.bottom;
    styles +=   shape.borderRadius;
    styles +=   shape.boxShadow;
    styles +=   'overflow: hidden;';
    styles +=   color;
    styles +=   'z-index: 100;';
    styles +=   'cursor: pointer;';
    styles +=   'opacity: 0;';
    styles += '}';
  
    styles += '#returnToTop {';
    styles +=   'z-index: 100;';
    styles +=   'cursor: pointer;';
    styles +=   color;
    styles +=   'position: absolute;';
    styles +=   'top: 0;';
    styles +=   'left: 0;';
    styles +=   'width: 100%;';
    styles +=   'height: 100%;';
    styles += '}';

    styles += '#returnToTop .wrapper {';
    styles +=   'position: relative;';
    styles +=   'width: 100%;';
    styles +=   'height: 100%';
    styles += '}';

    styles += '#returnToTop .wrapper::before,';
    styles += '#returnToTop .wrapper::after {';
    styles +=   'content: "";';
    styles +=   'position: absolute;';
    styles += '}';

    styles += '#returnToTop .wrapper::before {';
    styles +=   'height: 40%;';
    styles +=   'top: 25%;';
    styles +=   'left: 35%;';
    styles +=   'border-left: 3px solid '+arrowColor+';';
    styles += '}';

    styles += '#returnToTop .wrapper::after {';
    styles +=   'height: 0;';
    styles +=   'width: 40%;';
    styles +=   'bottom: 35%;';
    styles +=   'left: 35%;';
    styles +=   'border-top: 3px solid '+arrowColor+';';
    styles += '}';

    var styleEl = document.createElement('style');
    styleEl.innerHTML = styles;
    return styleEl;
  }

  function setReturnTopOpacity(el) {
    el.style.opacity = Math.min((window.scrollY / window.innerHeight), 1);
  }

  function setReturnTopRotation(el) {
    el.style.transform = 'rotate(' + ((window.scrollY / ((Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)) - window.innerHeight)) * 90) + 'deg)';
  }

  function scrollToTop() {
    var s = -window.scrollY,
    a = setInterval(function() {
      if (window.scrollY > 1) {
        window.scrollBy(0, (s / 15));
      } else {
        clearInterval(a);
      }
    }, 15);
  }

  return scrollToTop;

})(returnToTopSettings);