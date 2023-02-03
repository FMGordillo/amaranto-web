import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block text-cyan-400 drop-shadow-md">
                  Amaranto
                </span>
              </h1>
              <div className="mx-auto mt-10 flex max-w-sm flex-col gap-4 sm:max-w-none sm:justify-center">
                {user ? (
                  <>
                    <Link
                      to="/patients"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-cyan-700 shadow-sm hover:bg-cyan-50 sm:px-8"
                    >
                      Registrar visita
                    </Link>
                    <Link
                      to="/patients"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-cyan-700 shadow-sm hover:bg-cyan-50 sm:px-8"
                    >
                      Ver pacientes
                    </Link>
                  </>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-cyan-700 shadow-sm hover:bg-cyan-50 sm:px-8"
                    >
                      Registrarse
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-cyan-500 px-4 py-3 font-medium text-white hover:bg-cyan-600"
                    >
                      Iniciar sesión
                    </Link>
                  </div>
                )}
              </div>
              <a href="https://remix.run">
                <img
                  src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                  alt="Remix"
                  className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
