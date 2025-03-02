import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text
} from '@react-email/components'

interface NotionMagicLinkEmailProps {
  loginCode?: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

export const NotionMagicLinkEmail = ({
  loginCode
}: NotionMagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link</Preview>
    <Tailwind>
      <Body className="bg-white">
        <Container className="mx-auto max-w-2xl px-4">
          <Heading className="my-10 font-sans text-2xl font-bold text-gray-800">
            Login
          </Heading>
          <Link
            href="https://notion.so"
            target="_blank"
            className="mb-4 block font-sans text-sm text-blue-600 underline hover:text-blue-800"
          >
            Click here to log in with this magic link
          </Link>
          <Text className="mb-4 font-sans text-sm text-gray-800">
            Or, copy and paste this temporary login code:
          </Text>
          <code className="block w-full rounded-lg border border-gray-200 bg-gray-100 p-4 text-gray-800">
            {loginCode}
          </code>
          <Text className="mt-4 mb-4 font-sans text-sm text-gray-400">
            If you didn&apos;t try to login, you can safely ignore this email.
          </Text>
          <Text className="mt-3 mb-10 font-sans text-sm text-gray-400">
            Hint: You can set a permanent password in Settings & members → My
            account.
          </Text>
          <Img
            src={`${baseUrl}/static/notion-logo.png`}
            width="32"
            height="32"
            alt="Notion's Logo"
            className="mb-3"
          />
          <Text className="mb-6 font-sans text-xs leading-relaxed text-gray-400">
            <Link
              href="https://notion.so"
              target="_blank"
              className="text-gray-400 hover:text-gray-600"
            >
              Notion.so
            </Link>
            , the all-in-one-workspace
            <br />
            for your notes, tasks, wikis, and databases.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

NotionMagicLinkEmail.PreviewProps = {
  loginCode: 'sparo-ndigo-amurt-secan'
} as NotionMagicLinkEmailProps

export default NotionMagicLinkEmail
