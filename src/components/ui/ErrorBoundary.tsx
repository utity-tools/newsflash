import { Component } from 'react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full">
            <p className="text-white font-medium">Something went wrong</p>
            <p className="text-zinc-500 text-sm mt-2">
              We couldn't load the news. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-zinc-950 rounded-full px-6 py-2 text-sm font-medium mt-6"
            >
              Reload page
            </button>
            {import.meta.env.DEV && this.state.error && (
              <p className="text-zinc-600 text-xs mt-4 font-mono">
                {this.state.error.message}
              </p>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
