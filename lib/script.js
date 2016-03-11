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
    if(window.scrollY === 0) {
      returnTopContainerEl.style.display = 'none';
      return;
    }
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
    var obj = styles(s), 
    styleEl = document.createElement('style'), 
    styleContent = '';

    for(var key in obj) {
      styleContent += key + '{';

      for(var key2 in obj[key]) {
        styleContent += key2 + ': ' + obj[key][key2] + ';';
      }
      styleContent += '}';
    }

    styleEl.innerHTML = styleContent;

    return styleEl;
  }

  function styles(s){
    var placement = (s.placement !== 'left') ? 'right' : 'left',
    color = (!s.color) ? '#000' : s.color,
    arrowColor = (!s.arrowColour) ? '#ffffff' : s.arrowColour,
    shape = {
      'bottom': (s.shape !== 'square') ? '10px' : '0px',
      'borderRadius': (s.shape !== 'square') ? '99em' : 'none',
      'boxShadow': (s.shape !== 'square') ? '0px 0px 20px rgba(0,0,0,0.25)' : 'none',
      'color': color
    },
    obj = {
      '#returnToTopContainer': {
         'position': 'fixed',
         'width': '50px',
         'height': '50px',
         'placement': '10px',
         'bottom': shape.bottom,
         'border-radius': shape.borderRadius,
         'box-shadow': shape.boxShadow,
         'overflow': 'hidden',
         'background-color': color,
         'z-index': '100',
         'cursor': 'pointer',
         'opacity': '0'
      },
  
     '#returnToTop': {
       'z-index': '100',
       'cursor': 'pointer',
       'background-color': color,
       'position': 'absolute',
       'top': '0',
       'left': '0',
       'width': '100%',
       'height': '100%'
     },

     '#returnToTop .wrapper': {
       'position': 'relative',
       'width': '100%',
       'height': '100%',
     },

     '#returnToTop .wrapper::before,#returnToTop .wrapper::after': {
       'content': '""',
       'position': 'absolute'
     },

     '#returnToTop .wrapper::before': {
       'height': '40%',
       'top': '25%',
       'left': '35%',
       'border-left': '3px solid '+arrowColor
     },

     '#returnToTop .wrapper::after': {
       'height': '0',
       'width': '40%',
       'bottom': '35%',
       'left': '35%',
       'border-top': '3px solid '+arrowColor
     }
   };

   obj['#returnToTopContainer'][placement] = '10px'; // Could be more elegant

   return obj;
    // var styleEl = document.createElement('style');
    // styleEl.innerHTML =     return styleEl;
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