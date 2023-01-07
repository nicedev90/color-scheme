// Comprobar que el navegador soporta la API
if('EyeDropper' in window) {
  var eyeDropper = new window.EyeDropper();
} else {
  console.warn('El navegador no soporta el API EyeDropper.');
}

const selectPixel = e => {
  // el método open() devuelve una promesa que se resuelve al seleccionar un pixel
  eyeDropper.open()
   .then(result => {
      const pixelColor = result.sRGBHex;
      const parColor = e.target.previousElementSibling
      parColor.innerText = pixelColor.toUpperCase()
      parColor.style.background = pixelColor
    })
    .catch( e => {
       console.error(e)
  })
}

const btnColor = document.querySelectorAll('#btn-color')
btnColor.forEach(btn => {
  btn.addEventListener('click', selectPixel)
})

// cargar imagen con javascript
const inputImage = document.getElementById('img-input')
inputImage.type = 'file'
inputImage.accept = 'image/*'

inputImage.addEventListener('change', fileEvent => {
  const file = fileEvent.target.files[0]
  const reader = new FileReader()

  reader.addEventListener('load', readerEvent => {
    const image = new Image()
    image.addEventListener('load', drawImage)
    image.src = readerEvent.target.result;
  })

  reader.readAsDataURL(file, "UTF-8")
})


// funcion para dibujar la imagen, arrow function no es una opción porque no permite usar "this", fuera del scope del objeto
function drawImage() {
  const preview = document.getElementById('preview')
  const ctx = preview.getContext('2d')
  // this es la imagen que carga con el evento "onload"
  preview.width = this.naturalWidth;
  preview.height = this.naturalHeight;
  ctx.drawImage(this, 0, 0, this.width, this.height);
}

// dibujar el esquema de colores un una barra
const hex = document.querySelectorAll('#hex-color')

const neutral = document.querySelector('#neutral')
const primary = document.querySelector('#primary')  
const cta = document.querySelector('#cta')

const gradient = document.querySelector('#gradient')
const colors = document.querySelectorAll('#colors')

const btnLoad = document.querySelector('#btn-load')
btnLoad.addEventListener('click', () => {

  let colorNeu = hexToHSL(hex[0].innerText)
  let colorPri = hexToHSL(hex[1].innerText)
  let colorCta = hexToHSL(hex[2].innerText)

  gradient.classList.toggle('hidden')

  colors[0].style.background = colorNeu.light
  colors[0].innerText = `neutralLight: '${colorNeu.light}',`

  colors[1].style.background = colorNeu.normal
  colors[1].innerText = `neutral: '${colorNeu.normal}',`

  colors[2].style.background = colorNeu.dark
  colors[2].innerText = `neutralDark: '${colorNeu.dark}',`

  colors[3].style.background = colorPri.light
  colors[3].innerText = `primaryLight: '${colorPri.light}',`

  colors[4].style.background = colorPri.normal
  colors[4].innerText = `primary: '${colorPri.normal}',`

  colors[5].style.background = colorPri.dark
  colors[5].innerText = `primaryDark: '${colorPri.dark}',`

  colors[6].style.background = colorCta.light
  colors[6].innerText = `ctaLight: '${colorCta.light}',`

  colors[7].style.background = colorCta.normal
  colors[7].innerText = `cta: '${colorCta.normal}',`

  colors[8].style.background = colorCta.dark
  colors[8].innerText = `ctaDark: '${colorCta.dark}',`

  neutral.style.background = hex[0].innerText
  primary.style.background = hex[1].innerText
  cta.style.background = hex[2].innerText
})

// convertir hex a formato HSL
function hexToHSL(hex) {
  // convert hex to RGB first
  let r = 0, g = 0, b = 0
  if(hex.length == 4) {
    r = '0x' + hex[1] + hex[1]
    g = '0x' + hex[2] + hex[2]
    b = '0x' + hex[3] + hex[3]
  } else if(hex.length == 7) {
    r = '0x' + hex[1] + hex[2]
    g = '0x' + hex[3] + hex[4]
    b = '0x' + hex[5] + hex[6]
  }

  // convert RGB to HSL
  r /= 255
  g /= 255
  b /= 255

  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0

  if(delta == 0) {
    h = 0
  } else if(cmax == r) {
    h = ((g-b) / delta) % 6
  } else if(cmax == g) {
    h = (b-r) / delta +2
  } else {
    h = (r - g) / delta +4
  }

  h = Math.round(h * 60)

  if(h < 0) {
    h += 360
  }

  l = (cmax + cmin) / 2
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l -1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  let normal = "hsl(" + h + "," + s + "%," + l + "%)"
  let light = "hsl(" + h + "," + s + "%," + (l+8).toFixed(1) + "%)"
  let dark = "hsl(" + h + "," + s + "%," + (l-12).toFixed(1) + "%)"
  let scheme = {
    normal : normal,
    light : light,
    dark : dark 
  }

  // scheme = JSON.stringify(scheme)
  // return "hsl(" + h + "," + s + "%," + l + "%"
  return scheme
  // console.log(scheme.dark)
}