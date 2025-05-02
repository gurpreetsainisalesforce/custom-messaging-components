import { createElement } from 'lwc';
import CommerceProductDetails from 'c/commerceProductDetails';

const mockProduct = {
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
    price: '$139.00',
    selectedColorName: 'Black'
};

describe('c-commerce-product-details', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders product title, description, price, and features', () => {
        const element = createElement('c-commerce-product-details', {
            is: CommerceProductDetails
        });
        element.product = mockProduct;
        document.body.appendChild(element);

        // Title
        const title = element.shadowRoot.querySelector('.product-title');
        expect(title).not.toBeNull();
        expect(title.value).toBe(mockProduct.title);

        // Description
        const description = element.shadowRoot.querySelector('.product-description');
        expect(description).not.toBeNull();
        expect(description.value).toBe(mockProduct.description);

        // Price
        const price = element.shadowRoot.querySelector('.product-price');
        expect(price).not.toBeNull();
        expect(price.value).toBe(mockProduct.price);

        // Features
        const features = element.shadowRoot.querySelectorAll('.product-feature');
        expect(features.length).toBe(mockProduct.features.length);
        features.forEach((feature, idx) => {
            expect(feature.value).toBe(mockProduct.features[idx]);
        });
    });

    it('renders all product images in the carousel', () => {
        const element = createElement('c-commerce-product-details', {
            is: CommerceProductDetails
        });
        element.product = mockProduct;
        document.body.appendChild(element);

        // The getter flattens all images
        const expectedImageCount = Object.values(mockProduct.images).reduce((acc, arr) => acc + arr.length, 0);
        const images = element.shadowRoot.querySelectorAll('lightning-carousel-image');
        expect(images.length).toBe(expectedImageCount);
    });

    it('fires addtocart event with product and color when Add to Cart is clicked', () => {
        const element = createElement('c-commerce-product-details', {
            is: CommerceProductDetails
        });
        element.product = mockProduct;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('addtocart', handler);

        const button = element.shadowRoot.querySelector('lightning-button');
        button.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.product).toBe(mockProduct.title);
        expect(handler.mock.calls[0][0].detail.color).toBe(mockProduct.selectedColorName);
    });
});