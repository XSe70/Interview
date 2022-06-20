function ajax(method, url, flag) {
  const xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMHTTP')
  //兼容IE6
  xhr.open(method, url, flag)
  xhr.send(null)
  xhr.onreadystatechange = function () {
    if (xhr.readState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      console.log(xhr.responseText)
    }
  }
}

/**
 * promise封装
 */

function ajax(method, url, data) {}
