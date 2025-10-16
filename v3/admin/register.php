<div id="registerModal" class="fixed inset-0 z-[60] hidden">
  <div id="registerModalBackdrop" class="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 ease-out"></div>

  <div class="absolute inset-0 flex items-center justify-center p-4">
    <div id="registerModalPanel"
      class="w-full max-w-lg origin-center rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-100
             opacity-0 scale-95 translate-y-4 transition-all duration-300 ease-out">
      <div class="flex items-center justify-between border-b border-zinc-200 px-5 py-3">
        <h5 class="text-lg font-semibold text-zinc-800">Tambah Admin</h5>
        <button id="closeModalBtn" aria-label="Close"
          class="size-11 grid place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700
                 transition-all duration-200 active:scale-95">
          <i class="bx bx-x text-2xl"></i>
        </button>
      </div>

      <form id="register-form" class="px-5 py-4 space-y-4">
        <div class="grid grid-cols-1 gap-4">
          <div class="space-y-1">
            <label for="name" class="text-sm font-medium text-zinc-700">Nama</label>
            <input id="name" name="name" type="text" required placeholder="Masukkan Nama Lengkap"
              class="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-zinc-900 shadow-sm placeholder:text-zinc-400
                     focus:border-[#028f46] focus:ring-4 focus:ring-[#028f46]/10" />
          </div>

          <div class="space-y-1">
            <label for="username" class="text-sm font-medium text-zinc-700">Username</label>
            <input id="username" name="username" type="text" required placeholder="Masukkan Username"
              class="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-zinc-900 shadow-sm placeholder:text-zinc-400
                     focus:border-[#028f46] focus:ring-4 focus:ring-[#028f46]/10" />
          </div>

          <div class="space-y-1">
            <label for="email" class="text-sm font-medium text-zinc-700">Email</label>
            <input id="email" name="email" type="email" required placeholder="Masukkan Email"
              class="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-zinc-900 shadow-sm placeholder:text-zinc-400
                     focus:border-[#028f46] focus:ring-4 focus:ring-[#028f46]/10" />
          </div>

          <div class="space-y-1">
            <label for="password" class="text-sm font-medium text-zinc-700">Password</label>
            <div class="relative">
              <input id="password" name="password" type="password" required placeholder="Masukkan Password"
                class="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 pr-12 text-zinc-900 shadow-sm placeholder:text-zinc-400
                       focus:border-[#028f46] focus:ring-4 focus:ring-[#028f46]/10" />
              <button type="button" data-eye="password" aria-label="Toggle password visibility"
                class="absolute inset-y-0 right-2 my-1.5 grid place-items-center rounded-lg px-2 text-zinc-600 hover:bg-zinc-100">
                <i class="bx bx-show text-xl"></i>
              </button>
            </div>
          </div>

          <div class="space-y-1">
            <label for="confirm-password" class="text-sm font-medium text-zinc-700">Masukkan Ulang Password</label>
            <div class="relative">
              <input id="confirm-password" name="confirm_password" type="password" required placeholder="Masukkan Ulang Password"
                class="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 pr-12 text-zinc-900 shadow-sm placeholder:text-zinc-400
                       focus:border-[#028f46] focus:ring-4 focus:ring-[#028f46]/10" />
              <button type="button" data-eye="confirm-password" aria-label="Toggle confirm password visibility"
                class="absolute inset-y-0 right-2 my-1.5 grid place-items-center rounded-lg px-2 text-zinc-600 hover:bg-zinc-100">
              </button>
            </div>
          </div>
        </div>

        <button type="submit"
          class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#028f46] px-4 py-2.5 text-white font-medium
                 shadow-sm hover:bg-[#028f46] active:bg-[#028f46] focus:outline-none focus:ring-4 focus:ring-[#028f46]/20">
          Tambah Admin
        </button>

        <div id="error-message" class="mt-2 text-sm text-rose-600"></div>
      </form>
    </div>
  </div>
</div>
