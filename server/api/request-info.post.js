import nodemailer from 'nodemailer'
import { verifyTurnstile } from '../utils/verify-turnstile'

const clean = (value = '') => String(value).replace(/[\r\n]+/g, ' ').trim()

export default defineEventHandler(async (event) => {
  await verifyTurnstile(event)

  const body = await readBody(event)
  const contact = body.contact || {}
  const machine = body.machine || {}

  if (!contact.email || !contact.contactName) {
    throw createError({ statusCode: 400, statusMessage: 'Name and email are required.' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const isMachineNeeded = body.inquiryType === 'machine-needed'

  const subject = isMachineNeeded
    ? `[UMS Website] Machine Needed - ${clean(contact.contactName)}${contact.companyName ? ` - ${clean(contact.companyName)}` : ''}`
    : `Website Lead - ${clean(machine.year)} ${clean(machine.manufacturer)} ${clean(machine.model)} - Stock #${clean(machine.invID)}`

  const message = isMachineNeeded
    ? `Machine Needed - Website Inquiry\n\nContact Information:\nName: ${clean(contact.contactName)}\nCompany: ${clean(contact.companyName)}\nEmail: ${clean(contact.email)}\nPhone: ${clean(contact.phone)}\nAddress: ${clean(contact.address)}\nCity: ${clean(contact.city)}\nState: ${clean(contact.state)}\nPostal Code: ${clean(contact.postalCode)}\nCountry: ${clean(contact.country)}\n\nHave machines to sell or trade?: ${clean(body.machinesToSell)}\nSign up for email list?: ${clean(body.emailList)}\n\nMachine Needed:\n${body.message || ''}`
    : `Website Request for Information\n\nMachine:\n${clean(machine.year)} ${clean(machine.manufacturer)} ${clean(machine.model)}\nStock #${clean(machine.invID)}\n\nContact Information:\nName: ${clean(contact.contactName)}\nCompany: ${clean(contact.companyName)}\nEmail: ${clean(contact.email)}\nPhone: ${clean(contact.phone)}\nAddress: ${clean(contact.address)}\nCity: ${clean(contact.city)}\nState: ${clean(contact.state)}\nPostal Code: ${clean(contact.postalCode)}\nCountry: ${clean(contact.country)}\n\nHave machines to sell or trade?: ${clean(body.machinesToSell)}\nSign up for email list?: ${clean(body.emailList)}\n\nMessage:\n${body.message || ''}`

  const recipients = ['jon@usedmachinerysource.com']
  if (process.env.SMTP_USER && !recipients.includes(process.env.SMTP_USER)) {
    recipients.push(process.env.SMTP_USER)
  }

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: recipients.join(', '),
    replyTo: clean(contact.email),
    subject,
    text: message
  })

  return {
    success: true,
    accepted: info.accepted?.length || 0
  }
})