

/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( searchBlock ) {
    this.searchBlock = searchBlock;
    this.registerEvents();
  }
  

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    const input = this.searchBlock.querySelector('input');
    const buttonReplace = this.searchBlock.querySelector('.replace')
    const buttonAdd = this.searchBlock.querySelector('.add')

    buttonReplace.addEventListener('click', () => {
      const imagesWrapper = document.querySelector('.images-wrapper')
      const rowDiv = imagesWrapper.querySelector('.row:first-child')

      while (rowDiv.hasChildNodes()) {
        rowDiv.removeChild(rowDiv.firstChild);
      }

      this.getImage(input);

    })

    buttonAdd.addEventListener('click', () => {
      this.getImage(input);
      
    })

    ///
  }

  getImage(input){
    const inputValue = input.value.trim();
      
    if (this.checkUserId(inputValue)) {
      const userId = this.checkUserId(inputValue)

      function callback(response) {

        App.imageViewer.drawImages(response)
        
        return response
      }

      VK.get(userId, callback);

    }
  }

  checkUserId(value){
    const isNumeric = /^\d+$/.test(value)

    if (isNumeric) {
      return parseInt(value)
    } else {
      alert('Некорректный ввод данных!')
      return false;
    }
  }
}