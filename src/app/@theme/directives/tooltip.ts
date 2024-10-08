import {Directive, ElementRef, Renderer2, input, OnInit, inject, DestroyRef} from '@angular/core';

type Function = () => void;
type ActionType = 'hover' | 'click';

@Directive({
    selector: '[tooltip]',
    standalone:true
})
export class TooltipDirective implements OnInit{

    tooltip = input.required<string>();
    actionType = input<ActionType>('hover');
    iconSrc = input<string>("");
    hide = input<boolean, boolean>(false, {transform:value => {
        if(value)
            this.hideTooltip();
        return value;
    }});

    tooltipElement: HTMLElement;
    #el = inject(ElementRef);
    #renderer = inject(Renderer2);
    #listeners:Array<Function> = [];
    #destroyRef = inject(DestroyRef);
    #autoHideTimeoutPromise:any;

    ngOnInit()
    {
        if(this.actionType() === 'click')
        {
            this.#listeners.push(this.#renderer.listen(this.#el.nativeElement, 'click', (event) => {
                this.showTooltip(true);
            }));
        }
        else if(this.actionType() === 'hover')
        {
            this.#listeners.push(this.#renderer.listen(this.#el.nativeElement, 'mouseenter', (event) => {
                this.showTooltip();
            }));
            this.#listeners.push(this.#renderer.listen(this.#el.nativeElement, 'mouseleave', (event) => {
                this.hideTooltip();
            }));
        }
        this.#destroyRef.onDestroy(() => {
            this.#listeners.forEach(f => {
                f();
                f = null;
            });
        });
    }

    showTooltip(autoHide:boolean = false)
    {
        this.hideTooltip();
        const t = this.hide();
        if(this.hide())
            return;
        this.tooltipElement = this.#renderer.createElement('div');
        this.#renderer.setStyle(this.tooltipElement, 'display', 'inline-flex');
        this.#renderer.setStyle(this.tooltipElement, 'align-items', 'center');
        this.#renderer.setStyle(this.tooltipElement, 'gap', '10px');

        const textElement = this.#renderer.createText(this.tooltip());
        this.#renderer.appendChild(this.tooltipElement, textElement);

        if (this.iconSrc())
        {
            const iconElement = this.#renderer.createElement('img');
            this.#renderer.setAttribute(iconElement, 'src', this.iconSrc());
            this.#renderer.setStyle(iconElement, 'width', '16px');
            this.#renderer.setStyle(iconElement, 'height', '16px');
            this.#renderer.appendChild(this.tooltipElement, iconElement);
        }

        this.#renderer.appendChild(document.body, this.tooltipElement);

        this.#renderer.setStyle(this.tooltipElement, 'position', 'fixed');
        this.#renderer.setStyle(this.tooltipElement, 'background', '#FFFFFF');
        this.#renderer.setStyle(this.tooltipElement, 'color', '#000');
        this.#renderer.setStyle(this.tooltipElement, 'padding', '16px');
        this.#renderer.setStyle(this.tooltipElement, 'border-radius', '5px');
        this.#renderer.setStyle(this.tooltipElement, 'font-size', '14px');
        this.#renderer.setStyle(this.tooltipElement, 'z-index', '1000');

        const tail = this.#renderer.createElement('div');
        this.#renderer.setStyle(tail, 'width', '0');
        this.#renderer.setStyle(tail, 'height', '0');
        this.#renderer.setStyle(tail, 'border-left', '5px solid transparent');
        this.#renderer.setStyle(tail, 'border-right', '5px solid transparent');
        this.#renderer.setStyle(tail, 'border-top', '5px solid #fff');
        this.#renderer.setStyle(tail, 'position', 'absolute');
        this.#renderer.appendChild(this.tooltipElement, tail);

        const hostPos = this.#el.nativeElement.getBoundingClientRect();
        const tooltipPos = this.tooltipElement.getBoundingClientRect();

        const top = hostPos.top - tooltipPos.height - 10;
        const position = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        const left = Math.max(5, position);

        this.#renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
        this.#renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
        this.#renderer.setStyle(tail, 'top', `${tooltipPos.height}px`);
        this.#renderer.setStyle(tail, 'left', `${position > 0 ? tooltipPos.width / 2 - 5 :  hostPos.width / 2 - 5}px`);
        if(autoHide)
        {
            this.#clearAutoHideTimeout();
            this.#autoHideTimeoutPromise = setTimeout(() => {
                this.hideTooltip();
            }, 2000);
        }
    }

    hideTooltip()
    {
        if (this.tooltipElement)
        {
            this.#renderer.removeChild(document.body, this.tooltipElement);
            this.tooltipElement = null;
        }
    }
    #clearAutoHideTimeout()
    {
        if(this.#autoHideTimeoutPromise)
            clearTimeout(this.#autoHideTimeoutPromise);
    }
}