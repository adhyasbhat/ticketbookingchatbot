// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Function to calculate total amount
function calculateTotal(adultTickets, childTickets) {
    const adultPrice = 100;
    const childPrice = 50;
    const totalAmount = (adultTickets * adultPrice) + (childTickets * childPrice);
    return totalAmount;
}

app.post('/webhook', (req, res) => {
    const incomingMessage = req.body.Body.toLowerCase();
    let responseMessage = '';

    // Function to send message
    function sendMessage(message) {
        res.set('Content-Type', 'text/plain');
        res.send(message);
    }

    // Check incoming message
    if (incomingMessage === 'hi' || incomingMessage === 'hello') {
        responseMessage = 'Hi there! Welcome to Ticket Booking Service. Please provide the date and time of the event (e.g., "Date: DD/MM/YYYY, Time: HH:MM AM/PM").';
        sendMessage(responseMessage);
    } else if (incomingMessage.startsWith('date') && incomingMessage.includes('time')) {
        const dateTime = incomingMessage.match(/(\d{1,2}\/\d{1,2}\/\d{4}), time: (\d{1,2}:\d{2} [ap]m)/);
        if (dateTime && dateTime.length >= 3) {
            const date = dateTime[1];
            const time = dateTime[2];
            responseMessage = `You've selected Date: ${date}, Time: ${time}. How many adult and child tickets do you want to book?`;
            sendMessage(responseMessage);
        } else {
            responseMessage = 'Please provide the date and time in the correct format (e.g., "Date: DD/MM/YYYY, Time: HH:MM AM/PM").';
            sendMessage(responseMessage);
        }
    } else if (incomingMessage.startsWith('adult') && incomingMessage.includes('child')) {
        const tickets = incomingMessage.match(/adult: (\d+), child: (\d+)/);
        if (tickets && tickets.length >= 3) {
            const adultTickets = parseInt(tickets[1]);
            const childTickets = parseInt(tickets[2]);
            const totalAmount = calculateTotal(adultTickets, childTickets);
            responseMessage = `You've booked ${adultTickets} adult ticket(s) and ${childTickets} child ticket(s). Total amount to be paid: ${totalAmount} INR. Please confirm your booking.`;
            sendMessage(responseMessage);
        } else {
            responseMessage = 'Please provide the number of adult and child tickets you want to book in the correct format (e.g., "Adult: 2, Child: 1").';
            sendMessage(responseMessage);
        }
    } else {
        responseMessage = 'Sorry, I didn\'t understand that. Please follow the instructions to book tickets.';
        sendMessage(responseMessage);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
