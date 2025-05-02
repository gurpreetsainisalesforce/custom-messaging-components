import { api, LightningElement, track } from "lwc";

export default class CommerceProductDetails extends LightningElement {
    @api product = {};

    get productImageLinks() {
        let imageLinks = [];
        Object.keys(this.product?.images).forEach(key => {
            this.product.images[key].forEach(image => {
                imageLinks.push(image);
            });
        });
        return imageLinks;
    }

    renderedCallback() {
        let style = document.createElement('style');
        style.innerText = `.slds-carousel__content {
            display: none;
        }
        .slds-carousel__indicator-action {
            width: 0.5rem;
            height: 0.5rem;
            background: var(--slds-g-color-neutral-base-80, #fff);
            border: none;
            border-radius: 50%;
        }
        .slds-carousel__indicator-action:hover {
            background-color: var(--slds-g-color-neutral-base-65, #fff);
        }
        .slds-carousel__indicator-action.slds-is-active, .slds-carousel__indicator-action.slds-is-active:hover {
            background: var(--slds-g-color-neutral-base-10,#000);
            border-color: var(--slds-g-color-neutral-base-10,#000);
        }`;
        this.template.querySelector('lightning-carousel').appendChild(style);
    }

    handleAddToCart() {
        const product = this.product.title;
        const color = this.product.selectedColorName;
        if (product) {
            this.dispatchEvent(new CustomEvent('addtocart', {
                detail: { product, color }
            }));
        }
    }
}