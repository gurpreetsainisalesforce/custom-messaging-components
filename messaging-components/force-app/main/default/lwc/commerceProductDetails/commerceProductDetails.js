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
    
//    @track selectedColorIndex = 0;

    // connectedCallback() {
    //     // Ensure product.colors and selectedColorName are set up
    //     if (!this.product.colors) {
    //         this.product.colors = [
    //             { name: 'Brown', selected: true },
    //             { name: 'Tan', selected: false }
    //         ];
    //     }
    //     if (!this.product.selectedColorName) {
    //         this.product.selectedColorName = this.product.colors[0].name;
    //     }
    //     this.updateColorSelection();
    //     console.log('productDetails', this.product);
    // }

    // handleColorSelect(event) {
    //     const colorName = event.currentTarget.dataset.color;
    //     this.product.colors.forEach(color => {
    //         color.selected = (color.name === colorName);
    //     });
    //     this.product.selectedColorName = colorName;
    //     this.updateColorSelection();
    //     this.forceUpdate();
    // }

    // updateColorSelection() {
    //     // Ensure only one color is selected
    //     let found = false;
    //     this.product.colors.forEach((color, idx) => {
    //         if (color.selected && !found) {
    //             this.selectedColorIndex = idx;
    //             found = true;
    //         } else {
    //             color.selected = false;
    //         }
    //     });
    //     if (!found && this.product.colors.length > 0) {
    //         this.product.colors[0].selected = true;
    //         this.selectedColorIndex = 0;
    //         this.product.selectedColorName = this.product.colors[0].name;
    //     }
    // }

    // forceUpdate() {
    //     // Workaround to trigger reactivity
    //     this.product = { ...this.product };
    // }

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