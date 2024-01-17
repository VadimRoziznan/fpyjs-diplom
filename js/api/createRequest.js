/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {

      const xhr = new XMLHttpRequest();

      if (options['command'] === 'uploadFile') {
        const folder = createFolder(options.path)
        
        if (folder) {
          uploadFile(options.path, options.url)
        }

      } else if (options['command'] === 'getFiles') {
        return getFiles()

      } else if (options['command'] === 'removeFile') {
        return deleteFile(options.path)
        
      }



      function createFolder(folderName) {
        const url = `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(folderName)}`
        const method = 'PUT';
        xhr.open(method, url, false);
        const response = send(xhr)

        if ([200, 201, 409].includes(response.status)) {
          return true
        } else {
          alert(response.statusText)
          return false
        }
      }
      
      function uploadFile(folderName, pathToFile) {
        const url = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(folderName + '/' + options.name + '.jpg')}&url=${encodeURIComponent(pathToFile)}`
        const method = 'POST';
        xhr.open(method, url, false);
        
        const token = Yandex.getToken();
        xhr.setRequestHeader('Authorization', token)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();
      }

      function getFiles() {
        const url = `https://cloud-api.yandex.net/v1/disk/resources/files`
        const method = 'GET';
        xhr.open(method, url, false);
        
        const token = Yandex.getToken();
        xhr.setRequestHeader('Authorization', token)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();
        return xhr.response
      }

      function deleteFile(path) {
        const url = `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(path)}`
        const method = 'DELETE';
        xhr.open(method, url, true);
        
        const token = Yandex.getToken();
        xhr.setRequestHeader('Authorization', token)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();
        return xhr.response
      }

      
      function send(xhr) {
        const token = Yandex.getToken();
        xhr.setRequestHeader('Authorization', token)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();

        return xhr
      }
      
};
