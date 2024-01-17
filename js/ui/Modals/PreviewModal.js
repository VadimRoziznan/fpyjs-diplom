/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal{
  constructor( element ) {
    super(element);
    this.registerEvents()
    
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    const content = this.elementDOM.querySelector('.content');
    const buttonClose = this.elementDOM.querySelector('.x');
    const loadingIcon = content.querySelector('i.loading')
    //const buttonDownload = content.querySelector
    

    buttonClose.onclick = () => {
      const imagePreviewContainer = content.querySelectorAll('.image-preview-container');

      this.close()
      
      imagePreviewContainer.forEach(element => {
        content.removeChild(element)
      })

      loadingIcon.classList = 'asterisk loading icon massive'
    }

    content.addEventListener('click', (event) => {
      if (event.target.classList.contains('download')) {
        Yandex.downloadFileByUrl(event.target.dataset.file)
      }
    })

    content.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete') || event.target.classList.contains('trash')) {

        const callback = (data) => {
          //вызвать удаление блока с кортинкой если ответ null
          if (!data) {
            event.target.parentNode.parentNode.remove()
            //console.log(event.target.parentNode.parentNode)
          }
        } 
        Yandex.removeFile(event.target.dataset.path, callback)
      }
    })

  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    const content = this.elementDOM.querySelector('.content')
    const loadingIcon = content.querySelector('i.loading')
    //console.log(data)
    let count = 0

    data.forEach(element => {
      const imageInfo =  this.getImageInfo(element)
      count = count + 1
      content.appendChild(imageInfo)
    });
    console.log(count)
    
    loadingIcon.classList = 'loading visible transition'
    
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }

    return new Date(date).toLocaleDateString('ru-RU', options);

  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    const imagePreviewContainer = document.createElement('div');
    imagePreviewContainer.classList.add("image-preview-container");

    imagePreviewContainer.innerHTML = `
      <img src=${item.file} />
      <table class="ui celled table">
      <thead>
        <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
      </thead>
      <tbody>
        <tr><td>${item.name}</td><td>${this.formatDate(item.date)}</td><td>${item.size}Кб</td></tr>
      </tbody>
      </table>
      <div class="buttons-wrapper">
        <button class="ui labeled icon red basic button delete" data-path=${item.path}>
          Удалить
          <i class="trash icon" data-path=${item.path}></i>
        </button>
        <button class="ui labeled icon violet basic button download" data-file=${item.file}>
          Скачать
          <i class="download icon"></i>
        </button>
      </div>
    `
    return imagePreviewContainer
  }
}
