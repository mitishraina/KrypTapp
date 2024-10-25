document.addEventListener('DOMContentLoaded', function() {
    const qrScannerSection = document.getElementById('qr-scanner-section');
    const paymentScreen = document.getElementById('payment-screen');
    const pinScreen = document.getElementById('pin-screen');
    const completedScreen = document.getElementById('completed-screen');

    const payBtn = document.getElementById('pay-btn');
    const confirmPinBtn = document.getElementById('confirm-pin-btn');
    const doneBtn = document.getElementById('done-btn');

    const amountInput = document.getElementById('amount');
    const userName = document.getElementById('user-name');
    const paidAmount = document.getElementById('paid-amount');
    const paidTo = document.getElementById('paid-to');

    // Simulating QR code scanning event
    qrScannerSection.addEventListener('click', function() {
        qrScannerSection.classList.remove('active');
        paymentScreen.classList.add('active');
        userName.innerText = "Mitish Raina"; // Example scanned user
    });

    // Proceed to PIN screen after clicking Pay
    payBtn.addEventListener('click', function() {
        if (amountInput.value > 0) {
            paymentScreen.classList.remove('active');
            pinScreen.classList.add('active');
        } else {
            alert("Please enter a valid amount");
        }
    });

    // Confirm PIN and show transaction completed screen
    confirmPinBtn.addEventListener('click', function() {
        pinScreen.classList.remove('active');
        completedScreen.classList.add('active');
        paidAmount.innerText = `${amountInput.value} Kryp`;
        paidTo.innerText = `Paid to ${userName.innerText}`;
    });

    // Done button returns to QR Scanner
    doneBtn.addEventListener('click', function() {
        completedScreen.classList.remove('active');
        qrScannerSection.classList.add('active');
        amountInput.value = '';  // Reset amount input
    });
});
