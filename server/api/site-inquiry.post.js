import nodemailer from 'nodemailer'
import { verifyTurnstile } from '../utils/verify-turnstile'

const clean = (value = '') => String(value).replace(/[\r\n]+/g, ' ').trim()

export default defineEventHandler(async (event) => {
  await verifyTurnstile(event)
  const contentType = getHeader(event, 'content-type') || ''
  let body = {}
  let attachments = []
  if (contentType.includes('multipart/form-data')) {
    const parts = await readMultipartFormData(event) || []
    const payloadPart = parts.find(part => part.name === 'payload')
    if (!payloadPart?.data) throw createError({ statusCode: 400, statusMessage: 'Missing form data.' })
    body = JSON.parse(payloadPart.data.toString('utf8'))
    attachments = parts.filter(part => part.name === 'attachments' && part.filename && part.data).slice(0, 10).map(part => ({ filename: part.filename, content: part.data, contentType: part.type }))
  } else body = await readBody(event)

  const contact = body.contact || {}
  const machine = body.machine || {}
  if (!contact.contactName || !contact.email || !contact.phone) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email and phone are required.' })
  }

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
  const preference = clean(contact.preferredContact) || clean(getCookie(event, 'ums-preferred-contact')) || 'Not specified'
  let subject = 'Website Contact - Used Machinery Source'
  let message = `Website Contact\n\nName: ${clean(contact.contactName)}\nCompany: ${clean(contact.companyName)}\nEmail: ${clean(contact.email)}\nPhone: ${clean(contact.phone)}\nPreferred Contact: ${preference}\nSubject: ${clean(body.subject)}\n\nMessage:\n${body.message || ''}`
  if (body.inquiryType === 'machine-for-sale') {
    subject = `Machine for Sale - ${clean(machine.year)} ${clean(machine.manufacturer)} ${clean(machine.model)}`.trim()
    message = `Machine for Sale\n\nContact Information:\nName: ${clean(contact.contactName)}\nCompany: ${clean(contact.companyName)}\nEmail: ${clean(contact.email)}\nPhone: ${clean(contact.phone)}\nPreferred Contact: ${preference}\n\nMachine Information:\nYear: ${clean(machine.year)}\nManufacturer: ${clean(machine.manufacturer)}\nModel: ${clean(machine.model)}\nMachine Type: ${clean(machine.machineType)}\nLocation: ${clean(machine.location)}\n\nDetails:\n${body.message || ''}`
  }
  if (body.inquiryType === 'wanted-response') {
    subject = `Wanted Response - ID #${clean(body.wtdId)}`
    message = `Wanted Response\n\nWanted ID: #${clean(body.wtdId)}\nWanted Type: ${clean(body.wantedType)}\nWanted Description: ${clean(body.wantedDescription)}\n\nContact Information:\nName: ${clean(contact.contactName)}\nCompany: ${clean(contact.companyName)}\nEmail: ${clean(contact.email)}\nPhone: ${clean(contact.phone)}\nPreferred Contact: ${preference}\n\nMachine Information:\nYear: ${clean(machine.year)}\nManufacturer: ${clean(machine.manufacturer)}\nModel: ${clean(machine.model)}\nLocation: ${clean(machine.location)}\n\nDetails:\n${body.message || ''}`
  }
  await transporter.sendMail({ from: process.env.SMTP_USER, to: 'jon@usedmachinerysource.com', replyTo: clean(contact.email), subject, text: message, attachments })
  return { success: true }
})
