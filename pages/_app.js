import '../styles/globals.css';
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <main className={fredoka.className}>
      <Component {...pageProps} />
    </main>
  );
}