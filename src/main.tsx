import ReactDOM from 'react-dom/client';
import { Theme } from "@radix-ui/themes";
import { store } from './app/store';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import 'tailwindcss/tailwind.css';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  console.log('Mocking enabled');
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Theme>
      <Provider store={store}>
        <App />
      </Provider>
    </Theme>,
  );
});
