//
(function () {
  window.addEventListener('load', () => {
    let cnt = 0;
    document.querySelector('button.send')
      .addEventListener('click', () => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            let atb = document.querySelector('.dialog');
            cnt += 1;
            atb.innerHTML = this.responseText;
          }
        };
        let data = {
          name: document.querySelector('input[name="name"]').value.trim(),
          age: document.querySelector('input[name="age"]').value.trim(),
        };
        xhttp.open('post', '/lor', true);
        //URL
        //  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        //  xhttp.send(encodeURI(`name=${data.name}&age=${data.age}`));

        //???populārie datu apmaiņas tipi un to precīza lietošanas kārtība

        //JSON
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(data));

      });

    document.querySelector('button.report')
      .addEventListener('click', () => {
        window.location.href = '/lor/report';
      });
  });
})();