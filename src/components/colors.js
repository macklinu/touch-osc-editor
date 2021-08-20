import Color from 'color'

class ColorScheme {
  constructor({ name, bright, normal, dark }) {
    this.name = name
    this._bright = Color.rgb(bright)
    this._normal = Color.rgb(normal)
    this._dark = Color.rgb(dark).lighten(0.7)
  }

  get bright() {
    return this._bright.string()
  }

  get normal() {
    return this._normal.string()
  }

  get dark() {
    return this._dark.string()
  }
}

const colors = {
  gray: new ColorScheme({
    name: 'Gray',
    dark: [20, 20, 20],
    normal: [51, 51, 51],
    bright: [178, 178, 178],
  }),
  purple: new ColorScheme({
    name: 'Purple',
    dark: [20, 10, 20],
    normal: [56, 38, 61],
    bright: [170, 127, 170],
  }),
  yellow: new ColorScheme({
    name: 'Yellow',
    dark: [20, 20, 15],
    normal: [56, 56, 20],
    bright: [255, 237, 0],
  }),
  blue: new ColorScheme({
    name: 'Blue',
    dark: [15, 15, 20],
    normal: [15, 45, 40],
    bright: [0, 196, 168],
  }),
  green: new ColorScheme({
    name: 'Green',
    dark: [20, 25, 20],
    normal: [25, 89, 33],
    bright: [117, 204, 38],
  }),
  red: new ColorScheme({
    name: 'Red',
    dark: [25, 20, 20],
    normal: [109, 22, 20],
    bright: [255, 40, 28],
  }),
  orange: new ColorScheme({
    name: 'Orange',
    dark: [28, 28, 15],
    normal: [117, 58, 20],
    bright: [249, 160, 28],
  }),
  brown: new ColorScheme({
    name: 'Brown',
    dark: [20, 20, 0],
    normal: [56, 40, 2],
    bright: [130, 102, 71],
  }),
  pink: new ColorScheme({
    name: 'Pink',
    dark: [28, 0, 28],
    normal: [102, 2, 94],
    bright: [255, 5, 242],
  }),
}

export default colors
