const mysql = require('mysql');
require('dotenv').config();
const env = process.env;
// Database config
const con = mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS
});
// database connector
async function SQLdatabaseConnector() {
    con.connect((err) => {
        if (err) console.log(err);
        else createDatabase();
    });
}
// database creator
function createDatabase() {
    con.query('create database xx', (err, result) => { console.log(result) });
    con.query('use xx', (err, result) => { console.log(result) });
    con.query("create table requests (id int auto_increment primary key, nom varchar(20), prenom varchar(20), email varchar(40), telephone varchar(10), wilaya varchar(20), daira varchar(20), commune varchar(40), domain varchar(50), service varchar(40), date_depot varchar(20), duree_trait varchar(20), description varchar(255), statut varchar(2), date varchar(20), sharedWith varchar(40), fichier longtext)"
        , (err, result) => { console.log(result) });
    con.query('create table users (id int auto_increment primary key, username varchar(20), password varchar(20))', (err, result) => { console.log(result) });
    con.query('select count(*) from users', (err, result) => {
        if (result[0]['count(*)'] == 0) {
            con.query(`insert into users (username, password) values ('admin', 'admin')`, (err, result) => { console.log(result) });
            con.query(`insert into users (username, password) values ('ServiceA', 'A1234')`, (err, result) => { console.log(result) });
            con.query(`insert into users (username, password) values ('ServiceB', 'B1234')`, (err, result) => { console.log(result) });
            con.query(`insert into users (username, password) values ('ServiceC', 'C1234')`, (err, result) => { console.log(result) });
            con.query(`insert into users (username, password) values ('ServiceD', 'D1234')`, (err, result) => { console.log(result) });
            con.query(`insert into users (username, password) values ('ServiceInfo', 'info1234')`, (err, result) => { console.log(result) });
        }
    });
}
// retrieve data 
async function getRequests() {
    let data = undefined;
    const promise = new Promise((resolve, reject) => {
        con.query('select * from requests', (err, result) => { data = result; resolve(); });
    })
    await promise;
    return data;
}
// store requests in db
async function saveRequest(data) {
    const promise = new Promise((resolve, reject) => {
        con.query(`insert into requests (nom, prenom, email, telephone, wilaya, daira, commune, domain, service, date_depot, duree_trait, description, statut, date, sharedWith, fichier) values ("${data.nom}", "${data.prenom}", "${data.email}", "${data.telephone}", "${data.wilaya}", "${data.daira}", "${data.commune}", "${data.domain}", "${data.service}", "${data.date_depot}", "${data.duree_trait}", "${data.description}", "0", "${new Date().getTime()}", "", '${data.fichier}')`,
            (err, result) => {
                if (err) console.log(err);
                else resolve();
            });
    })
    await promise;
}
// get files status counters 
async function getFilesStatus() {
    let rejectedFiles = 0; let acceptedFiles = 0; let pendingFiles = 0; let acceptedByServiceFiles = 0;
    const promise = new Promise((resolve, reject) => {
        con.query('select count(*) from requests where statut="-1"', (err, result) => { rejectedFiles = result; });
        con.query('select count(*) from requests where statut="1"', (err, result) => { acceptedFiles = result; });
        con.query('select count(*) from requests where statut="2"', (err, result) => { acceptedByServiceFiles = result; });
        con.query('select count(*) from requests where statut="0"', (err, result) => { pendingFiles = result; resolve(); });
    })
    await promise;
    return {
        acceptedFiles: acceptedFiles[0]['count(*)'],
        rejectedFiles: rejectedFiles[0]['count(*)'],
        pendingFiles: pendingFiles[0]['count(*)'],
        acceptedByServiceFiles: acceptedByServiceFiles[0]['count(*)']
    };
}
// search sql query
async function searchFor(searchInput) {
    let results = undefined;
    const promise = new Promise((resolve, reject) => {
        con.query(`select * from requests where nom="${searchInput}" or prenom="${searchInput}" or wilaya="${searchInput}" or telephone="${searchInput}" or statut="${searchInput}" or service="${searchInput}" or id=${searchInput}`, (err, result) => { results = result; resolve(); });
    });
    await promise;
    return results;
}
// editing request status and description
async function editFileStatus(statut, description, reqId) {
    const promise = new Promise((resolve, reject) => {
        con.query(`update requests set statut="${statut}", description="${description}", date="${new Date().getTime()}" where id=${reqId}`, (err, result) => { resolve(); });
    });
    await promise;
    return true;
}
// delete request sql query
async function deleteRequest(reqId) {
    const promise = new Promise((resolve, reject) => {
        con.query(`delete from requests where id=${reqId}`, (err, result) => { results = result; resolve(); });
    });
    await promise;
    return true;
}
// get user
async function getUser(username) {
    let results = undefined;
    const promise = new Promise((resolve, reject) => {
        con.query(`select * from users where username="${username}"`, (err, result) => { results = result; resolve(); });
    });
    await promise;
    return results;
}
// get users with(S)
async function getUsers() {
    let results = undefined;
    const promise = new Promise((resolve, reject) => {
        con.query(`select * from users`, (err, result) => { results = result; resolve(); });
    });
    await promise;
    return results;
}
// get request bu service name 
async function getRequestsByService(serviceName) {
    let results = undefined;
    const promise = new Promise((resolve, reject) => {
        con.query(`select * from requests where service="${serviceName}"`, (err, result) => { results = result; resolve(); });
    });
    await promise;
    return results;
}
// get requests status counts by service name
async function getFilesStatusByService(serviceName) {
    let rejectedFiles = 0; let acceptedFiles = 0; let pendingFiles = 0; let acceptedByServiceFiles = 0;
    const promise = new Promise((resolve, reject) => {
        con.query(`select count(*) from requests where statut="-1" and service="${serviceName}"`, (err, result) => { rejectedFiles = result; });
        con.query(`select count(*) from requests where statut="1" and service="${serviceName}"`, (err, result) => { acceptedFiles = result; });
        con.query(`select count(*) from requests where statut="2" and service="${serviceName}"`, (err, result) => { acceptedByServiceFiles = result; });
        con.query(`select count(*) from requests where statut="0" and service="${serviceName}"`, (err, result) => { pendingFiles = result; resolve(); });
    })
    await promise;
    return {
        acceptedFiles: acceptedFiles[0]['count(*)'],
        rejectedFiles: rejectedFiles[0]['count(*)'],
        pendingFiles: pendingFiles[0]['count(*)'],
        acceptedByServiceFiles: acceptedByServiceFiles[0]['count(*)']
    };
}
// edit user passsword 
async function editUserPassword(userId, newPassword) {
    const promise = new Promise((resolve, reject) => {
        con.query(`update users set password="${newPassword}" where id=${userId}`, (err, result) => { resolve(); });
    });
    await promise;
    return true;
}
// share a request with other services
async function shareRequestWith(reqId, selectedService, message) {
    // updating sharedWith property
    let oldSharedWith = undefined;
    const promise = new Promise((resolve, reject) => {
        con.query(`select sharedWith from requests where id=${reqId}`, (err, result) => {
            oldSharedWith = result;
            let newSharedWith = oldSharedWith[0]['sharedWith'];
            console.log(newSharedWith);
            if (newSharedWith.indexOf(selectedService) == -1) newSharedWith += ',' + selectedService;
            con.query(`update requests set sharedWith="${newSharedWith}" where id=${reqId}`, (err, result) => { resolve(); });
        });
    });
    await promise;
    // updating description "by adding message in it"
    let oldDescription = undefined;
    const promise3 = new Promise((resolve, reject) => {
        con.query(`select description from requests where id=${reqId}`, (err, result) => {
            oldDescription = result;
            const newDescription = message + '\n' + oldDescription[0]['description'];
            con.query(`update requests set description="${newDescription}" where id=${reqId}`, (err, result) => { resolve();});
        });
    });
    await promise3;
    return true;
}
module.exports = {
    SQLdatabaseConnector, createDatabase, getRequests, saveRequest, getFilesStatus, searchFor,
    editFileStatus, deleteRequest, getUser, getRequestsByService, getFilesStatusByService, getUsers,
    editUserPassword, shareRequestWith
};