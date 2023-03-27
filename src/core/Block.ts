import EventBus from "./EventBus";

enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}

interface Child {
    name: string;
    node: HTMLElement;
}

export interface ComponentProps {
    attributes?: Record<string, string>;
    className?: string;
    children?: any;
    child?: Child | HTMLElement | string;
    events?: Record<string, (...args: any) => void>;
    [key: string]: any;

}

export default class Block {
    _element = null;
    protected props: ComponentProps;
    private eventBus: () => EventBus;

    constructor(props = {}) {
        const eventBus = new EventBus();

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(EVENTS.INIT);
    }

    _registerEvents(eventBus) {
        eventBus.on(EVENTS.INIT, this.init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        this._element = this._createDocumentElement('div');
    }

    init() {
        this._createResources();

        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }

    componentDidMount() {}


    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        this._element.innerHTML = block;
    }

    render() {}

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: ComponentProps) {

        const self = this;

        return new Proxy(props, {
            set(target, prop, value) {
                target[prop] = value;
                self.eventBus().emit(EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty() {
                throw new Error('Отказано в доступе');
                return;
            },
        });
    }

    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}