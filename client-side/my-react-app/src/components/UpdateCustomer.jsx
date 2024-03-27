import react, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function UpdateCustomer() {
    const location = useLocation();
    let navigate = useNavigate();
    const [customer, setcustomer] = useState(location.state ? location.state.customer : { id: '', firstName: '', lastName: '', cuntry: '', street: '', numBuilding: '', phone: '', cellphone: '', DateOfBirth: '' })
    // const [image, setImage] = useState({ preview: '', data: '' })
    // const [imageName, setImageName] = useState('')

    function updateID(e) {
        const value = e.target.value;
        if (value.length === 9) {
            setcustomer({
                ...customer,
                id: value
            });
        }
        else {
            alert("the id is not valid")
        }
    }

    // function handleFileChange(e) {
    //     debugger
    //     const value = e.target.files[0].name;
    //     setcustomer({
    //         ...customer,
    //         img: value
    //     });
    //     const img = {
    //         preview: URL.createObjectURL(e.target.files[0]),
    //         data: e.target.files[0],
    //     }
    //     setImage(img);
    // }

    function updateFirstName(e) {
        const value = e.target.value;
        setcustomer({
            ...customer,
            firstName: value
        });
    }

    function updateLastName(e) {
        const value = e.target.value;
        setcustomer({
            ...customer,
            lastName: value
        });
    }

    function updateCuntry(e) {
        const value = e.target.value;
        setcustomer({
            ...customer,
            cuntry: value
        });
    }

    function updateStreet(e) {
        const value = e.target.value;
        setcustomer({
            ...customer,
            street: value
        });
    }

    function updateNumBuilding(e) {
        const value = e.target.value;
        setcustomer({
            ...customer,
            numBuilding: value
        });
    }

    function updatePhon(e) {
        const value = e.target.value;
        if (value.length > 10) {
            alert("the length of phone is to long")
        }
        else {
            setcustomer({
                ...customer,
                phone: value
            });
        }
    }

    function updateCellPhon(e) {
        const value = e.target.value;
        if (value.length > 10) {
            alert("the length of cell phone is to long")
        }
        else {
            setcustomer({
                ...customer,
                cellphone: value
            });
        }
    }

    function updateDateOfBirth(e) {
        debugger
        const value = e.target.value;
        if (value > new Date()) {
            alert("tha date of birth not valid")
        }
        else {
            setcustomer({
                ...customer,
                DateOfBirth: value.slice(0, 10)
            });
        }
    }

    async function CreateOrUpdateClicked(e) {
        e.preventDefault()
        if (customer.id === '' || customer.firstName === '' || customer.lastName === '' || customer.cuntry === '' || customer.street === '' || customer.numBuilding === '' || customer.phone === '' || customer.cellphone === '' || customer.DateOfBirth === '') {
            alert("ther is field not full")
        }
        // let formData = new FormData();
        //     formData.append('id', customer.id);
        //     formData.append('firstName', customer.firstName);
        //     formData.append('cuntry', customer.cuntry);
        //     formData.append('DateOfBirth', customer.DateOfBirth);
        //     formData.append('phone', customer.phone);
        //     formData.append('cellphone', customer.cellphone);
        //     formData.append('lastName', customer.lastName);
        //     formData.append('street', customer.street);
        //     formData.append('numBuilding', customer.numBuilding);
        //     formData.append('img', imageName);
        //     formData.append('file', image.data);
        if (location.state) {       
            const url = 'http://localhost:6200/api/Customer/UpdateCustomer';
            let response = await fetch(url, {
                method: 'PUT',
                // body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            });
            navigate('/')
        }
        else {
            const url = 'http://localhost:6200/api/Customer/CreateCustomer';
            let response = await fetch(url, {
                method: 'PUT',
                // body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            });
            const result = await response.json();
            console.log(result)
            debugger
            if (result === false) {
                alert("the customer exist")
            }
            navigate('/')
        }
    }

    return (
        <div>
            {location.state && <h1>update customer</h1>}
            {!location.state && <h1>create customer</h1>}
            {!location.state && <div>
                <h2>ID</h2>
                <input type="text" maxLength={9} placeholder={'ID'} onBlur={updateID}></input>
            </div>}
            <h2>first name</h2>
            <input type="text" placeholder={location.state && location.state.firstName === undefined ? location.state.customer.firstName : 'First Name'} onBlur={updateFirstName}></input>
            <h2>last name</h2>
            <input type="text" placeholder={location.state && location.state.lastName === undefined ? location.state.customer.lastName : "Last Name"} onBlur={updateLastName}></input>
            <h2>cuntry</h2>
            <input type="text" placeholder={location.state && location.state.cuntry === undefined ? location.state.customer.cuntry : "Country"} onBlur={updateCuntry}></input>
            <h2>street</h2>
            <input type="text" placeholder={location.state && location.state.street === undefined ? location.state.customer.street : "Street"} onBlur={updateStreet}></input>
            <h2>number building</h2>
            <input type="text" placeholder={location.state && location.state.numBuilding === undefined ? location.state.customer.numBuilding : "Num Building"} onBlur={updateNumBuilding}></input>
            <h2>phon</h2>
            <input type="text" placeholder={location.state && location.state.phone === undefined ? location.state.customer.phone : "Phone"} onBlur={updatePhon}></input>
            <h2>cell phon</h2>
            <input type="text" placeholder={location.state && location.state.cellphone === undefined ? location.state.customer.cellphone : "Cell Phone"} onBlur={updateCellPhon}></input>
            <h2>date of birth</h2>
            {location.state && <input type="date" value={location.state.customer.DateOfBirth} onChange={updateDateOfBirth}></input>}
            {!location.state && <input type="date" onChange={updateDateOfBirth}></input>}
            {/* <div>
                <h2>Upload Image</h2>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <hr></hr>
                <input type='file' name='file' onChange={handleFileChange}></input>
            </div> */}
            <button onClick={CreateOrUpdateClicked}>אישור</button>
        </div>);
}
export default UpdateCustomer;