import express from 'express'
import { Resend } from 'resend'
import { config } from 'dotenv'

config()

const app = express()
const port = process.env.PORT ?? 1234

const resend = new Resend(process.env.API_KEY)

app.use(express.json())

app.post('/send-email', async (req, res) => {
  try {
    const { name, message } = req.body

    if (!name || !message) {
      return res.status(400).json({ error: 'Se requieren el nombre y el mensaje.' })
    }

    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['grosendoh73@gmail.com'],
      subject: `Message from ${name}`,
      text: message
    })

    return res.status(200).json({ success: true, message: 'Correo electrónico enviado correctamente.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al enviar el correo electrónico.' })
  }
})

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`)
})