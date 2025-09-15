export async function getMessages(locale: string) {
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    return messages;
  } catch (err) {
    const fallback = (await import(`@/messages/en.json`)).default;
    return fallback;
  }
}
