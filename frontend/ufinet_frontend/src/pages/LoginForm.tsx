import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom";

export function LoginForm(){
    const{
        formData,
        handleChange,
        handleSubmit,
        loading, 
        error
    } = useLogin();

    return (
  <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-10">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block w-8 h-8 border border-yellow-700 rotate-45 mb-4" />
        <h1 className="text-xs tracking-[0.4em] text-neutral-200 uppercase font-light mb-1">
            Ufinet Cars
        </h1>
        <p className="text-[10px] tracking-[0.3em] text-yellow-700 uppercase">
          Bienvenido
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <span className="flex-1 h-px bg-neutral-800" />
        <span className="w-1.5 h-1.5 bg-yellow-700 rotate-45" />
        <span className="flex-1 h-px bg-neutral-800" />
      </div>

      <p className="text-center text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-6">
        Inicio de sesión
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingrese su nombre de usuario"
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm font-light tracking-wide px-4 py-3 outline-none focus:border-yellow-700 placeholder:text-neutral-700 transition-colors duration-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm font-light tracking-wide px-4 py-3 outline-none focus:border-yellow-700 placeholder:text-neutral-700 transition-colors duration-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-yellow-700 text-yellow-700 text-[10px] tracking-[0.35em] uppercase font-light py-3.5 hover:bg-yellow-700 hover:text-neutral-950 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Verificando..." : "Ingresar"}
        </button>

        {error && (
          <p className="mt-4 text-[10px] tracking-widest text-red-400 text-center border border-red-900/40 bg-red-950/20 py-2">
            {error}
          </p>
        )}
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-[10px] tracking-[0.15em] text-neutral-600">
        ¿N&apos;o tienes una cuenta?{" "}
        <Link to="/register" className="text-yellow-700 hover:text-yellow-500 transition-colors duration-200">
          Regístrate
        </Link>
      </p>

      <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
    </div>
  </div>
)
}