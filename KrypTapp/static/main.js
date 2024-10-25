const amountInput = document.getElementById('amount-input');
const amountError = document.getElementById('amount-error');
const receiveBtn = document.querySelector('.receive-btn');

// Function to validate amount
function validateAmount(value) {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue > 0;
}

// Add input event listener for amount field
amountInput.addEventListener('input', function(e) {
// Remove any non-numeric characters except decimal point
            let value = this.value.replace(/[^\d.]/g, '');
            
            // Ensure only one decimal point
            const decimalPoints = value.match(/\./g) || [];
            if (decimalPoints.length > 1) {
                value = value.replace(/\.(?=.*\.)/g, '');
            }
            
            // Update input value
            this.value = value;
            
            // Validate amount
            if (validateAmount(value)) {
                this.classList.remove('error');
                amountError.style.display = 'none';
                receiveBtn.disabled = false;
            } else {
                this.classList.add('error');
                amountError.style.display = 'block';
                receiveBtn.disabled = true;
            }
        });

        document.querySelector(".receive-btn").addEventListener("click", function(e) {
            e.preventDefault();
            const popupCard = document.getElementById('popup-card');
            const cardMessage = document.getElementById('card-message');
    
            // Show the popup card with 'Scan the card' message
            popupCard.classList.remove('hidden');
            popupCard.classList.add('visible');
    
            // After 2 seconds, show PIN input
            setTimeout(() => {
                cardMessage.innerHTML = `
                    <p>Enter PIN</p>
                    <input type="password" maxlength="4" class="pin-input" placeholder="****">
                    <button class="submit-pin">Submit</button>
                `;

                // Add event listener for PIN submission
                const submitPin = cardMessage.querySelector('.submit-pin');
                const pinInput = cardMessage.querySelector('.pin-input');
                
                submitPin.addEventListener('click', () => {
                    if (pinInput.value.length === 4) {
                        // Show processing message with animated dots
                        cardMessage.innerHTML = `
                            <p>Processing</p>
                            <div class="processing-text loading-dots">Please wait</div>
                        `;
                        
                        // After 4 seconds, show transaction processed
                        setTimeout(() => {
                            cardMessage.innerHTML = `
                                <p>Transaction Processed</p>
                                <div class="processing-text">Your transaction is complete</div>
                            `;
                            
                            // Hide the popup after 2 more seconds
                            setTimeout(() => {
                                popupCard.classList.remove('visible');
                                setTimeout(() => {
                                    popupCard.classList.add('hidden');
                                    cardMessage.innerHTML = "<p>Scan the card</p>"; // Reset for future use
                                    // Reset form
                                    amountInput.value = '';
                                    document.querySelector('input[placeholder="Enter Message"]').value = '';
                                    receiveBtn.disabled = true;
                                }, 500);
                            }, 2000);
                        }, 4000);
                    } else {
                        alert('Please enter a 4-digit PIN');
                    }
                });

                // Allow submission when Enter key is pressed
                pinInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter' && pinInput.value.length === 4) {
                        submitPin.click();
                    }
                });
            }, 2000);
        });