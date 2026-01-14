// CreativeHub API Types

export interface CreativeHubPrintOption {
    Id: number;
    Price: number;
    CostPerItem: number;
    ShortSideMM: number;
    LongSideMM: number;
    CurrencyCode: string;
    ExternalSku: string;
    Description: string;
    ShortDescription: string;
    FullDescription: string;
    IsAvailable: boolean;
    SellAsEdition: boolean;
    EditionsLimit?: number;
    EditionsSold?: number;
    HasFrame: boolean;
    HasMounting: boolean;
    HasCanvas: boolean;
    SubstrateDescription?: string;
    FrameDescription?: string;
}

export interface CreativeHubProduct {
    Id: number;
    FileName: string;
    DisplayName: string;
    Description: string;
    DescriptionHTML?: string;
    ThumbnailUrl: string;
    Paper: string;
    PrintType: string;
    ArtistName: string;
    Width: number;
    Height: number;
    HDPI: number;
    VDPI: number;
    HasFramedOptions: boolean;
    PrintOptions: CreativeHubPrintOption[];
}

export interface CreativeHubProductsResponse {
    Data: CreativeHubProduct[];
    Total: number;
}

// Transform CreativeHub product to our local Product type
export function transformCreativeHubProduct(
    chProduct: CreativeHubProduct,
    printOption: CreativeHubPrintOption,
    stripePriceId?: string
) {
    // Convert mm to readable size
    const shortSideCm = Math.round(printOption.ShortSideMM / 10);
    const longSideCm = Math.round(printOption.LongSideMM / 10);
    const sizeLabel = `${shortSideCm}x${longSideCm}cm`;

    return {
        id: `ch-${chProduct.Id}-${printOption.Id}`,
        creativeHubProductId: chProduct.Id,
        creativeHubPrintOptionId: printOption.Id,
        title: chProduct.DisplayName || chProduct.FileName,
        description: chProduct.Description || `Fine art print by ${chProduct.ArtistName}`,
        image: chProduct.ThumbnailUrl,
        priceId: stripePriceId || 'price_NEEDS_STRIPE_ID',
        price: printOption.Price,
        currency: printOption.CurrencyCode || 'EUR',
        creativeHubSettings: {
            sku: printOption.ExternalSku || `${chProduct.Id}-${printOption.Id}`,
            paperId: chProduct.Paper || 'Hahnemühle Photo Rag 308',
            size: sizeLabel,
        },
        // Extra metadata
        printOptionDescription: printOption.Description || printOption.ShortDescription,
        isLimitedEdition: printOption.SellAsEdition,
        editionsLimit: printOption.EditionsLimit,
        editionsSold: printOption.EditionsSold,
        hasFrame: printOption.HasFrame,
        costPerItem: printOption.CostPerItem,
        artistName: chProduct.ArtistName,
    };
}
