function join(templates: string[]) {
    if (!Array.isArray(templates)) {
        throw new Error(`Функция join ожидает массив, был передан ${typeof templates}`);
    }
    return templates.join('');
}

class Templator {
    private _template: string;
    constructor(template) {
        this._template = template;
    }

    compile(ctx) {
        const templateVariableRe = /\{\{(.*?)\}\}/g;
        let match = null;
        let result = this._template;

        while (match = templateVariableRe.exec(this._template)) {
            const variableName = match[1].trim();
            if (!variableName) {
                continue;
            }

            const data = ctx[variableName];

            if (Array.isArray(data)) {
                result = result.replace(new RegExp(match[0], 'gi'), join(data));
                continue
            }

            if (typeof data === 'function') {
                window[variableName] = data;
                result = result.replace(new RegExp(match[0], 'gi'), `window.${variableName}()`);
                continue
            }

            result = result.replace(new RegExp(match[0], 'gi'), data);
        }

        return result;
    }
}

export default Templator;