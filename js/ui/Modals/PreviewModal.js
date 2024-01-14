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
    const buttonClose = this.elementDOM.querySelector('.x');

    buttonClose.onclick = () => {
      this.close()
    }

  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    console.log('получил колбек)))')
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {

  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    const imagePreviewContainer = document.createElement('div');
    imagePreviewContainer.classList.add("image-preview-container");

    imagePreviewContainer.innerHTML = `
      <img src='XXX' />
      <table class="ui celled table">
      <thead>
        <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
      </thead>
      <tbody>
        <tr><td>AAA</td><td>BBB</td><td>CCCКб</td></tr>
      </tbody>
      </table>
      <div class="buttons-wrapper">
        <button class="ui labeled icon red basic button delete" data-path='PPP'>
          Удалить
          <i class="trash icon"></i>
        </button>
        <button class="ui labeled icon violet basic button download" data-file='FFF'>
          Скачать
          <i class="download icon"></i>
        </button>
      </div>
    `
    return imagePreviewContainer
  }
}
