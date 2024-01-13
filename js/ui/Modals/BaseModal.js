/**
 * Класс BaseModal
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {
  constructor( element ) {
    this.elementSemantic = element
    this.elementDOM = element[0]
    //this.buttonSend = document.querySelector('button.send')
  }

  /**
   * Открывает всплывающее окно
   */
  open() {
    $(this.elementSemantic).modal('show')
  }

  /**
   * Закрывает всплывающее окно
   */
  close() {
    $(this.elementSemantic).modal('hide')
  }
}