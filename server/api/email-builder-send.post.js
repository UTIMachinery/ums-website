import nodemailer from 'nodemailer'
import { requireBuilderAuth } from '../utils/email-builder-auth'

const cleanHeader = (value = '', max = 180) =>
  String(value).replace(/[\r\n]+/g, ' ').trim().slice(0, max)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  requireBuilderAuth(event)

  const origin = getHeader(event, 'origin') || ''
  const host = getHeader(event, 'host') || ''
  if (origin && host && !origin.includes(host)) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid request origin.' })
  }

  const body = await readBody(event)
  const recipientName = cleanHeader(body?.recipientName, 100)
  const recipientEmail = cleanHeader(body?.recipientEmail, 180).toLowerCase()
  const subject = cleanHeader(body?.subject, 180)
  const html = String(body?.html || '')
  const text = String(body?.text || '').slice(0, 50000)

  if (!recipientEmail || !emailPattern.test(recipientEmail)) {
    throw createError({ statusCode: 400, statusMessage: 'Enter a valid recipient email.' })
  }
  if (!subject) {
    throw createError({ statusCode: 400, statusMessage: 'Email subject is required.' })
  }
  if (!html || html.length > 250000) {
    throw createError({ statusCode: 400, statusMessage: 'Email content is missing or too large.' })
  }
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw createError({ statusCode: 503, statusMessage: 'SMTP is not configured.' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const senderName = 'Jon Lester / Used Machinery Source'
  const info = await transporter.sendMail({
    from: `${senderName} <${process.env.SMTP_USER}>`,
    to: recipientName
      ? `"${recipientName.replace(/"/g, '')}" <${recipientEmail}>`
      : recipientEmail,
    replyTo: process.env.SMTP_USER,
    subject,
    text: text || 'Machinery information from Used Machinery Source.',
    html
  })

  return {
    success: true,
    accepted: info.accepted?.length || 0,
    messageId: info.messageId || ''
  }
})
