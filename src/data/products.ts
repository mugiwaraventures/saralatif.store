import { Product } from '@/types';

export const products: Product[] = [
    {
        id: 'print-01',
        title: 'The Look',
        description: 'Fine art print em papel Hahnemühle Photo Rag 308gsm. Cores vibrantes e detalhes excepcionais que capturam a essência do momento.',
        image: '/images/the-look.jpg',
        priceId: 'price_REPLACE_WITH_STRIPE_PRICE_ID',
        price: 80.00,
        currency: 'EUR',
        creativeHubSettings: {
            sku: 'MASTER_FILE_ID_01',
            paperId: 'Hahnemühle Photo Rag 308',
            size: 'A3'
        }
    },
    {
        id: 'print-02',
        title: 'Golden Hour',
        description: 'Captura da luz dourada do pôr do sol. Impressão Fine Art em papel premium com acabamento museu.',
        image: '/images/golden-hour.jpg',
        priceId: 'price_REPLACE_WITH_STRIPE_PRICE_ID',
        price: 120.00,
        currency: 'EUR',
        creativeHubSettings: {
            sku: 'MASTER_FILE_ID_02',
            paperId: 'Hahnemühle Photo Rag 308',
            size: 'A2'
        }
    },
    {
        id: 'print-03',
        title: 'Urban Symphony',
        description: 'Composição urbana em preto e branco. Fine art print que transforma qualquer ambiente.',
        image: '/images/urban-symphony.jpg',
        priceId: 'price_REPLACE_WITH_STRIPE_PRICE_ID',
        price: 95.00,
        currency: 'EUR',
        creativeHubSettings: {
            sku: 'MASTER_FILE_ID_03',
            paperId: 'Hahnemühle Photo Rag 308',
            size: 'A3'
        }
    },
    {
        id: 'print-04',
        title: 'Silent Reflection',
        description: 'Momento de introspecção capturado em luz natural suave. Edição limitada numerada.',
        image: '/images/silent-reflection.jpg',
        priceId: 'price_REPLACE_WITH_STRIPE_PRICE_ID',
        price: 150.00,
        currency: 'EUR',
        creativeHubSettings: {
            sku: 'MASTER_FILE_ID_04',
            paperId: 'Hahnemühle Photo Rag 308',
            size: 'A2'
        }
    }
];

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}
