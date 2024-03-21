"use client"
import { DocumentManager } from '@/components/custom/Document';

export default function DocumentPage() {
  const user = 'Yuly Marcela Velasquez'
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='App'>
        <DocumentManager user={user} />
      </div>
    </main>
  );
}
