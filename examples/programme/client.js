/* global Scope */
'use strict';

require('Scope/dist/Scope.js');

const createExample = require('../../lib/browser/example');

const div = document.createElement('div')
div.innerHTML = `
<div class="row">
<div class="col s12 m7">
  <div class="card">
    <div class="card-image">
      <img src="data:image/jpeg;base64,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">
      <span class="card-title" style="background: -webkit-linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      background: linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      -webkit-background-clip: text;
      -webkit-text-fill-color: black;">Mairie de mérignac</span>
    </div>
    <div class="card-content">
      <h5>15h30</h5>
      <p>60 Avenue du Maréchal de Lattre de Tassigny, 33700 Mérignac</p>
    </div>
    <div class="card-action">
      <a href="https://www.google.com/maps/dir/?api=1&destination=M%C3%A9rignac+Mairie">Itinairaire</a>
      <a href="/invites/index.html">Cérémonie en direct</a>
    </div>
  </div>
</div>
<div class="col s12 m7">
  <div class="card">
    <div class="card-image">
      <img src="https://my.viaparents.com/wp-content/uploads/job-manager-uploads/featured_image/2018/03/parcs-de-bordeaux-parc-de-la-mairie-merignac-maman-blogueuse-sorties-loisirs-blog-gironde-by-modaliza-photographe-1841-768x512.jpg">
      <span class="card-title" style="background: -webkit-linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      background: linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      -webkit-background-clip: text;
      -webkit-text-fill-color: black;">Photos</span>
    </div>
    <div class="card-content">
      <h5>16h20</h5>
      <p>60 Avenue du Maréchal de Lattre de Tassigny, 33700 Mérignac</p>
    </div>
    <div class="card-action">
      <a href="https://www.google.com/maps/dir/?api=1&destination=M%C3%A9rignac+Mairie">Itinairaire</a>
      <a href="/video-compositing/index.html">Prendre une photo</a>
      <a href="/sine-wave-stereo/index.html">Voir les photos</a>
    </div>
  </div>
</div>
<div class="col s12 m7">
  <div class="card">
    <div class="card-image">
      <img src="https://cdn5.1001salles.com/images/5071/g/1475664611_538_216213693.jpg">
      <span class="card-title" style="background: -webkit-linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      background: linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      -webkit-background-clip: text;
      -webkit-text-fill-color: black;">Vin d'honneur</span>
    </div>
    <div class="card-content">
      <h5>18h45</h5>
      <p>759 Cours de la Libération
      33600 PESSAC</p>
    </div>
    <div class="card-action">
      <a href="https://www.google.com/maps/dir/?api=1&destination=759+Cours+de+la+Libération+33600+PESSAC">Itinairaire</a>
    </div>
  </div>
</div>
<div class="col s12 m7">
  <div class="card">
    <div class="card-image">
      <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=440x10000:format=jpg/path/s4faf44a9b7df78d1/image/i3ddb3d91a50c5500/version/1563958733/bouquet-de-mari%C3%A9e-montpellier.jpg">
      <span class="card-title" style="background: -webkit-linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      background: linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      -webkit-background-clip: text;
      -webkit-text-fill-color: black;">Lancer du bouquet</span>
    </div>
    <div class="card-content">
      <h5>19h45</h5>
      <p>759 Cours de la Libération
      33600 PESSAC</p>
    </div>
    <div class="card-action">
      <a href="https://www.google.com/maps/dir/?api=1&destination=759+Cours+de+la+Libération+33600+PESSAC">Itinairaire</a>
    </div>
  </div>
</div>
<div class="col s12 m7">
  <div class="card">
    <div class="card-image">
      <img src="https://www.aleou.fr/images/etablissements/11455/moy/le-relais-de-compostelle-pessac-restauration.jpg">
      <span class="card-title" style="background: -webkit-linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      background: linear-gradient(top, #8f6B29, #FDE08D, #DF9F28);
      -webkit-background-clip: text;
      -webkit-text-fill-color: black;">Repas</span>
    </div>
    <div class="card-content">
      <h5>20h00</h5>
      <p>759 Cours de la Libération
      33600 PESSAC</p>
    </div>
    <div class="card-action">
      <a href="https://www.google.com/maps/dir/?api=1&destination=759+Cours+de+la+Libération+33600+PESSAC">Itinairaire</a>
      <a href="#">Menu</a>
    </div>
  </div>
</div>
</div>
`
document.body.appendChild(div)

createExample('sine-wave', 'description', {
    beforeAnswer: {}
});