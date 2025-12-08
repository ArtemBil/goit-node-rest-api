import nodemailer from 'nodemailer';

const config = {
    host: process.env.UKRNET_TRANSPORT_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.UKRNET_TRANSPORT_USER,
        pass: process.env.UKRNET_TRANSPORT_PWD,
    },
};

const transporter = nodemailer.createTransport(config);

export default transporter;
