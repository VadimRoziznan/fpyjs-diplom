/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';
  

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){

      let yandexToken = localStorage.getItem('YA_TOKEN');
  
      if (!yandexToken) {
        yandexToken = prompt('Введите токен от Яндекс Диска');
        localStorage.setItem('YA_TOKEN', yandexToken);
      }
  
      return yandexToken;
    }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, name, callback){
    const command = 'uploadFile'
    createRequest({path, url, name, command, callback})

  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    const command = 'removeFile'
    const request = createRequest({path, command})
    callback(request)

  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    const command = 'getFiles'
    const request = createRequest({command})
    const items = JSON.parse(request).items
    const data = new Array

    items.forEach(element => {
      const path = element.path;
      const file = element.file;
      const name = element.name;
      const date = element.created;
      const size = (parseInt(element.size) / 1024).toFixed(1);

      

      data.push({
        'path': path,
        'file': file,
        'name': name,
        'date': date,
        'size': size
      })
    });
    callback(data)
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    const link = document.createElement('a');
    link.setAttribute('href',url);
    link.setAttribute('download','download');
    onload=link.click();

  }
}
