const Footer = () => {
    return (
      <footer className="bg-white border-t border-gray-200 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Bibliophiles. All rights reserved.</p>
          <p>
            Designed & Developed by{' '}
            <a
              href="https://github.com/montasssar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:underline font-medium"
            >
              B'Neji Monta
            </a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  