import { renderHeader, renderFooter } from './render.js';
// int header and footer
const header = document.getElementById('header');
const footer = document.getElementById('footer');
footer.innerHTML = renderFooter();
// get used service
const urlParams = new URLSearchParams(location.search);
const usedService = urlParams.get('service');
// rendering header depending on the used service
const serviceDom = document.getElementById('service');
if (usedService == 'admin') {
    header.innerHTML = renderHeader();
} else {
    if (usedService != 'Info') {
        serviceDom.value = usedService;
        serviceDom.disabled = true;
    }
    header.innerHTML = renderHeader(usedService);
}
// disabling search bar on this page
document.getElementById('searchBtn').disabled = true;
document.getElementById('searchInput').disabled = true;
// reading data file as base64 fromat 
const fileDom = document.getElementById('file');
let base64pdf = [];
fileDom.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        base64pdf.push(fileReader.result);
        const filePreviewer = document.getElementById('file_previewer');
        filePreviewer.innerHTML += `<iframe src="${base64pdf[base64pdf.length - 1]}"></iframe>`
    };
});
// valider button when click
document.getElementById('nom').value = "Mendja";
document.getElementById('prenom').value = "Wadie";
document.getElementById('email').value = "wadiemendja@gmail.com"
document.getElementById('telephone').value = "0672328144";
//document.getElementById('wilaya').value = "Bechar";
document.getElementById('daira').value = "IGLI";
document.getElementById('commune').value = "Igli";
document.getElementById('domain').value = "Informatique";
//document.getElementById('service').value = "Industriel";
document.getElementById('date_depot').value = "25/02/2022";
document.getElementById('duree_trait').value = "4 jour";
document.getElementById('description').value = "simple description here";
const validerBtn = document.getElementById('valider');
let request = {};
validerBtn.addEventListener('click', async () => {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const wilayaSlector = document.getElementById('wilaya');
    const wilaya = wilayaSlector.options[wilayaSlector.selectedIndex].text;
    const daira = document.getElementById('daira').value;
    const commune = document.getElementById('commune').value;
    const domain = document.getElementById('domain').value;
    const service = document.getElementById('service').value;
    const date_depot = document.getElementById('date_depot').value;
    const duree_trait = document.getElementById('duree_trait').value;
    const description = document.getElementById('description').value;
    const isValid = validateForm();
    if (!isValid) return
    request = {
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: telephone,
        wilaya: wilaya,
        daira: daira,
        commune: commune,
        domain: domain,
        service: service,
        date_depot: date_depot,
        duree_trait: duree_trait,
        description: description,
        fichier: JSON.stringify(base64pdf)
    }
    fetch('/api/save-request', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    $('#exampleModal').modal('show');
    document.getElementById('okAlert').addEventListener('click', () => {
        if (usedService == 'admin') location.href = "/";
        else location.href = './service.html?service=' + usedService;
    });
});
// changing date format from EN to FR
const today = new Date();
const day = today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate();
const month = today.getMonth().toString().length == 1 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
date_depot.value = day + '/' + month + '/' + today.getFullYear();
$('#date_depot').datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true
});
// Form validation
const inputs = document.querySelectorAll('.toBeCkecked');
console.log(inputs)
function validateForm() {
    let checker = true;
    inputs.forEach(element => {
        if (element.value.length == 0) {
            element.style.cssText = 'border-color: red !important';
            checker = false;
            return;
        }
    });
    return checker;
}
// reset borders when typing
inputs.forEach(element => {
    element.addEventListener('input', () => { element.style.cssText = 'border-color: #00B28B !important' });
});
// disable clicking outside of the alert box
document.addEventListener('DOMContentLoaded', () => {
    $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
});