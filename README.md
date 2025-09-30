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

- Next.js
- TypeScript
- Tailwind CSS
- Stripe
- Shadcn UI
- Zod (for form validations)

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

## Screenshots:

Main - Index             |  Main - Details Page
:-------------------------:|:-------------------------:
![Index page](readme/main/index.png)  |  ![Details Page](readme/main/image.png)

Main - Product List             |  Admin - Product List
:-------------------------:|:-------------------------:
![Product List](readme/main/product-list.png) | ![Admin - Product List](readme/admin/list.png)

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
