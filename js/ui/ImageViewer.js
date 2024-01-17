/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {

  //static imagesWrapper

  constructor( element ) {
    this.element = element;
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
    const buttonSelectAll = document.querySelector('button.select-all')
    const buttonSend = document.querySelector('button.send')
    const buttonShowUpLoadedFiles = document.querySelector('button.show-uploaded-files');
    const images = document.querySelectorAll('.row')[2].children
    const preview = document.querySelector('img.image')

    

    const click = 0

    const row = document.querySelectorAll('.row')[1]

    const images2 = document.querySelectorAll('img')

    //console.log(images)
    
/*
    images2.forEach(function(image) {
      image.addEventListener('dbclick', (event) => {
        console.log('sgsw')
      })
    })*/

    row.addEventListener('click', (event) => {
      //console.log(event.target)

     
     

      if (event.target.parentNode.classList.contains('image-wrapper')) {

        preview.src = event.target.src
        

        if (!event.target.classList.contains('selected')) {
          event.target.classList.add('selected')
          buttonSend.classList.remove('disabled')
        } else {
          event.target.classList.remove('selected')
          
          var selected = false

          for (let index = 0; index < images.length; index++) {
            const element = images[index];
            //console.log(element.children[0])
            
            if (element.children[0].classList.contains('selected')) {
              selected = true
            }

            
            
          }

          if (!selected) {
            buttonSend.classList.add('disabled')
            
          }
          
          
        }

       

      }
      
    })
/*
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
*/


    buttonShowUpLoadedFiles.addEventListener('click', () => {
      App.getModal('filePreviewer').open()

      const callback = (data) => {
        App.getModal('filePreviewer').showImages(data)
      } 
      
      Yandex.getUploadedFiles(callback)
      
    
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

    //self.imagesWrapper = rowDiv
    //this.registerEvents()
    
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const buttonSelectAll = document.querySelector('button.select-all')
    const buttonSend = document.querySelector('button.send')
    const images1 = document.querySelectorAll('img')

    const images = document.querySelectorAll('.row')[2].children
    //const t = row.children
    

    buttonSelectAll.classList.add('selectAll')

    buttonSelectAll.onclick = () => {
      if (buttonSelectAll.classList.contains('selectAll')) {
        buttonSelectAll.textContent = 'Снять выделение'
        buttonSelectAll.classList.remove('selectAll')

        buttonSend.classList.remove('disabled')

        for (let index = 0; index < images.length; index++) {
          const element = images[index];
          element.children[0].classList.add('selected')
        }

        /*images.forEach(function(image){
          image.classList.add('selected')
        })*/
      } else {
        buttonSelectAll.textContent = 'Выбрать всё'
        buttonSelectAll.classList.add('selectAll')

        buttonSend.classList.add('disabled')

        for (let index = 0; index < images.length; index++) {
          const element = images[index];
          element.children[0].classList.remove('selected')
        }

        /*images.forEach(function(image){
          image.classList.remove('selected')
        })*/
      }
    }
    
    buttonSend.onclick = () => {
      const selectImages = new Array
      images1.forEach(function(image) {
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