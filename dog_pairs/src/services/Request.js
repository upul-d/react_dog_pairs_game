class Request {

  constructor(url) {
    this.url = url;
  }

  get() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function() {
        if (this.status !== 200) {
          reject(`Status code: ${this.status}`)
        }
        const jsonString = this.responseText;
        const data = JSON.parse(jsonString);
        resolve(data)
      })

      xhr.open('GET', this.url);
      xhr.send();
    })
  }


}

export default Request