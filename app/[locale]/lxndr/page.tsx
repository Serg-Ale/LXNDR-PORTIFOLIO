import { permanentRedirect } from "next/navigation"

interface LegacyLxndrPageProps {
  params: Promise<{ locale: string }>
}

export default async function LegacyLxndrPage({ params }: LegacyLxndrPageProps) {
  const { locale } = await params

  permanentRedirect(`/${locale}/saerix`)
}
