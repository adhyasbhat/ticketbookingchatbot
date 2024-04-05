const {NlpManager} = require('node-nlp')
const express = require('express');
const manager = new NlpManager(({languages: ['en']}));
const app = express();
manager.addDocument('en','hello','greeting')
manager.addDocument('en','hi','greeting')
manager.addDocument('en','hey','greeting')
manager.addDocument('en','hi there','greeting')
manager.addDocument('en','hello good day','greeting')

manager.addAnswer('en','greeting','Hello how can i help you')

manager.addDocument('en','i want to book trecking ticket','ticketBooking')
manager.addDocument('en','Book trek ticke','ticketBooking')
manager.addDocument('en','Reserve hike spot','ticketBooking')
manager.addDocument('en','Trekking ticket please','ticketBooking')
manager.addDocument('en','Secure trek place','ticketBooking')

manager.addAnswer('en','ticketBooking','Select the type of ticket - Adult - Rs 100 per head, Child Rs 50 per head')

manager.addDocument('en','Adult','adultTicket')

manager.addAnswer('en','adultTicket','How many number of adult tickets you want to book')

manager.addDocument('en','i want to book adults 4 tickets','adultnoOfTickets')
manager.addDocument('en','book 5 adult tickets','adultnoOfTickets')
manager.addDocument('en','3 adults slots','adultnoOfTickets')
manager.addDocument('en','2 adults','adultnoOfTickets')
manager.addDocument('en','i need 1 adult ticket','adultnoOfTickets')

manager.addAnswer('en','adultnoOfTickets','On which day do you want to book (Please specify the date in DD/MM/YYYY fromat)')

manager.addDocument('en','Child','childTicket')
manager.addDocument('en','Kid','childTicket')
manager.addDocument('en','Children','childTicket')
manager.addDocument('en','Kids','childTicket')

manager.addAnswer('en','childTicket','How many number of child tickets you want to book')

manager.addDocument('en','i want to book kids 4 tickets','kidsnoOfTickets')
manager.addDocument('en','book 5 children tickets','kidsnoOfTickets')
manager.addDocument('en','3 kid slots','kidsnoOfTickets')
manager.addDocument('en','2 children','kidsnoOfTickets')
manager.addDocument('en','i need 1 child ticket','kidsnoOfTickets')

manager.addAnswer('en','kidsnoOfTickets','On which day do you want to book (Please specify the date in DD/MM/YYYY fromat)')

manager.addDocument('en','book on 12-01-2024','date')
manager.addDocument('en','30-04-2024','date')
manager.addDocument('en','slot on 15-03-2024 ','date')

manager.addAnswer('en','date','Specify your payment mode -  Google Pay, PhonePe, Paytm')

manager.addDocument('en','Google pay','payment')
manager.addDocument('en','Gpay','payment')
manager.addDocument('en','Phonepe','payment')
manager.addDocument('en','Paytm','payment')

manager.addAnswer('en','payment','You will be redirected to your payment app Thank you for booking')


manager.train().then(async()=>{
manager.save();
    app.get('/info',async(req,res)=>{

        let response = await manager.process('en',req.query.message);
        res.send(response.answer)
    })
    
    app.listen(3000)
})