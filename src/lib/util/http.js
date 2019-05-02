
class Http {
  constructor(header) {
    this.header = header;
  }

  getHttp() {
    return new XMLHttpRequest();
    /*
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
    */
  }

  async get(url, option) {
    let xhttp = this.getHttp();
    xhttp.open('GET', url, true);
    xhttp.setRequestHeader('Content-type', 'Content-Type:application/json');
    return await this.process(xhttp);
  }

  async post(url, data, option) {
    let xhttp = this.getHttp();
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'Content-Type:application/json');
    if (data) {
      return await this.process(xhttp, JSON.stringify(data));
    } else {
      return await this.process(xhttp);
    }
  }

  async put(url, data, option) {
    let xhttp = this.getHttp();
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader('Content-type', 'Content-Type:application/json');
    if (data) {
      return await this.process(xhttp, JSON.stringify(data));
    } else {
      return await this.process(xhttp);
    }
  }

  process(xhttp, val) {
    return new Promise(resolve => {
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          let body;
          let txt = this.responseText;
          if (txt === undefined || txt === '') {
            body = {}
          } else {
            body =  JSON.parse(this.responseText);
          }
          let data = {
            status: this.status,
            body,
          };
          resolve(data);
        }
      };
      xhttp.send(val);
    });
  }
}

export const http = new Http();
