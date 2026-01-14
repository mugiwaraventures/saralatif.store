import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h2 className="text-xl font-light tracking-[0.3em] text-gray-900 mb-4">
                            SARA LATIF
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                            Fine art photography that captures the essence of light, emotion, and timeless beauty.
                            Each print is produced using archival-quality materials to ensure lasting excellence.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-medium tracking-wider text-gray-900 mb-4 uppercase">
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                                    Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-medium tracking-wider text-gray-900 mb-4 uppercase">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:hello@saralatif.co"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    hello@saralatif.co
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com/saralatif"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-400">
                            © {currentYear} Sara Latif Art Gallery. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
