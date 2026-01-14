import Link from 'next/link';

export const metadata = {
    title: 'Order Canceled | Sara Latif Fine Art',
    description: 'Your order was not completed',
};

export default function CanceledPage() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
            <div className="text-6xl mb-8">🛒</div>

            <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-4">
                Order Not Completed
            </h1>

            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Your checkout was canceled. No payment has been processed.
                Your cart items are still saved if you'd like to complete your purchase.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/cart"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
                >
                    Return to Cart
                </Link>
                <Link
                    href="/"
                    className="inline-block border border-gray-300 text-gray-700 px-8 py-3 text-sm tracking-wider uppercase hover:border-gray-400 transition-colors"
                >
                    Continue Browsing
                </Link>
            </div>

            <p className="mt-12 text-sm text-gray-400">
                Need help?{' '}
                <a href="mailto:hello@saralatif.co" className="text-gray-600 hover:text-gray-900 underline">
                    Contact us
                </a>
            </p>
        </div>
    );
}
