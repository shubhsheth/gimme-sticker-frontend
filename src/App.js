import './App.css';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Button, Container, Row } from 'react-bootstrap'

const NodeRSA = require("node-rsa");

const App = () => {
	
	const publicKey = `-----BEGIN PUBLIC KEY-----
	MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlQ7xWaMzUu0ecZzXZ7nR
	ikt/BpFmLH4N5ekss7S77ATm0qzQ3erJwdv5qSqq6FJqJF+SHZINU08NdnpKsfzc
	bKApr6JpNEg3LzBfgS2ZsnP2q1IFYuB2gN5NH+jhQITuMjA14ji57Gq/gMK/vCkK
	PyPerkDaXO/x+k32lhkrtvNCDWQXgdGE8a5xVE1KWxx20Y7ot6QEo/KmtB9xIxIr
	xOeykDOH0cE3JMMDY6ru07aH0lBZri/KqaP7moQ8z0bTep2m5J1Jw1G/Ycp0reAT
	ceBiV8ntRVYMYkCQHK0+OcShGZymn7JAjh7OPcIYAwBA9w6RhOY8/6M6mElIVopW
	UQIDAQAB
	-----END PUBLIC KEY-----`;
	const key = NodeRSA();
	key.importKey(publicKey);


	const [address, setAddress] = useState({
		name: '',
		street: '',
		street2: '',
		city: '',
		state: '',
		zip: '',
		country: '',
		notes: ''
	})

	const [encryptedAddress, setEncryptedAddress] = useState("");

	const handleChange = (e) => {
		setAddress({ ...address, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const encrypted = key.encrypt(address, 'base64');
		document.querySelector('.encrypted-address').style.display = "block";
		setEncryptedAddress(encrypted);
	}

	return (
		<div className="App">
			<Container style={{paddingTop: "50px", textAlign: "left"}}>
				<Row className="justify-content-center">
					<Col md="8">
						<h1>Git Workshop: Zero to Hero - Encrypt your address</h1><br /><br />
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Control 
									type='text'
									placeholder="What's your name?"
									required
									onChange={(e) => handleChange(e)}
									name='name'
									value={address.name}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control 
									type='text'
									placeholder='Street address'
									required
									onChange={(e) => handleChange(e)}
									name='street'
									value={address.street}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control 
									type='text'
									placeholder='Suite or Apt # (optional)'
									onChange={(e) => handleChange(e)}
									name='street2'
									value={address.street2}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control 
									type='text'
									placeholder='City'
									required
									onChange={(e) => handleChange(e)}
									name='city'
									value={address.city}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control 
									type='text'
									placeholder='State/Region'
									required
									onChange={(e) => handleChange(e)}
									name='state'
									value={address.state}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control 
									type='text'
									placeholder='Postal Code'
									required
									onChange={(e) => handleChange(e)}
									name='zip'
									value={address.zip}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control 
									type='text'
									placeholder='Country'
									required
									onChange={(e) => handleChange(e)}
									name='country'
									value={address.country}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control 
									type='text'
									placeholder='Any special notes for me?'
									onChange={(e) => handleChange(e)}
									name='notes'
									value={address.notes}
								/>
							</Form.Group>
							<Form.Group>
								<Button type="submit" size="lg">Submit</Button>
							</Form.Group>
						</Form>
						<Form.Control as="textarea" rows={8} className="encrypted-address" style={{display: "none"}} readOnly value={encryptedAddress}></Form.Control>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
