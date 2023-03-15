import { renderHeader, renderFooter } from "./render.js";
// rendering header and footer
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const tableBody = document.getElementById('table_body');
const noElements = document.getElementById('no_elements');
const spinner = document.getElementById('spinner');
footer.innerHTML = renderFooter();
// get used service
const urlParams = new URLSearchParams(location.search);
const usedService = urlParams.get('service');
header.innerHTML = renderHeader(usedService);
document.getElementById('title').innerText = "Service " + usedService;
// timer
const timeDom = document.getElementById('time');
const dateDom = document.getElementById('date');
const dateArr = new Date().toString().split(' ');
dateDom.innerText = `${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`;
setInterval(() => { timeDom.innerText = new Date().toString().split(' ')[4]; }, 999);
// fetching requests data
let requests = await fetchRequestsByService();
//requests.length = 0;
// empty requests list handeling
if (requests.length == 0) {
    noElements.innerHTML = `
        <img src="./img/no-elements.gif">
        <h2>Aucune demande n'est trouvée, ajoutez-en une pour pouvoir la voir ici<h2>
    `;
    spinner.style.display = "none";
}
// rendering data (requests list)
async function renderRequestsList() {
    tableBody.innerHTML = "";
    for (let i in requests.reverse()) {
        const person = requests[i];
        tableBody.innerHTML += `
        <tr data-daira="${person.daira}" data-commune="${person.commune}" data-description="${person.description}" data-pdf=${person.fichier}>
            <th scope="row" class="id" data-id="${person.id}">${person.id}</th>
            <td class="nom">${person.nom}</td>
            <td class="prenom">${person.prenom}</td>
            <td class="email" data-email="${person.email}">${person.email.substring(0, 16)}...</td>
            <td class="telephone">${person.telephone}</td>
            <td class="wilaya">${person.wilaya}</td>
            <td class="domain">${person.domain}</td>
            <td class="service">${person.service}</td>
            <td class="date_depot">${person.date_depot}</td>
            <td class="duree_trait">${person.duree_trait}</td>
            <td class="statut" data-statut="${person.statut}">${renderStatusBox(person.statut)}</td>
        </tr>
        `;
    }
    spinner.style.display = "none";
}
renderRequestsList();
// data previewer (listening to records click)
const previewer = document.getElementById('data_previewer');
const previewer_container = document.getElementById('preview_container');
function listenToPreviewClicks() {
    tableBody.querySelectorAll('tr').forEach(element => {
        element.addEventListener('click', (event) => {
            document.body.style.overflow = "hidden";
            previewer.style.marginTop = window.scrollY + "px";
            previewer.style.visibility = "visible";
            const nom = element.querySelector('.nom').innerText;
            const prenom = element.querySelector('.prenom').innerText;
            const email = element.querySelector('.email').dataset.email;
            const telephone = element.querySelector('.telephone').innerText;
            const wilaya = element.querySelector('.wilaya').innerText;
            const daira = element.dataset.daira;
            const commune = element.dataset.commune;
            const domain = element.querySelector('.domain').innerText;
            const service = element.querySelector('.service').innerText;
            const date_depot = element.querySelector('.date_depot').innerText;
            const duree_trait = element.querySelector('.duree_trait').innerText;
            const description = element.dataset.description;
            const id = element.querySelector('.id').dataset.id;
            let statut = element.querySelector('.statut').dataset.statut;
            const fichier = eval(element.dataset.pdf);
            console.log(statut)
            previewer_container.innerHTML = `
                <div>
                    <p>
                    ${statut == 1 || statut == -1 || usedService == 'Info' ?
                    `<strong>L'état de la demonde: </strong>
                        <select class="form-select" aria-label="Default select example" id="statutSelecter" disabled>
                                <option value="1" style="background:#008000">Accepté</option>
                                <option value="-1" style="background:#FF0000">Rejeté</option>
                                <option value="0" style="background:#FFCC00">En attendant</option>
                                <option value="2" style="background:#0D6EFD">Accepté par service</option>
                                <option value="-2">Términé</option>
                        </select>`
                    :
                    `<strong>Modifier l'état de la demonde: </strong>
                        <select class="form-select" aria-label="Default select example" id="statutSelecter">
                                <option value="0" style="background:#FFCC00">En attendant</option>
                                <option value="2" style="background:#0D6EFD">Accepté par service</option>
                                <option value="-2">Términé</option>
                        </select>`
                    }
                    </p>
                    <p><strong>Nom: </strong>${nom}</p>
                    <p><strong>Prenom: </strong>${prenom}</p>
                    <p><strong>Email: </strong>${email}</p>
                    <p><strong>Telephone: </strong>${telephone}</p>
                    <p><strong>Wilaya: </strong>${wilaya}</p>
                    <p><strong>Daira: </strong>${daira}</p>
                    <p><strong>Commune: </strong>${commune}</p>
                    <p><strong>Domaine: </strong>${domain}</p>
                    <p><strong>Service: </strong>${service}</p>
                    <p><strong>Date de dépôt: </strong>${date_depot}</p>
                    <p><strong>Durée de traitement: </strong>${duree_trait}</p>
                    <p>
                        <strong>Description: </strong>
                        <textarea class="form-control" id="description" rows="3" ${statut != 0 || usedService == 'Info' ? 'disabled' : ''}>${description}</textarea>
                    </p>
                </div>
                <div class="filesDom">
                    <p><strong>Fichier(s): </strong></p>
                </div>
            `;
            // apending files
            const filesDom = document.querySelector('.filesDom');
            for (let i = 0; i < fichier.length; i++)
                filesDom.innerHTML += `<iframe src="${fichier[i]}"></iframe>`;
            // append buttons
            document.querySelector('.btns').innerHTML = `
                <button class="btn btn-primary preview-btn" id="returnBtn">Retour</button>
                <button class="btn btn-danger preview-btn" id="deleteBtn" ${statut != 0 || usedService == 'Info' ? 'disabled' : ''}>Supprimer la demande</button>
                <button class="btn btn-success preview-btn" id="saveBtn" disabled>Sauvegarder les modifications</button>
            `;
            // listening to changes
            const statutSelecter = document.getElementById('statutSelecter');
            statutSelecter.value = statut;
            statutSelecter.style.background = statutSelecter.querySelector(`[value="${statut}"]`).style.background;
            statutSelecter.addEventListener('change', () => {
                saveBtn.disabled = false;
                statut = statutSelecter.value;
                statutSelecter.style.background = statutSelecter.querySelector(`[value="${statut}"]`).style.background;
            });
            const previewDescription = document.getElementById('description');
            previewDescription.addEventListener('input', () => { saveBtn.disabled = false });
            // change request status and description
            const saveBtn = document.getElementById('saveBtn');
            saveBtn.addEventListener('click', async () => {
                returnBtn.click();
                await editFileStatus(statut, previewDescription.value, id);
                bootbox.dialog({
                    title: 'Message:',
                    message: 'Statut du fichier modifié avec succès.',
                    onEscape: () => location.href = "/service.html?service=" + usedService
                });
            });
            // delete request
            const deleteBtn = document.getElementById('deleteBtn');
            deleteBtn.addEventListener('click', () => {
                bootbox.confirm({
                    title: 'Message:',
                    message: 'Etes-vous sûr de vouloir supprimer cette demode ?',
                    buttons: {
                        confirm: {
                            label: 'Oui',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'Non',
                            className: 'btn-danger'
                        }
                    },
                    callback: async (answer) => {
                        if (!answer) return;
                        returnBtn.click();
                        await deleteRequest(id);
                        bootbox.dialog({
                            title: 'Message:',
                            message: 'Demonde supprimé avec succès.',
                            onEscape: () => location.href = "/service.html?service=" + usedService
                        });
                    }
                });
            });
            // return from preview to home page
            const returnBtn = document.getElementById('returnBtn');
            returnBtn.addEventListener('click', () => {
                previewer.style.visibility = "hidden";
                document.body.style.overflow = "visible";
            });
        });
    });
}
listenToPreviewClicks();
// trigger notification sound when modification happens
const sound = new Audio('./sound/notification.webm');
const trigerSound = document.getElementById('trigerSound');
trigerSound.addEventListener('click', () => sound.play());
// check for updates (refresh list on adding or deleting a request)
const rejectedCountDom = document.getElementById('rejectedCount');
const pendingCountDom = document.getElementById('pendingCount');
const acceptedCountDom = document.getElementById('acceptedCount');
const acceptedByServiceCountDom = document.getElementById('acceptedByServiceCount');
let initStatusCounts = await fetchStatusCounts();
rejectedCountDom.innerText = initStatusCounts.rejectedFiles;
acceptedCountDom.innerText = initStatusCounts.acceptedFiles;
pendingCountDom.innerText = initStatusCounts.pendingFiles;
acceptedByServiceCountDom.innerText = initStatusCounts.acceptedByServiceFiles;
const checkForUpdates = setInterval(async () => {
    const currentStatusCounts = await fetchStatusCounts();
    if (JSON.stringify(currentStatusCounts) != JSON.stringify(initStatusCounts)) {
        rejectedCountDom.innerText = currentStatusCounts.rejectedFiles;
        acceptedCountDom.innerText = currentStatusCounts.acceptedFiles;
        pendingCountDom.innerText = currentStatusCounts.pendingFiles;
        acceptedByServiceCountDom.innerText = currentStatusCounts.acceptedByServiceFiles;
        requests = await fetchRequestsByService();
        initStatusCounts = currentStatusCounts;
        renderRequestsList();
        listenToPreviewClicks();
        // servicesCounts();
        trigerSound.click();
    }
}, 1000);
// seach by nom, prnom...
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const alertSearch = document.querySelector('.search-alert');
searchBtn.addEventListener('click', searchEvent);
document.getElementById('acceptedCount').addEventListener('click', searchEvent);
document.getElementById('pendingCount').addEventListener('click', searchEvent);
document.getElementById('rejectedCount').addEventListener('click', searchEvent);
document.getElementById('acceptedByServiceCount').addEventListener('click', searchEvent);
// functions
async function searchEvent(event) {
    event.preventDefault();
    clearInterval(checkForUpdates);
    const input = event.target.tagName == 'BUTTON' ? searchInput.value : event.target.dataset.status;
    requests = await fetchSearch(input);
    if (usedService != 'Info') {
        const holderArr = [];
        for (let i in requests) if (requests[i].service == usedService) holderArr.push(requests[i]);
        requests = holderArr;
    }
    tableBody.innerHTML = "";
    noElements.innerHTML = "";
    alertSearch.style.display = "";
    alertSearch.innerHTML = `
        <strong>${requests.length}</strong> recherche trouvée par "${input}", revenir à la liste d'origine <a href="./service.html?service=${usedService}" style="color:red">(Home page)</a>
    `;
    if (requests.length == 0) {
        noElements.innerHTML = `
        <img src="./img/no-elements.gif">
        <h2>Aucune demande n'est trouvée, en recherchant <strong>"${input}"</strong><h2>
        `;
    }
    renderRequestsList();
    listenToPreviewClicks();
}
// fetching requests
async function fetchRequests() {
    const fetcher = await fetch('/api/get-requests');
    const requests = await fetcher.json();
    return requests;
}
// fetching requests by service name
async function fetchRequestsByService() {
    if (usedService == 'Info') {
        const fetcher = await fetch('/api/get-requests');
        const requests = await fetcher.json();
        return requests;
    } else {
        const fetcher = await fetch('/api/get-requests-by-service', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ service: usedService })
        });
        const result = await fetcher.json();
        return result;
    }
}
// fetch files status counts
async function fetchStatusCounts() {
    if (usedService == 'Info') {
        const fetcher = await fetch('/api/get-status-counts');
        const statusCounts = await fetcher.json();
        return statusCounts;
    } else {
        const fetcher = await fetch('/api/get-status-counts-by-service', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ service: usedService })
        });
        const result = await fetcher.json();
        return result;
    }
}
// fetch search input if exist
async function fetchSearch(input) {
    const fetcher = await fetch('/api/search', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchInput: input })
    });
    const result = await fetcher.json();
    return result;
}
// render status box (0: en attendant 1: accepté -1: refusé 2: accepté par service -2: términé)
function renderStatusBox(status) {
    if (status == 1) return `<div style="border:1px solid #000000;width:10px;height:10px;background-color:#008000;margin:0 auto"></div>`;
    else if (status == 0) return `<div style="border:1px solid #000000;width:10px;height:10px;background-color:#FFCC00;margin:0 auto"></div>`;
    else if (status == -1) return `<div style="border:1px solid #000000;width:10px;height:10px;background-color:#FF0000;margin:0 auto"></div>`;
    else if (status == 2) return `<div style="border:1px solid #000000;width:10px;height:10px;background-color:#0D6EFD;margin:0 auto"></div>`;
    else return `<div>✔</div>`;
}
// edit file status and description
async function editFileStatus(statut, description, reqId) {
    const fetcher = await fetch('/api/edit-file-status', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statut: statut, description: description, reqId: reqId })
    });
    const result = await fetcher.text();
    return result;
}
// delete request
async function deleteRequest(reqId) {
    const fetcher = await fetch('/api/delete-request', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reqId: reqId })
    });
    const result = await fetcher.text();
    return result;
}
// moment calculation
function calculateTimeGap(time) {
    const result = moment(time).locale('fr').fromNow();
    if (result == "Invalid date") return "---"
    else return result
}
// services requests and time counters
async function servicesCounts() {
    let serviceACounter = 0, serviceBCounter = 0, serviceCCounter = 0, serviceDCounter = 0;
    const serviceADates = [], serviceBDates = [], serviceCDates = [], serviceDDates = [];
    const NRequests = await fetchRequests();
    for (let i in NRequests) {
        const person = NRequests[i];
        const service = person.service;
        if (service == "A") { serviceACounter++; serviceADates.push(person.date) }
        else if (service == "B") { serviceBCounter++; serviceBDates.push(person.date) }
        else if (service == "C") { serviceCCounter++; serviceCDates.push(person.date) }
        else if (service == "D") { serviceDCounter++; serviceDDates.push(person.date) }
    }
    document.getElementById('Alastupdate').innerText = calculateTimeGap(Math.max(...serviceADates));
    document.getElementById('Blastupdate').innerText = calculateTimeGap(Math.max(...serviceBDates));
    document.getElementById('Clastupdate').innerText = calculateTimeGap(Math.max(...serviceCDates));
    document.getElementById('Dlastupdate').innerText = calculateTimeGap(Math.max(...serviceDDates));
    document.getElementById('serviceACount').innerText = serviceACounter;
    document.getElementById('serviceBCount').innerText = serviceBCounter;
    document.getElementById('serviceCCount').innerText = serviceCCounter;
    document.getElementById('serviceDCount').innerText = serviceDCounter;
    document.getElementById('AllServicesCount').innerText = (await fetchRequests()).length;
}
// servicesCounts();
// make side bar available if the used service is informatique
if (usedService == 'Info') {
    const servicesDom = document.querySelectorAll('.service');
    servicesDom.forEach(element => {
        element.addEventListener('click', async () => {
            alertSearch.style.display = 'none';
            noElements.innerHTML = '';
            const serviceName = element.dataset.service;
            if (serviceName == "*") requests = await fetchRequests();
            else requests = await fetchSearch(serviceName);
            element.style.backgroundColor = "#00B28B";
            servicesDom.forEach(ele => { if (ele != element) ele.style.backgroundColor = "" });
            renderRequestsList();
            listenToPreviewClicks();
        });
    });
    document.querySelector('.services').style.opacity = "1";
}