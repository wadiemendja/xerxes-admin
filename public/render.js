function renderHeader() {
    return `
    <nav class="navbar navbar-expand-lg bg-tertiary"">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
      <img src="./img/logo.jpg" alt="Bootstrap" width="30" height="24">
      </a>
      <a class="navbar-brand" href="#" id="title"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Accueil [demandes]</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/add-request">Ajouter un demande</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">A propos du logiciel</a>
          </li>
        </ul>
        <form class="d-flex " role="search">
          <input class="form-control me-2" id="searchInput" type="search" placeholder="Rechercher par nom, prenon, telephone ou wilaya..." aria-label="Search" style="width: 400px">
          <button class="btn btn-success" type="submit" id="searchBtn">Rechercher</button>
        </form>
      </div>
    </div>
  </nav>
    `;
}

function renderFooter() {
    return `
      <div>
        <div id="trigerSound"></div>
      </div>
    `;
}

export { renderHeader, renderFooter };