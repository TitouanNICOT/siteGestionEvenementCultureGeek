import nodemailer from "nodemailer";
import db from "../models/index.js";

const sendEMail = async (req, res) => {
    const {email, sujet, message} = req.body;

    const transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "contact.squadron70",
            pass: "omnkkuduznsoelvb",
        }
    });

    try {
        transporter.sendMail({
            from: email,
            to: "contact.squadron70@gmail.com",
            subject: sujet,
            html: `<div>
        <div style="background-color:#f7f7f7;margin:0;padding:70px 0 70px 0;width:100%">
            <table width="100%">
                <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="600"
                               style="background-color:#ffffff;border:1px solid #dedede;border-radius:3px">
                            <tbody>
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="600"
                                           style="background-color:#96588a;color:#ffffff;border-bottom:0;font-weight:bold;line-height:100%;vertical-align:middle;font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;border-radius:3px 3px 0 0">
                                        <tbody>
                                        <tr>
                                            <td style="padding:36px 48px;display:block;background-color:#401212">
                                                <h1 style="font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size:30px;font-weight:300;line-height:150%;margin:0;text-align:left;color:#ffffff">
                                                    ${sujet}
                                                </h1>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="600">
                                        <tbody>
                                        <tr>
                                            <td valign="top" style="background-color:#ffffff">
                                                <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                    <tbody>
                                                    <tr>
                                                        <td valign="top" style="padding:48px">
                                                            <div style="color:#11112c;font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size:14px;line-height:150%;text-align:left">
                                                                <p style="margin:0 0 16px">
                                                                    <strong>${sujet}</strong>
                                                                </p>
                                                                <p style="margin:0 0 16px">
                                                                    ${message}
                                                                </p>
                                                                <p style="margin:0 0 16px">
                                                                    from : ${email}
                                                                </p>
                                                                <p style="margin:0 0 16px">
                                                                    provided by
                                                                </p>
                                                                <img style="width: 200px;" src="https://www.zupimages.net/up/23/02/pv4g.png" alt="GeekyEvent">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>`
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({success: 0, data: e})
    }

    return res.status(200).send({success: 1, data: "Mail envoyé"})

}

const sendNotification = async (req, res) => {
    const {eventId, eventStatus} = req.body;
    console.log(eventId, eventStatus);

    const event = await db.evenement.findOne({
        where: {
            idEvenement: eventId
        },
        include: [{
            model: db.stand
        }]
    });

    let sujet;

    if(eventStatus === "Canceled"){
        sujet = "Annulation d'un événement";
    }

    if (eventStatus === "Modified") {
        sujet = "Modification d'un événement";
    }


    let htmlcontent = `
        <div>
            <div style="background-color:#f7f7f7;margin:0;padding:70px 0 70px 0;width:100%">
                <table width="100%">
                    <tbody>
                    <tr>
                        <td align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="600"
                                   style="background-color:#ffffff;border:1px solid #dedede;border-radius:3px">
                                <tbody>
                                <tr>
                                    <td align="center" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="600"
                                               style="background-color:#96588a;color:#ffffff;border-bottom:0;font-weight:bold;line-height:100%;vertical-align:middle;font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;border-radius:3px 3px 0 0">
                                            <tbody>
                                            <tr>
                                                <td style="padding:36px 48px;display:block;background-color:#401212">
                                                    <h1 style="font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size:30px;font-weight:300;line-height:150%;margin:0;text-align:left;color:#ffffff">
                                                        ${sujet}
                                                    </h1>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="600">
                                            <tbody>
                                            <tr>
                                                <td valign="top" style="background-color:#ffffff">
                                                    <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td valign="top" style="padding:48px">
                                                                <div style="color:#11112c;font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size:14px;line-height:150%;text-align:left">
                                                                    <p style="margin:0 0 16px">
`
    if (eventStatus === "Canceled") {
        htmlcontent += `
                                                                                    <strong> ${event.libelleEvenement} a été annulé</strong>
                                                                                </p>
                                                                                <p style="margin:0 0 16px">
                                                                                    l'événement ${event.libelleEvenement} prévus le ${event.heureDebut} à ${event.stand.nomStand} a été annulé
                                                                                </p>
        `;
    }

    if (eventStatus === "Modified") {
        htmlcontent += `
                                                                                    <strong> ${event.libelleEvenement} a été modifié</strong>
                                                                                </p>
                                                                                <p style="margin:0 0 16px">
                                                                                    l'événement ${event.libelleEvenement} prévus le ${event.heureDebut} à ${event.stand.nomStand} a été modifié.
                                                                                    Pour plus de détails, veuillez consulter la page de l'évenement : http://127.0.0.1:8080/evenement/${event.idEvenement}
                                                                                </p>
        `;

        sujet = "Modification d'un événement";
    }

    htmlcontent += `
                                                                    <p style="margin:0 0 16px">
                                                                        provided by
                                                                    </p>
                                                                    <img style="width: 200px;" src="https://www.zupimages.net/up/23/02/pv4g.png" alt="GeekyEvent">
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>`


    const transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "contact.squadron70",
            pass: "omnkkuduznsoelvb",
        }
    });

    await db.evenement.findAll({
        where: {
            idEvenement: eventId
        },
        include: [{
            model: db.user
        }]
    }).then((evenements) => {
        let emails = evenements.map((evenement) => evenement.users.map((user) => user.email));
        console.log(emails)
        if (emails.length !== 0) {
            emails.forEach((email) => {
                try {
                    transporter.sendMail({
                        from: "contact.squadron70@gmail.com",
                        to: email,
                        subject: sujet,
                        html: htmlcontent
                    })
                } catch (e) {
                    console.log(e);
                    return res.status(500).send({success: 0, data: e})
                }
            })
        }
    });

    return res.status(200).send({success: 1, data: "Mails envoyés"})
}

export default {sendEMail, sendNotification}
