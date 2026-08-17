import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const subject = `Website Lead - ${body.machine.year} ${body.machine.manufacturer} ${body.machine.model} - Stock #${body.machine.invID}`

  const message = `
Website Request for Information

Machine:
${body.machine.year} ${body.machine.manufacturer} ${body.machine.model}
Stock #${body.machine.invID}

Contact Information:
Email: ${body.contact.email}
Contact Name: ${body.contact.contactName}
Phone: ${body.contact.phone}
Company Name: ${body.contact.companyName}
Address: ${body.contact.address}
City: ${body.contact.city}
State: ${body.contact.state}
Postal Code: ${body.contact.postalCode}
Country: ${body.contact.country}

Have machines to sell or trade?: ${body.machinesToSell}
Sign up for email list?: ${body.emailList}

Message:
${body.message}
  `

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: 'jon@usedmachinerysource.com',
    replyTo: body.contact.email,
    subject,
    text: message
  })

  return {
    success: true
  }
})