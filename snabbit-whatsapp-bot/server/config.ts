export const serverConfig = {
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID ?? '',
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN ?? '',
  graphVersion: process.env.GRAPH_API_VERSION ?? 'v21.0',
  verifyToken: process.env.WEBHOOK_VERIFY_TOKEN ?? 'snabbit-webhook-demo',
  razorpayBase: process.env.RAZORPAY_PAYMENT_LINK_BASE ?? 'https://rzp.io/l',
  localMock: process.env.WHATSAPP_LOCAL_MOCK === '1',
  port: Number(process.env.WEBHOOK_PORT ?? 8788),
}
