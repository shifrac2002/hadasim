import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

function AllCustomers() {
    let navigate = useNavigate();
    const [allCustomers, setAllCustomers] = useState([]);

    useEffect(() => {
        getAllCustomers();
    }, []);

    async function getAllCustomers() {
        let result1 = await fetch(`http://localhost:6200/api/Customer/GetAllCustomer`);
        let itemsDedication = await result1.json();
        itemsDedication.map(c => c.DateOfBirth = c.DateOfBirth.slice(0, 10));
        setAllCustomers(itemsDedication);
    }

    async function deleteCus(id) {
        const url = `http://localhost:6200/api/Customer/DeleteCustomer/${id}`;
        let response = await fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        getAllCustomers();
    }

    async function updateCus(cus) {
        navigate('/CreateOrUpdateCustomer', { state: { customer: cus } })
    }

    function cretaeNewCustomer() {
        navigate('/CreateOrUpdateCustomer')
    }

    function openInfo(id) {
        navigate('/CustomerInfo', {state: {id: id}})
    }

    return (
        <div>
            {(allCustomers.length > 0) && <div>
                <h1 className='h1Donate'>Customer hmo</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Phon</TableCell>
                                <TableCell>Cell Phon</TableCell>
                                <TableCell>Date Of Birth</TableCell>
                                <TableCell>Delete</TableCell>
                                <TableCell>Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allCustomers.map((cus) => {
                                return (
                                    <TableRow key={cus.id}>
                                        <TableCell onClick={() => openInfo(cus.id)}>{cus.id}</TableCell>
                                        <TableCell onClick={() => openInfo(cus.id)}>{cus.lastName} {cus.firstName}</TableCell>
                                        <TableCell onClick={() => openInfo(cus.id)}>{cus.cuntry} {cus.street} {cus.numBuilding}</TableCell>
                                        <TableCell onClick={() => openInfo(cus.id)}>{cus.phone}</TableCell>
                                        <TableCell onClick={() => openInfo(cus.id)}>{cus.cellphone}</TableCell>
                                        <TableCell onClick={() => openInfo(cus.id)}>{cus.DateOfBirth}</TableCell>
                                        <TableCell><button onClick={() => deleteCus(cus.id)}>delete</button></TableCell>
                                        <TableCell><button onClick={() => updateCus(cus)}>update</button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <button onClick={() => cretaeNewCustomer()}>new customer</button>
            </div>}
        </div>
    );
}
export default AllCustomers;