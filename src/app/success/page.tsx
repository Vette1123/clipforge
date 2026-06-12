import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SuccessClient } from '@/components/site/SuccessClient'

export const metadata: Metadata = {
  title: 'Order confirmed',
  robots: { index: false },
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <SuccessClient />
    </Suspense>
  )
}
