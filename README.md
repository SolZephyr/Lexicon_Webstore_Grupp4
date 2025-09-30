# E-commerce Storefront

## Description

This project is an e-commerce storefront built with Next.js, TypeScript, and Tailwind CSS. It provides a user interface for browsing products, managing a shopping cart, and completing the checkout process. The application also includes an admin panel for managing products and other store configurations.

## Features

- **Product Catalog:** Browse products by category, filter by brand, price, and stock.
- **Product Details:** View detailed information about individual products, including reviews and specifications.
- **Shopping Cart:** Add products to a shopping cart, update quantities, and proceed to checkout.
- **Checkout:** Securely complete the checkout process with Stripe integration.
- **User Authentication:** Sign up, sign in, and manage user accounts.
- **Admin Panel:** Manage products, categories, and other store configurations (accessible to authorized users).
- **Contact Form:** Submit contact requests.

## Technologies Used

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Stripe
- Shadcn UI
- Zod (for form validations)
- Clerk

- API: Earlier iterations of the project were built upon the DummyJSON API. Later revisions depend on a cloned and revised version of the API with custom endpoints that deliver a extended datastructure that the original version did not support.

## Screenshots:

### Main

|                Index                 |              Details Page              |                 Product List                  |
| :----------------------------------: | :------------------------------------: | :-------------------------------------------: |
| ![Index page](readme/main/index.png) | ![Details Page](readme/main/image.png) | ![Product List](readme/main/product-list.png) |

### Admin

Product List
:-------------------------:
| ![Admin - Product List](readme/admin/list.png)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Install dependencies:**

    ```bash
    cd app
    npm install
    ```

3.  **Configure environment variables:**

    Create a `.env.local` file in the `app` directory and add the necessary environment variables (e.g., Stripe API keys, database connection string).

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
app/
├── src/
│   ├── app/             # Next.js routes
│   ├── components/      # React components
│   ├── lib/             # Utility functions and data
│   ├── styles/          # Global styles
├── next.config.js   # Next.js configuration
├── package.json       # Project dependencies
```

## Workflow

Projektet har utformats genom ett grupparbete med fyra medlemmar.

Arbetet har utförts i form av ett agilt projekt med SCRUM-struktur, varpå en KANBAN-bräda har används för att tilldela uppgifter mellan medlemmar. Projektet delades upp i veckolånga sprintar.

Projektet har utförts genom två branches: Dev och Main. Dev har fungerat som utvecklingsmiljö, och där har kod som fortfarande är under arbete landar. I slutet på varje sprint så skjuts det arbete som har genomförts under veckan mot Main-branchen för deployment.

Dagsstruktur:

Morgonmöte

Kort genomgång av genomfört och vad som ska genomföras av medlemmar.

Se över aktuella kort.
Analys och tankar för nya idéer hamnar i backlog.
Behövdes mer arbete att utföras förbereds kort i ready.

Uppdelning av prioriterade kort. Man tog dom kort man ville jobba på.

När deltagare har blivit tilldelade ett kort så öppnar de en feature-branch där de arbetar isolerat på problemet.

Eftermiddagsmöte
Under dagen så har vi kontinuerlig kommunikation och bestämmer en tid för ett eftermiddagsmöte.
Under det mötet så går vi igenom de pull requests som har samlats under dagen, och en person blir tilldelad rollen som Merge Master. För att en pull request ska kunna bli merge:ad till utvecklingsbranchen så krävs godkännanden av två övriga gruppmedlemmar, varpå Merge Master kan utföra det.

När alla PR har slutförts så sker samma process som under morgonmötet, alla deltagare går igenom de krav som finns på KANBAN-brädan och nya krav analyseras.

Se över aktuella kort.
…

Krav som har identifierats för projektet har delats upp i form av kort/issues, som varje gruppmedlem har tilldelat sig själv under morgonmöten.

## Sprint Planning

Projektet utfördes under tre veckolånga sprintar.

### Sprint 1

- Analys & Kravhantering

### Sprint 2

### Sprint 3

## Usage

- **Browsing Products:** Navigate to the `/products` page to view the product catalog. Use the sidebar filters to refine your search.
- **Viewing Product Details:** Click on a product card to view detailed information about the product.
- **Adding to Cart:** Click the "Add to Cart" button on the product details page to add the product to your shopping cart.
- **Checkout:** Click the cart icon in the header to view your shopping cart. Proceed to checkout to complete your purchase.
- **Admin Panel:** Access the admin panel at `/admin` (requires appropriate authentication).

## Contributing

Contributions are welcome! Please submit a pull request with your proposed changes.

## License

[MIT](LICENSE)
