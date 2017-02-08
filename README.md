## Sass variables loader for webpack

Import parsed sass variables from a sass file to json.

**Nomal variables sass:**
``` scss
$gray-base:              #000 !default;
$gray-darker:            lighten($gray-base, 13.5%) !default; // #222
$gray-dark:              lighten($gray-base, 20%) !default;   // #333
$gray:                   lighten($gray-base, 33.5%) !default; // #555
$gray-light:             lighten($gray-base, 46.7%) !default; // #777
$gray-lighter:           lighten($gray-base, 93.5%) !default; // #eee
```

**Result:**
``` javascript
{
  gray-base: '#000',
  gray-darker: '#222222',
  gray-dark: '#333333',
  gray: '#555555',
  gray-light: '#777777',
  gray-lighter: '#eeeeee'
}
```

**Include import:**
``` scss
@import "./_color"

$font-color:$gray-dark; //#333
...
```

**Result:**
``` javascript
{
  font-color: '#333333',
  gray-dark: '#333333'
  ...
}
```

**Normal sass:**
``` scss
@import "./_varaibles"

body{
  color: $font-color; //#333
  background-color: $background-color; //#FFF
}
...
```

**Result:**
``` javascript
{
  font-color: '#333333',
  background-color: '#FFFFFF'
  ...
}
```

## Installation

`npm install --save-dev mk-sass-variables-loader`

## Usage

``` javascript
import variables from 'mk-sass-variables-loader!./_variables.scss';
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)