import EventBus from "../core/EventBus";
import Block, {ComponentProps} from "../core/Block";

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }
        try {
            // @ts-ignore
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }
    const result = path.split('.').reduceRight<Indexed>(
        (acc, key) => ({
            [key]: acc,
        }),
        value as any,
    );

    return merge(object as Indexed, result);
}

export type Indexed<T = unknown> = {
    [key in string]: T
};

export const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null;

export const isDeepEqual = (a: Indexed, b: Indexed): boolean => {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
        return false;
    }

    return aKeys.every((key: string) => {
        if (isObject(a[key]) || Array.isArray(a[key])) {
            if (isObject(b[key]) || Array.isArray(b[key])) {
                return isDeepEqual(a[key] as Indexed, b[key] as Indexed);
            }

            return false;
        }

        return a[key] === b[key];
    });
}

export enum StoreEvents {
    UPDATED = 'updated',
}

interface Todo {
    text: string;
    isDone: boolean;
}

export interface StoreType {
    todoList: Todo[];
    inputValue?: string;
}

class Store extends EventBus {
    private state: Indexed = {
        'todoList': [
            {
                text: 'Задача 1',
                isDone: false
            }, {
                text: 'Задача 2',
                isDone: false
            }, {
                text: 'Задача 3',
                isDone: false
            }, {
                text: 'Задача 4',
                isDone: false
            }, {
                text: 'Задача 5',
                isDone: false
            },
        ]
    };

    public getState() {
        return this.state;
    }

    public set(path: keyof StoreType, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.UPDATED);
    }

    public clearStore() {
        this.set('todoList', []);
    }
}
export const store = new Store();

export const connect = (mapStateToProps: (state: StoreType) => Record<string, unknown>) => (Component: typeof Block) => {
    let state: Record<string, unknown>;

    return class extends Component {
        constructor(props: ComponentProps) {
            state = mapStateToProps(store.getState() as unknown as StoreType);

            super({ ...props, ...state });

            store.on(StoreEvents.UPDATED, () => {
                const newState = mapStateToProps(store.getState() as unknown as StoreType);

                if (!isDeepEqual(state, newState)) {
                    this.setProps({ ...newState } as ComponentProps);
                }
            });
        }
    };
};