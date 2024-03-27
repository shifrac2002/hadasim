import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

function CustomerInfo() {
    const location = useLocation();  
    let navigate = useNavigate();
    const [customerExaminations, setCustomerExaminations] = useState([]);
    const [customerVaccinations, setCustomerVaccinations] = useState([]);

    useEffect(() => {
        async function getCustomerInfo() {
            const url = `http://localhost:6200/api/Customer/Information/${location.state.id}`;
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let info = await response.json();
            info.examinations.map(e => e.dateOfGetAnswer = e.dateOfGetAnswer.slice(0, 10));
            info.examinations.map(e => e.dateOfRecovery = e.dateOfRecovery.slice(0, 10));
            info.vaccinations.map(v => v.dateOfGetVaccination = v.dateOfGetVaccination.slice(0, 10));
            setCustomerExaminations(info.examinations)
            setCustomerVaccinations(info.vaccinations)
        }
        getCustomerInfo();
    }, []);

    function back(){
        navigate('/')
    }

    return (
        <div>
            {customerVaccinations.length > 0 && <div>
                <h1>Vaccinations</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Name of Creator</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customerVaccinations.map((vac) => {
                                return (
                                    <TableRow key={vac.idVaccination}>
                                        <TableCell>{vac.dateOfGetVaccination}</TableCell>
                                        <TableCell>{vac.creatorVaccination}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>}
            {customerExaminations.length > 0 && <div>
                <h1>Examinations</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date Of Get Answer </TableCell>
                                <TableCell>Date Of Recovery</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customerExaminations.map((exa) => {
                                return (
                                    <TableRow key={exa.idExamination}>
                                        <TableCell>{exa.dateOfGetAnswer}</TableCell>
                                        <TableCell>{exa.dateOfRecovery}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>}
            {customerVaccinations.length === 0 && customerExaminations.length === 0 && <h1>ther is not informetion of this customer</h1>}
            {customerVaccinations.length === 0 && customerExaminations.length === 0 && <button onClick={()=>back()} >back</button>}

        </div>);
}
export default CustomerInfo;