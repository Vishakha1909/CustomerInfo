const form = document.getElementById('address-form');
const errorMsg = document.getElementById('errorMsg');
const pincodeInput = form.elements['pincode'];
const stateInput = form.elements['state'];
const cityInput = form.elements['city'];
const closeModalButton = document.getElementById('closeModal');
const modal = document.getElementById('myModal');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');
const addressInfo = document.getElementById('addressInfo');
const nextButton = document.getElementById('nextButton');
const addressLine1Input = form.elements['addressLine1'];
const addressLine2Input = form.elements['addressLine2'];


function openModal() {
    if (validateForm()) {
        const pincode = form.elements['pincode'].value;
        const state = form.elements['state'].value;
        const city = form.elements['city'].value;
        const addressLine1 = form.elements['addressLine1'].value;
        const addressLine2 = form.elements['addressLine2'].value;
        const addressText = `Pincode: ${pincode}<br>State: ${state}<br>City: ${city}<br>Address Line 1: ${addressLine1}<br>Address Line 2: ${addressLine2}`;
        addressInfo.innerHTML = addressText;
        modal.style.display = 'block';
           
    }
}
function closeModal() {
    modal.style.display = 'none';
}


nextButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
cancelButton.addEventListener('click', closeModal);

confirmButton.addEventListener('click', function () {
    closeModal();
});

function displayErrorMessage(inputField, maxCharacters) {
    const currentLength = inputField.value.length;
    if (currentLength == maxCharacters) {
        errorMsg.textContent = `Max ${maxCharacters} characters.`;
    } else {
        errorMsg.textContent = '';
    }
}

addressLine1Input.addEventListener('input', function () {
    displayErrorMessage(addressLine1Input, 25);
});

addressLine2Input.addEventListener('input', function () {
    displayErrorMessage(addressLine2Input, 25);
});

function validateForm() {
    const pincode = form.elements['pincode'].value;
    const state = form.elements['state'].value;
    const city = form.elements['city'].value;
    const addressLine1 = form.elements['addressLine1'].value;

    if (
        pincode.trim() === '' ||
        state.trim() === '' ||
        city.trim() === '' ||
        addressLine1.trim() === ''
    ) {
        return false;
    }
    return true;
}
async function populateStateAndCity() {
    const pincodeInput=document.getElementById('pincode').value;
    const pincode = pincodeInput.value;
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincodeInput}`);
    console.log("here",response)
    if(response.ok){
        const data=await response.json()
        console.log(data,"inside")
        if(data[0].PostOffice){
            const city1 = data[0].PostOffice[0].Block;
            const state1 = data[0].PostOffice[0].State;
            cityInput.value=city1;
            stateInput.value=state1
        }
        else{
            cityInput.value='Invalid Pincode';
            stateInput.value='Invalid Pincode';
        }
    }
    else{
        cityInput.value='Invalid';
        stateInput.value='Invalid';
    }
}

pincodeInput.addEventListener('input', function (event) {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/[^0-9]/g, '');

    event.target.value = numericValue;
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
});

function redirect(){
    window.location.href = 'final.html';

}

pincodeInput.addEventListener('input', populateStateAndCity);

stateInput.value = '';
cityInput.value = '';