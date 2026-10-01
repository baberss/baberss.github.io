/* Блок «Команда» из team.json.
   Карточки правятся в админке (папка admin/). Если team.json не загрузился
   (сайт открыт с диска, нет сети), на странице остаются карточки из HTML. */
(function () {
  var section = document.getElementById('team');
  if (!section) return;
  var grid = section.querySelector('.team');
  if (!grid) return;

  fetch('team.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var people = Array.isArray(data.people) ? data.people : [];
      grid.textContent = '';
      people.forEach(function (p) {
        var art = document.createElement('article');
        art.className = 'person';

        var ph = document.createElement('div');
        ph.className = 'ph';
        if (p.photo) {
          var img = document.createElement('img');
          img.src = p.photo;
          img.alt = p.name ? 'Фото: ' + p.name : 'Фото сотрудника';
          img.loading = 'lazy';
          img.width = 800; img.height = 1000;
          ph.appendChild(img);
        } else {
          var s = document.createElement('span');
          s.textContent = 'Место под фотографию сотрудника';
          ph.appendChild(s);
        }

        var body = document.createElement('div');
        body.className = 'body';
        var h = document.createElement('h3'); h.textContent = p.name || '';
        var role = document.createElement('p'); role.className = 'role'; role.textContent = p.role || '';
        var txt = document.createElement('p'); txt.textContent = p.text || '';
        body.appendChild(h); body.appendChild(role); body.appendChild(txt);

        art.appendChild(ph); art.appendChild(body);
        grid.appendChild(art);
      });
      var show = data.visible !== false && people.length > 0;
      section.hidden = !show;
      var navLinks = document.querySelectorAll('a[href="#team"]');
      for (var i = 0; i < navLinks.length; i++) navLinks[i].hidden = !show;
    })
    .catch(function () { /* оставляем карточки из HTML */ });
})();
