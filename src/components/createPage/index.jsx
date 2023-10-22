import  { useState } from 'react';
// import { useHistory } from "react-router-dom"
import Axios from "axios"
import {Link } from "react-router-dom";

function CreatePage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const history  = useHistory();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCreate = (e) => {
    console.log('Search:', { firstName, lastName, email });
    e.preventDefault();

    // Define the data to be sent in the POST request.
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email : email
      }

    const apiUrl = 'https://reqres.in/api/users'; 

    Axios
      .post(apiUrl, userData)
      .then((response) => {
       console.log(response);
       if(response.data){
        // history.push("/list");
       }
      })
      .catch((error) => {
       console.log(error);
      });
  };

  return (
    <div>
      <h2>Create User</h2>
      <form>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="button" onClick={handleCreate}>
          Create
        </button>
      </form>

    <Link to="/list">Go to User List</Link>
    </div>
  );
}

export default CreatePage;
