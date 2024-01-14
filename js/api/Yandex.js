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
    //const data = {path, url, callback}
    createRequest({path, url, name, callback})

  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){

  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    callback('dathjjhhja')
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){

  }
}
