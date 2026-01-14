import Image from 'next/image';

export const metadata = {
    title: 'About | Sara Latif Fine Art Photography',
    description: 'Learn about Sara Latif and her fine art photography journey',
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                {/* Image placeholder */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">📷</span>
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-6">
                        About Sara Latif
                    </h1>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Sara Latif is a fine art photographer based in Lisbon, Portugal.
                        Her work explores the intersection of light, emotion, and timeless beauty.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Each photograph is a meditation on the moment—capturing not just
                        what is seen, but what is felt. Her prints invite viewers to pause,
                        reflect, and find their own meaning within the frame.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        All prints are produced using museum-quality Giclée printing on
                        Hahnemühle Photo Rag paper, ensuring exceptional detail and
                        archival longevity of over 100 years.
                    </p>
                </div>
            </div>

            {/* Process */}
            <section className="py-16 border-t border-gray-100">
                <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-12 text-center">
                    The Printing Process
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="text-4xl mb-4">🖼️</div>
                        <h3 className="text-sm font-medium tracking-wider text-gray-900 uppercase mb-2">
                            Premium Paper
                        </h3>
                        <p className="text-sm text-gray-500">
                            Hahnemühle Photo Rag 308gsm, the gold standard for fine art reproduction.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-4">🎨</div>
                        <h3 className="text-sm font-medium tracking-wider text-gray-900 uppercase mb-2">
                            Giclée Printing
                        </h3>
                        <p className="text-sm text-gray-500">
                            12-color archival inks for exceptional color accuracy and tonal range.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-sm font-medium tracking-wider text-gray-900 uppercase mb-2">
                            Careful Shipping
                        </h3>
                        <p className="text-sm text-gray-500">
                            Flat-packed in rigid mailers with tracking. Worldwide delivery available.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-16 border-t border-gray-100 text-center">
                <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-4">
                    Get in Touch
                </h2>
                <p className="text-gray-500 mb-6">
                    For commissions, exhibition inquiries, or custom print requests.
                </p>
                <a
                    href="mailto:hello@saralatif.co"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
                >
                    Contact Me
                </a>
            </section>
        </div>
    );
}
