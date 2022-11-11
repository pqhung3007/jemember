export default async function Signup() {
  return (
    <div className="relative h-full w-full max-w-md p-4 md:h-auto">
      <div className="relative rounded-lg bg-white shadow dark:bg-neutral-700">
        <div className="py-6 px-6 lg:px-8">
          <div className="mb-4 text-xl font-medium text-neutral-900 dark:text-white">
            Sign in
          </div>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block text-sm font-medium text-neutral-900 dark:text-neutral-300">
                Your email
              </div>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-green-500 focus:ring-green-500 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white dark:placeholder-neutral-400"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block text-sm font-medium text-neutral-900 dark:text-neutral-300">
                Your password
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-green-500 focus:ring-green-500 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white dark:placeholder-neutral-400"
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="focus:ring-3 h-4 w-4 rounded border border-neutral-300 bg-neutral-50 focus:ring-green-300 dark:border-neutral-500 dark:bg-neutral-600 dark:ring-offset-neutral-800 dark:focus:ring-green-600"
                    required
                  />
                </div>
                <div className="ml-2 text-sm font-medium text-neutral-900 dark:text-neutral-300">
                  Remember me
                </div>
              </div>
              <a
                href="#"
                className="text-sm text-green-700 hover:underline dark:text-green-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Login to your account
            </div>
            <div className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
              Not registered?{" "}
              <a
                href="#"
                className="text-green-700 hover:underline dark:text-green-500"
              >
                Create account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
