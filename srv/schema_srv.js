/* eslint-disable */
const cds = require ('@sap/cds')
const emailer = require('nodemailer');

module.exports = cds.service.impl(function() {
    this.on('sendEmail', async (req) => {
        let transporter = emailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'dummyinnovchallenge@gmail.com',
                pass: 'Tarun@123', 
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'dummyinnovchallenge@gmail.com', // sender address
            to: "aakash.jain01@sap.com, jain24akash@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello" + req.data.itemList, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info);
        return true;
    })

    this.on('getWeight', async(req)=>{
        const db = await cds.connect.to ('db')

        const{ weight } = db.entities('test');

        let itemWeight = await SELECT.one.from(weight).orderBy('createdAt desc');
        return itemWeight.weight
    })

    this.on('sendWhatsApp', async (req) => {
        return true;
    })

})