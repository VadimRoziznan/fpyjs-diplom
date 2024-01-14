/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = this.getToken();
  static lastCallback
  /*static lastCallback = (result) => {
    alert(result.response[0].first_name)
  };*/

  static getToken() {
    let vkToken = localStorage.getItem('VK_TOKEN');
    if (!vkToken) {
      vkToken = prompt('Введите токен VK');
      localStorage.setItem('VK_TOKEN', vkToken);
    }

    return vkToken
  }

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    self.lastCallback = callback;
  
    const newScript = document.createElement('script');
    newScript.id = 'apiScript'
    
    try {
      newScript.innerHTML = `
      $.ajax({
        url: 'https://api.vk.com/method/photos.get?owner_id=${id}&album_id=wall&access_token=${this.ACCESS_TOKEN}&v=5.81',
        method: 'GET',
        dataType: 'JSONP',
        async: false,
        success: function (response){
          self.lastCallback(VK.processData(response)) 
        }
    })`
    
    document.body.appendChild(newScript);
    } catch (error) {
      VK.processData(error.message)
    }
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){

    if (result.error) {
      alert(`:( Опаньки что то пошло не так:\n ${result.error.error_msg}`);
      return 0
    }
    
    const apiScript = document.getElementById('apiScript')
    apiScript.parentNode.removeChild(apiScript)

    const NewArray = new Array;
    
    result.response.items.forEach(element => {
      const len = element.sizes.length - 1
      const url = element.sizes[len].url
      const name = element.id
      const date = element.date
     
      NewArray.push({
        'name': name, 
        'date': date,
        'url': url,
      })
    });
    
    self.lastCallback = () => {}
    return NewArray
 


  

    
  
    

    
  }
}
