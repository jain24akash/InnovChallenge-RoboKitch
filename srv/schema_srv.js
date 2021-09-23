/* eslint-disable */
const cds = require('@sap/cds')
const emailer = require('nodemailer');

const notifText = 'Dear Vendor' + ', ' +
    'Please deliver the items' + ': ' +
    'Rice - 5000g, Sugar - 1000g, Tea - 1000g.'

const notifHtmlText = '<body>Dear Vendor, <br> Please deliver the following items: <br> 1. Rice - 5000g <br> 2. Sugar - 1000g <br> 3. Tea - 1000g </body>'
module.exports = cds.service.impl(function () {
    this.on('sendEmail', async (req) => {
        console.log('trying to create transport');
        
        let transporter = emailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secureConnection: false, // true for 465, false for other ports
            auth: {
                user: 'dummyinnovchallenge@gmail.com',
                pass: 'Tarun@123',
            },
            tls: {
                ciphers: 'SSLv3'
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'dummyinnovchallenge@gmail.com', // sender address
            to: "aakash.jain01@sap.com, jain24akash@gmail.com, preeti.singh.kshatriya@sap.com", // list of receivers
            subject: "Delivery Order", // Subject line
            //text: notifText, // plain text body
            html: notifHtmlText // html body
        });

        console.log("Message sent: %s", info);
        return true;
    })

    this.on('getWeight', async (req) => {
        const db = await cds.connect.to('db')

        const { weight } = db.entities('test');

        let itemWeight = await SELECT.one.from(weight).orderBy('createdAt desc');
        return itemWeight.weight
    })

    this.on('sendWhatsApp', async (req) => {
        const accountSid = 'ACeb0fdcefcfd9c82adbdb52325b0fe433';
        const authToken = '485cfd83e8b67417ac437cb0591cb7cd';

        const client = require('twilio')(accountSid, authToken);

        // Sending messages to the client
        client.messages
            .create({

                // Message to be sent
                body: notifText,

                // Senders Number (Twilio Sandbox No.)
                from: 'whatsapp:+14155238886',

                // Number receiving the message
                to: 'whatsapp:+919057780365'
            })
            .then(message => console.log("Message sent successfully"))
            .done();

        return true;
    });

    this.on('register', async (req) => {
        const db = await cds.connect.to('db')

        const { userCredentials } = db.entities('test');
        let success = await INSERT.into(userCredentials).entries({
            mobileNumber: req.data.mobileNumber,
            password: req.data.password,
            name: req.data.name,
            emailID: req.data.emailID
        })

        if (success) return true
        else {
            req.data.error(400, `Mobile Number ${req.data.mobileNumber} already exists`);
            return false;
        };

    })

    this.on('login', async (req) => {
        const db = await cds.connect.to('db')
        const { userCredentials } = db.entities('test');

        let user = await SELECT.one.from(userCredentials).where`mobileNumber = ${req.data.mobileNumber} and password = ${req.data.password}`;
        if (user && user.mobileNumber) return true;
        return false;
    })

})