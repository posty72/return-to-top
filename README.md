# Return to top button

This script appends a button that will return the user to the top of the page. It's independant of other libraries and self initiates. Simply add your settings to the 'returnToTopSettings' object, add it somewhere on your page and hey presto!

### Settings

| Name               | Type              | Description                                                                                                    |
| ------------------ | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `placement`        | enum              | side of the window the button will sit. Default is 'right', options are 'left' or 'right'.                     |
| `color`            | string            | color of the button. Will take any hex or rgb[a] value. Default is '#A11222' (maroon)                          |
| `arrowColor`       | string            | color of the rotating arrow inside the button. Will take any hex or rgb[a] value. Default is '#ffffff' (white) |
| `shape`            | enum              | shape of the button. Options are 'circle' or 'square'                                                           |
| `animation`        | object \| boolean | Set whether to animate in or not                                                                               |
| `animation.fade`   | boolean           | Set whether to fade in or not                                                                                  |
| `animation.rotate` | boolean           | Set whether to rotate on scroll or not                                                                         |

### Development

To build from source, run `npm run build`. Use `npm run example` to see it running in a browser on a simple test page.
