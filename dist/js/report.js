//
(function () {
  let createTable = (dataArr) => {
    let table = document.createElement('table');
    //header
    let head = table.createTHead();
    let headr = head.insertRow(0);
    headr.insertCell(-1).innerHTML = 'Nr.';
    headr.insertCell(-1).innerHTML = 'Kļička';
    headr.insertCell(-1).innerHTML = 'Vecums';
    //data
    let i = 0;
    let data = dataArr;
    data.forEach(e => {
      if (e) {
        i += 1;
        let item = JSON.parse(e);
        let row = table.insertRow(-1);
        row.insertCell(-1).innerHTML = i + '.';
        row.insertCell(-1).innerHTML = item.name;
        row.insertCell(-1).innerHTML = item.age;
      }
    });
    return table;
  };
  let getreport = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.querySelector('.rep').replaceChild(createTable(this.responseText.split('\n')), document.querySelector('.rep table'));
      }
    }
    xhttp.open('POST', '/lor/report', true);
    xhttp.send();
  };
  window.addEventListener('load', () => {
    getreport();
    document.querySelector('#rep-new').addEventListener('click', (e) => {
      e.preventDefault();
      getreport();
    })
  });
})();
