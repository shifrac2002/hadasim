const db = require('./db');
const config = require('../config');

async function getAllCustomer() {
    return await db.query(
        'SELECT * FROM hmo.customers;'
    );
}

async function DeleteCustomer(id) {
    return await db.query(
        `Delete 
        from customers
        where id='${id}'`
    );
}

async function UpdateCustomer(customrToUpdate) {
    return await db.query(
        `UPDATE customers
        SET firstName='${customrToUpdate.firstName}',
        cuntry='${customrToUpdate.cuntry}',
        DateOfBirth='${customrToUpdate.DateOfBirth}',
        phone='${customrToUpdate.phone}',
        cellPhone='${customrToUpdate.cellPhone}',
        lastName='${customrToUpdate.lastName}',
        street='${customrToUpdate.street}',
        numBuilding='${customrToUpdate.numBuilding}'
        WHERE id='${customrToUpdate.id}'`
    );
}

async function CreateCustomer(customrToCreate) {
    let exitCustomer = await db.query(`SELECT * FROM hmo.customers where id = ${customrToCreate.id}`)
    if (exitCustomer.length === 0) {
        await db.query(
            `INSERT INTO customers(id,firstName,cuntry,DateOfBirth,phone,cellPhone,lastName,street,numBuilding)
        VALUES('${customrToCreate.id}',
        '${customrToCreate.firstName}',
        '${customrToCreate.cuntry}',
        '${customrToCreate.DateOfBirth}',
        '${customrToCreate.phone}',
        '${customrToCreate.cellPhone}',
        '${customrToCreate.lastName}',
        '${customrToCreate.street}',
        '${customrToCreate.numBuilding}');`
        );
        return true
    }
    else {
        return false;
    }
}

async function CustomerInformation(id) {
    let info = {};
    info.vaccinations = await db.query(
        `SELECT vaccination.idVaccination, typofvaccination.creatorVaccination, vaccination.dateOfGetVaccination FROM vaccination
        join customers on vaccination.idCustomer = customers.id
        join typofvaccination on typofvaccination.idTypofvaccination = vaccination.idTypofvaccination
        where id='${id}'`
    );

    info.examinations = await db.query(
        `SELECT examination.idExamination, examination.dateOfGetAnswer, examination.dateOfRecovery FROM examination
        join customers on examination.idCustomer = customers.id
        where id='${id}'`
    );
    return info;
}

module.exports = {
    getAllCustomer, DeleteCustomer, UpdateCustomer, CreateCustomer, CustomerInformation
}