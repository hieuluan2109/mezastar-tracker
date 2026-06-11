'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { AlertCircle, Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signUp, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // Redirect if already logged in
  if (user) {
    router.push('/')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    if (isSignUp) {
      const { error } = await signUp(email, password)
      if (error) {
        setError(error)
      } else {
        setMessage('Đăng ký thành công! Kiểm tra email để xác nhận tài khoản.')
      }
    } else {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error)
      } else {
        router.push('/')
        router.refresh()
      }
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-root text-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-panel rounded-2xl p-8 border border-primary/80 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 shadow-lg shadow-rose-950/30 mb-4">
              <span className="font-extrabold text-white text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              MEZASTAR{' '}
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                DEX
              </span>
            </h1>
            <p className="text-sm text-secondary mt-1">
              {isSignUp ? 'Tạo tài khoản mới' : 'Đăng nhập để đồng bộ bộ sưu tập'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-xl text-xs font-semibold mb-4">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success message */}
          {message && (
            <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-xl text-xs font-semibold mb-4">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-bold text-secondary">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-primary text-primary placeholder-theme text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-bold text-secondary">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-input border border-primary text-primary placeholder-theme text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-secondary hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold text-sm hover:from-rose-500 hover:to-amber-400 transition-all shadow-lg shadow-rose-950/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <span>{isSignUp ? 'Tạo tài khoản' : 'Đăng nhập'}</span>
              )}
            </button>
          </form>

          {/* Toggle sign in/up */}
          <div className="mt-6 text-center">
            <p className="text-xs text-secondary">
              {isSignUp ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
                className="text-rose-400 hover:text-rose-300 font-bold transition-colors"
              >
                {isSignUp ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            </p>
          </div>

          {/* Back link */}
          <div className="mt-4 text-center">
            <a href="/" className="text-xs text-muted hover:text-secondary transition-colors">
              ← Quay lại trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
