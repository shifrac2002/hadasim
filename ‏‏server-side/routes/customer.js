const express = require('express');
const router = express.Router();
const customer = require('../services/customer');

router.get('/GetAllCustomer', async function (req, res, next) {
    try {
        res.json(await customer.getAllCustomer());
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.get('/DeleteCustomer/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        res.json(await customer.DeleteCustomer(id));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.get('/Information/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        res.json(await customer.CustomerInformation(id));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

// router.put('/UpdateCustomer', customer.upload.single('file'), async function (req, res, next) {
router.put('/UpdateCustomer', async function (req, res, next) {
    try {
        res.json(await customer.UpdateCustomer(req.body));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

// router.put('/CreateCustomer', customer.upload.single('file'), async function (req, res, next) {
router.put('/CreateCustomer', async function (req, res, next) {
    try {
        res.json(await customer.CreateCustomer(req.body));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;