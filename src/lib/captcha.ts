/* eslint-disable no-undef */
export async function getCaptchaToken(action: string): Promise<string | null> {
  return new Promise<string>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY
      if (!siteKey) {
        throw new Error('RECAPTCHA_SITE_KEY is not defined')
      }
      const token = await grecaptcha.execute(siteKey, { action })
      resolve(token)
    })
  })
}

export async function verifyCaptchaToken(token: string): Promise<boolean> {
  const secretKey = process.env.CAPTCHA_SECRET_KEY
  if (!secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY is not defined')
  }

  const url = new URL('https://www.google.com/recaptcha/api/siteverify')
  url.searchParams.append('secret', secretKey)
  url.searchParams.append('response', token)

  const response = await fetch(url, {
    method: 'POST'
  })

  if (!response.ok) {
    throw new Error(`Error verifying captcha token: ${response.statusText}`)
  }

  const data = await response.json()
  return data.success
}
