/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {

  static imagesWrapper

  constructor( element ) {
    this.element = element;
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    const buttonSelectAll = document.querySelector('button.select-all')
    const buttonSend = document.querySelector('button.send')
    const buttonShowUpLoadedFiles = document.querySelector('.show-uploaded-files');
    const images = document.querySelectorAll('img')
    const preview = document.querySelector('img.image')
    
    images.forEach(function(image){
      image.addEventListener('click', () => {
        if (image.classList.contains('selected')) {
          image.classList.remove('selected')
        } else {
          images.forEach(function(image){
            buttonSend.classList.add('disabled')
          })
          image.classList.add('selected')
        
          buttonSelectAll.textContent = 'Выбрать всё'
          buttonSelectAll.classList.add('selectAll')
          buttonSend.classList.remove('disabled')
        }
      })
      image.addEventListener('dblclick', event =>{
        preview.src = image.src
      })
    })

    buttonShowUpLoadedFiles.addEventListener('click', () => {
      App.getModal('filePreviewer').open()

      const callback = (data) => {
        App.getModal('filePreviewer').showImages(data)
      } 
      const allImages = Yandex.getUploadedFiles(callback)
      
      
    
    })

    this.checkButtonText()
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {

  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    
    if (images.length > 0) {
      const buttonSelectAll = document.querySelector('button.select-all')
      buttonSelectAll.classList.remove('disabled')
    } else {
      return
    }

    const imagesWrapper = document.querySelector('.images-wrapper')
    const rowDiv = imagesWrapper.querySelector('.row:first-child')

    images.forEach((image) => {
      const newDiw = document.createElement('div')
      newDiw.classList.add('four', 'wide', 'column', 'ui', 'medium', 'image-wrapper')

      const newImg = document.createElement('img')
      newImg.src = image.url;
      newImg.setAttribute('name', image.name)
      newImg.setAttribute('date', image.date)
      

      newDiw.appendChild(newImg)
      rowDiv.appendChild(newDiw)
    });

    self.imagesWrapper = rowDiv
    this.registerEvents()
    
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const buttonSelectAll = document.querySelector('button.select-all')
    const buttonSend = document.querySelector('button.send')
    const images = document.querySelectorAll('img')

    buttonSelectAll.classList.add('selectAll')

    buttonSelectAll.onclick = () => {
      if (buttonSelectAll.classList.contains('selectAll')) {
        buttonSelectAll.textContent = 'Снять выделение'
        buttonSelectAll.classList.remove('selectAll')

        buttonSend.classList.remove('disabled')

        images.forEach(function(image){
          image.classList.add('selected')
        })
      } else {
        buttonSelectAll.textContent = 'Выбрать всё'
        buttonSelectAll.classList.add('selectAll')

        buttonSend.classList.add('disabled')

        images.forEach(function(image){
          image.classList.remove('selected')
        })
      }
    }
    
    buttonSend.onclick = () => {
      const selectImages = new Array
      images.forEach(function(image) {
        if (image.classList.contains('selected')) {
          selectImages.push(image)
          //selectImages.push(image.currentSrc)
        }
      })

      App.modals.fileUploader.open()
      App.modals.fileUploader.showImages(selectImages)
    }
  }
}