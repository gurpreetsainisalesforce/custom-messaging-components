import { createElement } from 'lwc';
import CommerceProductDetails from 'c/commerceProductDetails';

const mockProductDetails = {
    title: 'Pleated Jacket',
    description: 'Time to update your assortment with this great suit jacket. You will love its easy fit and classic look.',
    images: {
      Black: [
        'https://www.phased-launch-testing.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dwc841dfa6/images/large/PG.10245334.JJ169XX.PZ.jpg',
        'https://www.phased-launch-testing.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dwc431d9a7/images/large/PG.10245334.JJ169XX.BZ.jpg'
      ],
      White: [
        'https://www.phased-launch-testing.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw7e687d4f/images/large/PG.10245334.JJI15XX.PZ.jpg',
        'https://www.phased-launch-testing.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw59f523a2/images/large/PG.10245334.JJI15XX.BZ.jpg'
      ]
    },
    features: [
      "Easy fit",
      "Classic look",
      "Great suit jacket"
    ],
    variations: {
      Color: ["Black", "White"],
      Size: ["4", "6", "8", "10", "12", "14", "16"]
    },
    price: '$139.00',
    productPageUrl: 'https://www.phased-launch-testing.com/pleated-jacket/25697499M.html?lang=default'
};

describe('c-commerce-product-details', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders product title, description, and price', () => {
        const element = createElement('c-commerce-product-details', {
            is: CommerceProductDetails
        });
        element.product = mockProduct;
        document.body.appendChild(element);

        expect(element.shadowRoot.querySelector('.product-title').textContent).toBe(mockProduct.title);
        expect(element.shadowRoot.querySelector('.product-description').textContent).toBe(mockProduct.description);
        expect(element.shadowRoot.querySelector('.product-price').textContent).toBe(mockProduct.price);
    });

    it('renders all product images in the carousel', () => {
        const element = createElement('c-commerce-product-details', {
            is: CommerceProductDetails
        });
        element.product = mockProduct;
        document.body.appendChild(element);

        const images = element.shadowRoot.querySelectorAll('lightning-carousel-image');
        expect(images.length).toBe(mockProduct.imageLinks.length);
    });

    it('renders color swatches and highlights the selected one', () => {
        const element = createElement('c-commerce-product-details', {
            is: CommerceProductDetails
        });
        element.product = mockProduct;
        document.body.appendChild(element);

        const swatches = element.shadowRoot.querySelectorAll('.color-swatch');
        expect(swatches.length).toBe(mockProduct.variations.Color.length);

        // Check if the selected swatch is correct
        const selected = Array.from(swatches).find(
            (swatch) => swatch.dataset.color === mockProduct.selectedColor
        );
        expect(selected).toBeDefined();
    });

    it('fires addtocart event with product and color when Add to Cart is clicked', () => {
        const element = createElement('c-commerce-product-details', {
            is: CommerceProductDetails
        });
        element.product = mockProduct;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('addtocart', handler);

        const button = element.shadowRoot.querySelector('button');
        button.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.product).toBe(mockProduct.title);
        expect(handler.mock.calls[0][0].detail.color).toBe(mockProduct.selectedColor);
    });

    it('updates selected color when a color swatch is clicked', async () => {
        const element = createElement('c-commerce-product-details', {
            is: CommerceProductDetails
        });
        element.product = JSON.parse(JSON.stringify(mockProduct));
        document.body.appendChild(element);

        // Simulate clicking the second color swatch
        const swatches = element.shadowRoot.querySelectorAll('.color-swatch');
        swatches[1].click();

        // Wait for re-render
        await Promise.resolve();

        // The selectedColor should now be the second color's name
        expect(element.product.selectedColor).toBe(mockProduct.variations.Color[1].name);
    });
});