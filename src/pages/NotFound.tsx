import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

const NotFound = () => {
  usePageTitle('404');

  return (
    <div className="min-h-screen flex items-center">
      <div className="container-custom">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="text-h1 font-medium mb-6">Esta página no existe.</h1>
        <p className="text-ink-600 dark:text-ink-300 max-w-prose-narrow mb-10">
          La URL que buscas no está disponible. Puede que se haya movido o
          escrito mal.
        </p>
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
