function validateForm() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var middleName = document.getElementById("middle-name").value;
    var identityProof = document.getElementById("identity-proof").value;
    var proofValue = document.getElementById("proof-value").value;
    var validationError = document.getElementById("validation-error");

    validationError.textContent = '';

    if (!firstName || !lastName) {
        validationError.textContent = 'Please fill out all required fields.';
    } else if (!isAlphabetsOnly(firstName) || !isAlphabetsOnly(lastName)) {
        validationError.textContent = 'First Name, Last Name, and Middle Name should contain alphabets only.';
    }  else if (identityProof === "Passport" && (proofValue.length !== 8 || !/^[A-Za-z][0-9]{7}$/.test(proofValue))) {
        validationError.textContent = 'Passport number must be 7 alphanumeric characters.';
    } else if (identityProof === "Aadhar" && (proofValue.length !== 12 || !/^[0-9]+$/.test(proofValue))) {
        validationError.textContent = 'Aadhar number must be 12 digits.';
    } else if (identityProof === "DrivingLicense" && (proofValue.length !== 15 || !/^[A-Za-z]{2}[0-9]{13}$/.test(proofValue))) {
        validationError.textContent = 'Driving license number must be 13 alphanumeric characters.';
    } else {
        window.location.href = "address.html";
        
    }

    function isAlphabetsOnly(text) {
        return /^[A-Za-z\s]+$/.test(text);
}
}
