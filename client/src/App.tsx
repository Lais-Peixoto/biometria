import { stringify } from "querystring";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  let credentialOptions: PublicKeyCredentialCreationOptions = {
    challenge: window.crypto.getRandomValues(new Uint8Array(26)).buffer,
    rp: {
      name: "Biometrics",
      id: window.location.hostname,
    },
    user: {
      id: new Uint8Array(16),
      name: username,
      displayName: firstName + " " + lastName,
    },
    pubKeyCredParams: [{ alg: -7, type: "public-key" }],
  };

  const handleUsernameChange = (event: any) => {
    return setUsername(event.target.value);
  };

  const handleFirstnameChange = (event: any) => {
    return setFirstName(event.target.value);
  };

  const handleLastnameChange = (event: any) => {
    return setLastName(event.target.value);
  };

  const handleClick = () => {
    let credential;
    // Does the system/browser support public key authentication?
    window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
      .then((available) => {
        if (available) {
          // We can proceed with the creation of a PublicKeyCredential with this authenticator
          credential = navigator.credentials
            .create({ publicKey: credentialOptions })
            .then((cred) => {
              alert("NEW CREDENTIAL");
            })
            .catch((err) => {
              alert("ERROR OR CANCELED BY THE USER");
            });

          alert("fingerprint sensor activated");
          return;
        } else {
          // Use another kind of authenticator or a classical login/password workflow
          alert(
            "public-key credentials not supported, work with another kind of authenticator or a classical workflow"
          );
          return;
        }
      })
      .catch((e) => {
        // Something went wrong
        alert("Could not create credentials in browser.");
        return;
      });
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          name="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <input
          name="firstName"
          value={firstName}
          onChange={handleFirstnameChange}
          placeholder="First name"
        />
        <input
          name="lastName"
          value={lastName}
          onChange={handleLastnameChange}
          placeholder="Last name"
        />
        <button onClick={handleClick}>Register</button>
      </form>
    </div>
  );
}

export default App;
