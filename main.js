const imgInput = document.querySelector('#img-select')
const imgPreview = document.querySelector('.preview')

if(!window.EyeDropper) {
	alert('your browser does not support this feature')
}

// creating a new instance of eyeDropper
const eyeDropper = new EyeDropper()
const pickerBtn = document.querySelector('.open-picker')

imgInput.addEventListener('change', () => {
	const file = this.files[0]
	// if the user doesn't select an image then don't do anything
	if(!file) return

	const reader = new FileReader()

	reader.addEventListener('load', () => {
		imgPreview.src = this.result
	})

	reader.readAsDataURL(file)
})

pickerBtn.addEventListener('click', () => {
	// open the color picker
	eyeDropper.open()
		.then(res => {
			result.innerHTML = `Picker Color: <b>${res.sRGBHex}</b>`
		})
		.catch(err => {
			console.log('User canceled the selection.')
		})
})


