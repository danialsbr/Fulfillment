import { useToast } from './use-toast'

export function Toast() {
  const { toast } = useToast()

  if (!toast) return null

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-md ${
      toast.variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'
    } text-white`}>
      <h3 className="font-bold">{toast.title}</h3>
      {toast.description && <p>{toast.description}</p>}
    </div>
  )
}

