import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { site } from './site';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <Home />
      <Footer />
      <a
        href={site.contacts.phoneHref}
        className="fixed bottom-4 left-4 right-4 z-40 rounded-full bg-accent py-4 text-center text-base font-bold text-white shadow-xl shadow-accent/30 md:hidden"
      >
        Позвонить: {site.contacts.phone}
      </a>
    </div>
  );
}
