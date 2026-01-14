# 📸 Sara Latif Fine Art Print Shop

Loja online headless de Fine Art Prints desenvolvida com Next.js 14, Stripe e CreativeHub API.

## 🚀 Funcionalidades

- **Vitrine Minimalista**: Design focado nas fotografias
- **Carrinho de Compras**: Persistência local com React Context
- **Checkout via Stripe**: Processamento seguro de pagamentos
- **Print on Demand Automático**: Integração com CreativeHub
- **100% TypeScript**: Código tipado e seguro

## 🛠 Tech Stack

| Tecnologia | Uso |
|------------|-----|
| Next.js 14 | Framework React com App Router |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização |
| Stripe | Pagamentos |
| CreativeHub API | Impressão e envio |
| Vercel | Hospedagem recomendada |

## ⚙️ Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas chaves:

```bash
cp env.example .env.local
```

Preencha as seguintes variáveis:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# CreativeHub
CREATIVEHUB_API_KEY=ch_...
CREATIVEHUB_API_URL=https://api.creativehub.io/v1

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Rodar em Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 💳 Testando Webhooks Localmente

```bash
# Instale e faça login na Stripe CLI
stripe login

# Encaminhe webhooks para seu servidor local
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copie o `whsec_...` gerado para seu `.env.local`.

## 🖼 Adicionando Produtos

Edite o arquivo `src/data/products.ts`:

```typescript
{
  id: 'print-01',
  title: 'Nome da Obra',
  description: 'Descrição...',
  image: '/images/nome-da-obra.jpg',
  priceId: 'price_STRIPE_ID',
  price: 100.00,
  currency: 'EUR',
  creativeHubSettings: {
    sku: 'CREATIVEHUB_FILE_ID',
    paperId: 'Hahnemühle Photo Rag 308',
    size: 'A3'
  }
}
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Atualize `NEXT_PUBLIC_BASE_URL` para seu domínio
4. Configure o webhook de produção no Stripe Dashboard

### Webhook de Produção

No Stripe Dashboard:
1. Developers → Webhooks → Add endpoint
2. URL: `https://seu-dominio.com/api/webhooks/stripe`
3. Eventos: `checkout.session.completed`

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts      # Cria sessão Stripe
│   │   └── webhooks/stripe/route.ts # Recebe eventos Stripe
│   ├── cart/page.tsx
│   ├── product/[id]/page.tsx
│   ├── success/page.tsx
│   ├── canceled/page.tsx
│   └── page.tsx                   # Homepage
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── AddToCartButton.tsx
├── context/
│   └── CartContext.tsx            # Estado global do carrinho
├── data/
│   └── products.ts                # Catálogo de produtos
├── lib/
│   ├── stripe.ts                  # SDK Stripe
│   └── creativehub.ts             # API CreativeHub
└── types/
    └── index.ts                   # TypeScript interfaces
```

## 📄 Licença

Projeto desenvolvido para uso comercial exclusivo de Sara Latif Art Gallery.
