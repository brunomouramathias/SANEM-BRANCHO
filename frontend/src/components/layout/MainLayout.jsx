import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function MainLayout({ children, title }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full">
        <Header title={title} />
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

