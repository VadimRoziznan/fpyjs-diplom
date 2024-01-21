/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {

  //static imagesWrapper

  constructor( element ) {
    this.element = element;
    this.checkButtonText()
    this.registerEvents()
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
    const buttonSend = document.querySelector('button.send')
    const buttonShowUpLoadedFiles = document.querySelector('button.show-uploaded-files');
    const images = document.querySelectorAll('.row')[2].children
    const preview = document.querySelector('img.image')
    const row = document.querySelectorAll('.row')[2]
    var clickTimer = null;   

    function handleClick(event) { 

      if (clickTimer === null) {
        if (event.target.parentNode.classList.contains('image-wrapper')) {
          if (!event.target.classList.contains('selected')) {
            event.target.classList.add('selected')
            buttonSend.classList.remove('disabled')
          } else {
            event.target.classList.remove('selected')
            var selected = false
            for (let index = 0; index < images.length; index++) {
              const element = images[index];
              if (element.children[0].classList.contains('selected')) {
                selected = true
              }
            }
            if (!selected) {
              buttonSend.classList.add('disabled')
            }
          }
        }
        clickTimer = setTimeout(function() { 
          clickTimer = null; 
        }, 250); 

      } else { 
        if (event.target.tagName === 'IMG') {
          preview.src = event.target.src 
        }
        clearTimeout(clickTimer); 
        clickTimer = null; 
      } 
    } 


    row.addEventListener("click", handleClick);
     

    buttonShowUpLoadedFiles.addEventListener('click', () => {

      App.getModal('filePreviewer').open()

      const callback = (data) => {
        App.getModal('filePreviewer').showImages(data)
      } 
      
      Yandex.getUploadedFiles(callback)
      
    })
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
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const buttonSelectAll = document.querySelector('button.select-all')
    const buttonSend = document.querySelector('button.send')

    buttonSelectAll.classList.add('selectAll')

    buttonSelectAll.onclick = () => {

      const images = this.element.querySelectorAll('img')

      if (buttonSelectAll.classList.contains('selectAll')) {

        buttonSelectAll.textContent = 'Снять выделение'
        buttonSelectAll.classList.remove('selectAll')
        buttonSend.classList.remove('disabled')

        for (let index = 0; index < images.length; index++) {

          const image = images[index];
          image.classList.add('selected')

        }
      } else {

        buttonSelectAll.textContent = 'Выбрать всё'
        buttonSelectAll.classList.add('selectAll')
        buttonSend.classList.add('disabled')

        for (let index = 0; index < images.length; index++) {
          const image = images[index];
          image.classList.remove('selected')

        }
      }
    }
    
    buttonSend.onclick = () => {

      const images = this.element.querySelectorAll('img')
      const selectImages = new Array

      images.forEach(function(image) {

        if (image.classList.contains('selected')) {
          selectImages.push(image)

        }
      })

      App.modals.fileUploader.open()
      App.modals.fileUploader.showImages(selectImages)

    }
  }
}