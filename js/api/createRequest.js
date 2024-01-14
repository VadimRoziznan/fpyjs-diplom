/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
      //const token = Yandex.getToken();
      const xhr = new XMLHttpRequest();

 /*     if (options.path && options.url) {
        const url = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(options.path)}`
        const method = 'GET';
        xhr.open(method, url, false);
        const response = send(xhr)

        if ([409, 200].includes(response.status)) {
          console.log(response.status)
          console.log(response.responseURL)

        } else {
          alert(response.statusText)
        }
      }*/

      if (options.path && options.url) {
        const folder = createFolder(options.path)
        //const pathToLoad = getDownloadParh(options.path)
        
        if (folder) {
          uploadFile(options.path, options.url)
        }
        
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

      /*function getDownloadPath(folderName) {
        const url = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(folderName)}`
        const method = 'GET';
        xhr.open(method, url, false);

        const token = Yandex.getToken();
        xhr.setRequestHeader('Authorization', token)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();

        if ([200, 201, 409].includes(xhr.status)) {
          console.log(xhr)
          return xhr.responseURL
        } else {
          alert(`getDownloadParh', ${xhr.statusText}, ${xhr.status}`)
          return NaN
        }
      }*/
      
      function uploadFile(folderName, pathToFile) {
        const url = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(folderName + '/' + options.name + '.jpg')}&url=${encodeURIComponent(pathToFile)}`
        const method = 'POST';
        xhr.open(method, url, false);

       // const params = 'url=' + encodeURIComponent(pathToFile)
        
        const token = Yandex.getToken();
        xhr.setRequestHeader('Authorization', token)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();
      }

      



      function send(xhr) {
        const token = Yandex.getToken();
        xhr.setRequestHeader('Authorization', token)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();

        return xhr
      }
      
      
      /*const folderName = 'test'

      const url = 'https://cloud-api.yandex.net/v1/disk/resources/files';
      const uploudurl = `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(folderName)}`
      //const method = options;
      const method = 'PUT';
      const token = Yandex.getToken();
      
      const xhr = new XMLHttpRequest();
      // ...
      try {
        xhr.open(method, uploudurl, true);
        xhr.setRequestHeader('Authorization', token)
        
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send();

        xhr.onload = function() {
          console.log(xhr)
        };

    
      }
      catch (err) {
        // перехват сетевой ошибки
        console.error(err);
      }*/
};
