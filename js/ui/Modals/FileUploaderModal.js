/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal{
  constructor( element ) {
    super(element);
    this.registerEvents()
    
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){

    this.elementDOM.querySelector('.x').onclick = () => {
      this.close()
       const content =  this.elementDOM.querySelector('.content')
       const childrenDiv = content.querySelectorAll('div')
       childrenDiv.forEach(function(div) {
        div.remove();
        
       });
    }

    this.elementDOM.querySelector('.close').onclick = () => {
      this.close()
      const content =  this.elementDOM.querySelector('.content')
       const childrenDiv = content.querySelectorAll('div')
       childrenDiv.forEach(function(div) {
        div.remove();
        
       });
    }

    this.elementDOM.querySelector('.send-all').onclick = () => {
      this.sendAllImages();
    }

    this.elementDOM.querySelector('.content').onclick = (event) => {
      const button = event.target;
      const parentTag = button.parentNode
      if (['button', 'i'].includes(button.tagName.toLowerCase())) {
        const inputText = button.closest('.input').querySelector('input').value
        const imageContainer = button.parentNode.closest('.image-preview-container')
        
        this.sendImage(imageContainer)
      }
    }


  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    const parent = this.elementDOM.getElementsByClassName('content')[0]

    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      
      const html = this.getImageHTML(image)
      
      parent.appendChild(html)
      
      
    }
   
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    const imagePreviewContainer = document.createElement('div')
    imagePreviewContainer.classList.add("image-preview-container")
    
    imagePreviewContainer.innerHTML = `
      <img src="${item.src}" name="${item.name}" date="${item.date}">
      <div class="ui action input">
        <input type="text" placeholder="Путь к файлу">
        <button class="ui button"><i class="upload icon"></i></button>
      </div>
    `
    return imagePreviewContainer
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    const imageContainer = document.querySelectorAll('.image-preview-container');
    imageContainer.forEach(image => {
      this.sendImage(image);
    })
    
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {

    const inputValue = imageContainer.querySelector('input').value
    const inputClassList = imageContainer.querySelector('.input').classList
    const url = imageContainer.querySelector('img').src
    const name = imageContainer.querySelector('img').name

    if (!inputValue) {
      inputClassList.add('error')
      return
    }
    
    inputClassList.remove('error')
    inputClassList.add('disabled')

    const path =  inputValue
    Yandex.uploadFile(path, url, name, callback)

    function callback(response) {
      console.log(response)
    }
  }
}