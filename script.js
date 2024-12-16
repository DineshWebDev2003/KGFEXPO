// Web3Forms Access Key
const accessKey = "28919c4f-ecfb-4a16-b801-21b6e9df5a9e";

// Show the QR code and payment info after payment initiation
function showQR() {
    document.getElementById('qr-code').style.display = 'block';
}

// Toggle Transaction ID input based on "I have paid" checkbox
function toggleTransactionId() {
    const checkbox = document.getElementById('payment-checkbox');
    const transactionIdContainer = document.getElementById('transaction-id-container');
    const submitButton = document.getElementById('submit-btn');

    if (checkbox.checked) {
        transactionIdContainer.style.display = 'block';
        submitButton.style.display = 'inline-block';
    } else {
        transactionIdContainer.style.display = 'none';
        submitButton.style.display = 'none';
    }
}

// Generate a random Participation ID
function generateParticipationId() {
    const timestamp = Date.now().toString(); // Use current timestamp
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString(); // Random 4-digit number
    return `PID-${timestamp}-${randomSuffix}`;
}

// Submit the form and validate payment
function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const participantName = document.getElementById('participant-name').value;
    const fatherName = document.getElementById('father-name').value;
    const motherName = document.getElementById('mother-name').value;
    const age = document.getElementById('age').value;
    const transactionId = document.getElementById('transaction-id').value;

    // Check if "I have paid" is selected and Transaction ID is entered
    const paymentCheckbox = document.getElementById('payment-checkbox');
    if (!paymentCheckbox.checked || !transactionId) {
        alert('Please confirm payment and enter Transaction ID.');
        return;
    }

    // Generate Participation ID
    const participationId = generateParticipationId();

    // Prepare form data for Web3Forms
    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('participant_name', participantName);
    formData.append('father_name', fatherName);
    formData.append('mother_name', motherName);
    formData.append('age', age);
    formData.append('transaction_id', transactionId);
    formData.append('participation_id', participationId);

    // Web3 Form API endpoint
    const url = 'https://api.web3forms.com/submit';

    // Send form data to Web3 Form
    fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Show success message and participation ID
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('participation-id-message').innerText = `Your Participation ID: ${participationId}`;

        // Generate WhatsApp link dynamically
        const message = encodeURIComponent(`Participant's Name: ${participantName}\nFather's Name: ${fatherName}\nMother's Name: ${motherName}\nAge: ${age}\nTransaction ID: ${transactionId}\nParticipation ID: ${participationId}\nPayment made. Please confirm.`);
        const whatsappNumber = '9514900068';
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

        // Show the WhatsApp link
        const whatsappAnchor = document.getElementById('whatsapp-link');
        whatsappAnchor.href = whatsappLink;
        whatsappAnchor.style.display = 'inline-block';
    })
    .catch((error) => {
        alert('Error occurred while submitting!');
        console.error('Error:', error);
    });
}
