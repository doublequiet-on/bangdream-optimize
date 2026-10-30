export async function createRuntime(options = {}) {
  if (isDesktopRuntimeAvailable()) {
    const { createDesktopRuntime } = await import('./desktop.js?rev=c4787bae09e3364851a3');
    return createDesktopRuntime(options);
  }

  const { createBrowserRuntime } = await import('./browser.js?rev=c4787bae09e3364851a3');
  return createBrowserRuntime(options);
}

function isDesktopRuntimeAvailable() {
  return globalThis.__TAURI__?.core?.invoke != null
    || globalThis.__TAURI__?.tauri?.invoke != null
    || globalThis.__TAURI__?.invoke != null;
}
