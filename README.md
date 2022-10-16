# La Coco Crypto Exchange

A crypto converter that supported BTC, ETH, USDT, DFI, DOGE. Using [CoinGecko API](https://www.coingecko.com/en/api/documentation) for the price.

# Documentation

- [Live Demo](https://lacoco-crypto-converter.netlify.app/)
- [Development](#development)
- [Testing](#testing)

# Development

## Initial Setup

##### Install all dependencies for Nextjs App

```bash
npm: npm install
yarn: yarn install
```

## Running App

##### Running app in development enviroment

```bash
npm: npm run dev
yarn: yarn dev
```

## Project Structure

```txt
crypto-converter/
├─ src/
│  ├─ components/
│  │  └─ CurrentPrice.tsx
│  │  └─ ExchangeRate.tsx
│  ├─ pages/
│  ├─ store/
│  ├─ styles/
│  ├─ utils/
│  │  └─ types.ts
└─ cypress/
```

| Directory          | Description                                   |
| ------------------ | --------------------------------------------- |
| `/src/components`  | Main components to supported the app features |
| `/src/pages`       | Frontend Pages                                |
| `/src/store`       | Global State                                  |
| `/src/styles`      | Global styles with tailwind imported          |
| `/src/utils/types` | Define reusable typescript types              |
| `/cypress`         | E2E testing                                   |

# Testing

Using [Cypress](https://www.cypress.io/) for e2e testing.

```bash
npm: npm run cypress
yarn: yarn cypress
```

Currently there is only 1 test script under `/cypress/e2e/home.cy.ts`.
Test result cover:

- Display Store name
- Display date/time
- Is support BTC, ETH, USDT, DFI, DOGE
- Switch currency
- Selected input #1 value cannot be select on input #2, via versa
