import Link from 'next/link';

export const metadata = {
    title: 'Order Confirmed | Sara Latif Fine Art',
    description: 'Thank you for your purchase',
};

export default function SuccessPage() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
            <div className="text-6xl mb-8">✨</div>

            <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-4">
                Thank You for Your Order
            </h1>

            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Your order has been confirmed and will be processed shortly.
                You will receive an email confirmation with tracking information
                once your print has been shipped.
            </p>

            <div className="bg-gray-50 rounded-lg p-8 mb-12">
                <h2 className="text-sm font-medium tracking-wider text-gray-900 uppercase mb-4">
                    What happens next?
                </h2>
                <ul className="text-sm text-gray-600 space-y-3 text-left">
                    <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Order confirmed and payment received</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-gray-300">○</span>
                        <span>Your print is being produced (2-3 business days)</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-gray-300">○</span>
                        <span>Quality check and careful packaging</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-gray-300">○</span>
                        <span>Shipped with tracking (5-10 business days)</span>
                    </li>
                </ul>
            </div>

            <Link
                href="/"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
            >
                Continue Browsing
            </Link>
        </div>
    );
}
