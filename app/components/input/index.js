import inputTemplate from './types/text-input.html.txt'
import fileInputTemplate from './types/file-input.html.txt'
import textareaTemplate from './types/textarea-input.html.txt'
import {
  createCustomElement,
  evaluateTemplate,
} from '../../../utils/custom-element'
import './style.scss'
const logIf = require('../../../utils/logIf.js')

const inputAttributes = [
  'waStateBusinessLicenseUbiNumber',
  'subcaption',
  'checked',
  'placeholder',
  'width',
  'disabled', // Why is this not working on the textarea?
  'alias',
  'labelClass',
  'id',
  'type',
  'value',
  'moveLabel',
  'className',
  'fieldName',
  'required',
  'multiple',
  'accept',
  'description',
]

createCustomElement(
  'input-component',
  function () {
    logIf.component && console.log('input-component loaded')
    // set slot

    if (!this.getAttribute('moveLabel')) {
      moveLabel.bind(this)()
    }

    if (this.getAttribute('type') === 'password') {
      setPasswordVisibilityListener.bind(this)()
    }

    function setPasswordVisibilityListener() {
      setTimeout(() => {
        // Ensure elements exist before adding event listeners
        const passwordToggles = this.querySelectorAll('.password-toggle')
        if (passwordToggles.length > 0) {
          passwordToggles.forEach((el) => {
            el.addEventListener('click', (e) => {
              const target = e.target
              const label = target.closest('label')
              if (label) {
                const input = label.querySelector('input')
                const isShowingPassword =
                  label.getAttribute('password-toggle') === 'hide'
                if (isShowingPassword) {
                  input.type = 'text'
                  label.setAttribute('password-toggle', 'show')
                } else {
                  input.type = 'password'
                  label.setAttribute('password-toggle', 'hide')
                }
              }
            })
          })
        } else {
          console.error('No elements with class "password-toggle" found.')
        }
      }, 100)
    }
  },
  inputTemplate,
  '',
  {
    attributes: inputAttributes,
  }
)

createCustomElement(
  'textarea-component',
  function () {
    moveLabel.bind(this)()

    // check for value
    const value = this.getAttribute('value')
    if (value) {
      this.querySelector('textarea').innerText = value
    }

    // check for attribute 'disabled'
    const disabled = this.getAttribute('disabled')
    console.log({ disabled })
    if (disabled) {
      this.querySelector('textarea').setAttribute('disabled', 'disabled')
    }

  },
  textareaTemplate,
  '',
  {
    attributes: inputAttributes,
  }
)

createCustomElement(
  'file-input-component',
  function () {
    const imagesContainer = this.querySelector('.images-container')
    const parentContainer = imagesContainer.closest('.file-input-component')
    const labelContainer = parentContainer.querySelector('.label-container')

    this.setImage = function (src, file) {
      // empty out the images container
      const inputLabelText = imagesContainer.querySelector('.ifEmpty').outerHTML
      imagesContainer.innerHTML = inputLabelText
      const fileNameEl = parentContainer.querySelector('.file-name')
      if (fileNameEl) {
        fileNameEl.remove()
      }

      const img = document.createElement('img')
      const deleteButton = document.createElement('button')
      const alertButton = document.createElement('i')
      alertButton.classList.add('fas', 'fa-exclamation-triangle', 'alert-icon')

      deleteButton.textContent = 'X'
      deleteButton.classList.add('delete-button')
      deleteButton.addEventListener('click', (e) => {
        img.remove()
        deleteButton.remove()
        imagesContainer.classList.remove('has-images')
        parentContainer.querySelector('.file-name').remove()
        parentContainer
          .querySelectorAll('.error')
          .forEach((error) => error.remove())
        // remove button from file input
        const fileInput = parentContainer.querySelector('input')
        fileInput.value = ''
        // empty .img-container
        imagesContainer.innerHTML = inputLabelText

        // guarantee that the file input is required
        fileInput.setAttribute('required', 'required')

        // prevent bubbling event on delete image button
        e.stopPropagation()
        e.stopImmediatePropagation()
      })

      const imgContainer = document.createElement('div')
      imgContainer.classList.add('img-container')
      imgContainer.appendChild(img)
      labelContainer.appendChild(deleteButton)

      labelContainer.appendChild(alertButton)

      imagesContainer.appendChild(imgContainer)
      imagesContainer.classList.add('has-images')

      img.src = src

      // Make sure the image fits within the container
      img.onload = () => {
        const { width, height } = img
        if (width > height) {
          img.style.width = '100%'
          const aspectRatio = height / width
          img.style.height = `${aspectRatio * 100}%`
          img.style.width = '100%'
        } else {
          img.style.height = '100%'
          const aspectRatio = width / height
          img.style.width = `${aspectRatio * 100}%`
        }
      }

      img.style.display = 'block'
      img.style.margin = 'auto'

      // display the name of the file
      const fileName = document.createElement('p')
      fileName.textContent = file.name
      fileName.classList.add('file-name')
      parentContainer.appendChild(fileName)

      return this
    }

    this.querySelector('input').addEventListener('click', (e) => {
      // prevent bubbling event on delete image button
      if (e.target.classList.contains('delete-button')) {
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
    })

    // Set listeners to display images added to file input
    this.querySelector('input').addEventListener('change', async (e) => {
      // get the file input
      const fileInput = e.target
      // Disable the input while processing
      fileInput.disabled = true
      // get the file input UI element
      const fileInputUI = fileInput.closest('.file-input-component')
      fileInputUI.classList.add('loading')

      await new Promise((resolve) => setTimeout(resolve, 5000))

      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          this.setImage(reader.result, file)

          this.querySelector('.file-input-component').classList.remove(
            'hasError'
          )

          // Display possible errors with this file
          // Requirements: Size must be no larger than 3 mb.
          // Must not be a thumbnail image.
          // One image must be a square

          logIf.component &&
            console.log('file size check ', {
              fileSize: file.size,
              fileName: file.name,
              fileType: file.type,
            })

          // Check if the file is a thumbnail image by checking the size (size must be greater than 20kB )
          if (file.size < 400000) {
            const error = document.createElement('p')
            error.textContent =
              'This image is too small. Please upload an image larger than 400 KB'
            error.classList.add('error')
            parentContainer.appendChild(error)
            this.querySelector('.file-input-component').classList.add(
              'hasError'
            )
          }
          // make sure the image isn't too big
          if (file.size > 5000000) {
            // 5 MB
            const error = document.createElement('p')
            error.textContent =
              'File is too large. Please upload an image less than 5 mb.'
            error.classList.add('error')
            parentContainer.appendChild(error)
            this.querySelector('.file-input-component').setAttribute(
              'hasError',
              true
            )
          }

          // Get attribute "square" from component
          const squareRequirement = this.getAttribute('square-requirement')
          if (squareRequirement) {
            // check for square size
            const image = new Image()
            image.src = reader.result
            image.onload = () => {
              const { width, height } = image
              logIf.component && console.log({ width, height })

              const isWithinRange = (value1, value2, range) => {
                // Roughly 10 percent of the range
                const tenPercent = range * 0.1
                return (
                  value1 > value2 - tenPercent && value1 < value2 + tenPercent
                )
              }

              if (!isWithinRange(width, height, width)) {
                const error = document.createElement('p')
                error.textContent =
                  'Image is not square. Please upload a square image.'
                error.classList.add('error')
                parentContainer.appendChild(error)
              }
            }
          }

          // Disable the input while processing
          fileInput.disabled = false
          // get the file input UI element
          fileInputUI.classList.remove('loading')
        }
        reader.readAsDataURL(file)
      })
    })
  },
  fileInputTemplate,
  '',
  {
    attributes: inputAttributes,
  }
)

function moveLabel() {
  this.querySelectorAll('input, textarea').forEach((el) => {
    el.addEventListener('focus', (e) => {
      const target = e.target
      target.closest('label').classList.add('moveLabel')
      target
        .closest('label')
        .querySelector('[part]')
        .setAttribute('part', 'labelText moveLabel')
    })
    el.addEventListener('blur', (e) => {
      const target = e.target
      if (target.value === '') {
        target.closest('label').classList.remove('moveLabel')
        target
          .closest('label')
          .querySelector('[part]')
          .setAttribute('part', 'labelText')
      }
    })
    el.addEventListener('change', (e) => {
      const target = e.target
      if (target.value === '') {
        target.closest('label').classList.remove('moveLabel')
        target
          .closest('label')
          .querySelector('[part]')
          .setAttribute('part', 'labelText')
      } else {
        target.closest('label').classList.add('moveLabel')
        target
          .closest('label')
          .querySelector('[part]')
          .setAttribute('part', 'labelText moveLabel')
      }
    })
  })
}
