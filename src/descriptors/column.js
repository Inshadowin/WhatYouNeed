//import { renderDictionaryValueByIdLoader, renderDictionaryValueByNameLoader } from './helpers/defaultRenderFunctions';
import React from "react";

import wynDate from './wynDate';
import globals from './globals';
import { filterTypes } from './filtering/filtering';
import { conditions } from '../../funcs_conditions/index';
const { attributeTypes } = conditions;
const dateFormats = globals.dateFormats

//дефолтні поля для колонки
class DefaultColumn {
    constructor({ constants = {} } = {}) {
        this.canSort = true;
        // this.ellipsis = true;
        this.isVisible = true;
        this.hasTooltip = true;
        this.forDataFetch = true;

        const defConstants = {
            serverFormat: dateFormats.serverFormat,

            viewDateTimeFormat: dateFormats.viewDateTimeFormat,
            viewDateFormat: dateFormats.viewDateFormat,
            viewTimeFormat: dateFormats.viewTimeFormat,

            emptyContent: ''
        }

        this.const = {
            ...defConstants,
            ...constants
        }
    }
}

const defaultRenderMethod = (value, item, index) => value;

/**
 * клас для генерації інформації про динамічне поле данних
 */
export default class Column extends DefaultColumn {
    //renderMethod з конструктора - це дефолтний метод, який буде використаний для рендера
    //він буде перевизначений для специфічних типів колонок, тому якщо хочете 100% мати власний метод - використовуйте withRenderMethod
    constructor(key, name, title, renderMethod = defaultRenderMethod, props = {}) {
        super(props);

        this.key = key;
        this.name = name;
        this.title = title;
        //this.mappingName = name;
        this.renderMethod = renderMethod;
        this.defaultRenderMethod = renderMethod;
    }

    /**
     * функція локалізовує колонку
     * @param {string} language - мова
     */
    localizeColumn(language) {
        if (typeof this.title === 'object') {
            this.title = this.title[language] && this.title[language] || this.title[0] || this.name;

            return this;
        }
        if (typeof this.title === 'function') {
            this.title = this.title(language);

            return this;
        }
    }

    /**
     * функція валідує поточний набір даних для поля
     * використання не обовязкове, але бажане для уникнення неконсистентності
     * можна викликати в кінці конструювання для перевірки коректності побудови
     */
    withDataStructureCheck() {
        if (!this.name) {
            console.warn(`Column name is not defined`);
        }
        if (typeof this.name !== 'string') {
            console.warn(`Column name is not of string type. Column: `, this);
        }
        if (this.type === attributeTypes.dictionary && !this.dictionaryId && !this.dictionaryName) {
            console.warn(`Column: '${this.name || 'Not defined name'}' is marked as dictionary, but has no 'dictionaryId'/'dictionaryName' defined. Can't render add/edit/view field`);
        }
        if ((this.dictionaryId || this.dictionaryName) && this.type !== attributeTypes.dictionary) {
            console.warn(`Column: '${this.name || 'Not defined name'}' is marked as '${this.type}', but has 'dictionaryId'/'dictionaryName' defined`);
        }
        if (this.type === attributeTypes.entity && !this.entityName) {
            console.warn(`Column: '${this.name || 'Not defined name'}' is marked as 'entity', but has no 'entityName' defined`);
        }
        if (this.entityName && this.type !== attributeTypes.entity) {
            console.warn(`Column: '${this.name || 'Not defined name'}' is marked as '${this.type}', but has 'entityName' defined`);
        }
        if (this.mappingName && !this.entityName && this.type === attributeTypes.entity) {
            console.warn(`Column: '${this.name || 'Not defined name'}' has no entityName defined. mappingName: '${this.mappingName}'. Can't render add/edit field`);
        }
        if (this.entityName && !this.mappingName) {
            console.warn(`Column: '${this.name || 'Not defined name'}' has no mappingName defined. entityName: '${this.entityName}'. Can't render view field`);
        }
        if (this.additionalParams && this.additionalParams.filterOptions) {
            const { filterOptions } = this.additionalParams;

            if (!Array.isArray(filterOptions) || !filterOptions.length) {
                console.warn(`Column: '${this.name || 'Not defined name'}' has no filterOptions`);
            }
            if (filterOptions.some(({ value, label }) => value === undefined || label === undefined ||
                typeof value !== 'number' && typeof value !== 'string' ||
                typeof label !== 'number' && typeof label !== 'string')) {
                console.error(`Column: '${this.name || 'Not defined name'}' fatal error. 'filterOptions' must be {value, label} objects. value, label of ['number', 'string'] type`);
            }
        }
        return this;
    }
    /**
     * Функція встановлює те, що відображатиметься при відсутності значення поля
     * @param {any} emptyContent - контент порожньої колонки
    */
    withEmptyContent(emptyContent) {
        this.const.emptyContent = emptyContent;

        return this;
    }
    /**
    * Функція встановлює колонки, які вкладені в колонку
    * @param {Array} children - вкладені колонки
   */
    withChildren(children) {
        Array.isArray(children) && (this.children = children) || delete this.children;

        return this;
    }
    /**
     * Функція встановлює метод, яким генеруватиметься контент для колонки
     * @param {function} renderMethod - метод рендера колонки
    */
    withRenderMethod(renderMethod) {
        if (renderMethod) {
            this.renderMethod = renderMethod;
        }
        return this;
    }
    /**
     * Функція встановлює методи, яким декоруватиметься контент колонки
     * @param {function} renderMethod - метод декорації контенту колонки
    */
    withRenderMethodDecorators(...renderMethodDecorators) {
        if (renderMethodDecorators && renderMethodDecorators.length) {
            this.renderMethodDecorators = renderMethodDecorators;
            return this;
        }

        delete this.renderMethodDecorators;
        return this;
    }
    /**
     * Функція встановлює метод, яким генеруватиметься контент тултіпа для колонки
     * @param {function} renderTooltip - метод рендера контента тултіпа
    */
    withCustomTooltipRender(renderTooltip) {
        return this.withTooltip(renderTooltip);
    }

    /**
     * Функція встановлює метод, яким генеруватиметься контент для поля вводу на формі
     * @param {function} renderInput - метод рендера поля
    */
    withRenderInput(renderInput) {
        if (renderInput) {
            this.renderInput = renderInput;
        }
        return this;
    }
    withLoadDataForInput(loadData) {
        if (loadData) {
            this.loadData = loadData;
        }
        else {
            delete this.loadData;
        }
        return this;
    }
    /**
     * Функція встановлює тип колонки, відповідно до типу атрибута, яким є це поле
     * string, number, decimal, dictionary, etc. Міститься у енамі attributeTypes у conditions
     * @param {string} attributeType - назва колонки для фільтрації
    */
    withAttributeType(attributeType) {
        this.type = attributeType;

        //якщо юзер не перевизначив метод рендера
        if (this.type === attributeTypes.time && this.renderMethod === this.defaultRenderMethod) {
            const { serverFormat, viewTimeFormat } = this.const;

            const renderMethod = (value) => {
                if (!value) return this.const.emptyContent;

                const parsed = wynDate(value, serverFormat);
                return parsed.isValid() ? parsed.format(viewTimeFormat) : this.const.emptyContent;
            }
            return this.withRenderMethod(renderMethod)
        }
        //якщо юзер не перевизначив метод рендера
        if (this.type === attributeTypes.date && this.renderMethod === this.defaultRenderMethod) {
            const { serverFormat, viewDateFormat } = this.const;

            const renderMethod = (value) => {
                if (!value) return this.const.emptyContent;

                const parsed = wynDate(value, serverFormat);
                return parsed.isValid() ? parsed.format(viewDateFormat) : this.const.emptyContent;
            }
            return this.withRenderMethod(renderMethod)
        }
        //якщо юзер не перевизначив метод рендера
        if (this.type === attributeTypes.dateTime && this.renderMethod === this.defaultRenderMethod) {
            const { serverFormat, viewDateTimeFormat } = this.const;

            const renderMethod = (value) => {
                if (!value) return this.const.emptyContent;

                const parsed = wynDate(value, serverFormat);
                return parsed.isValid() ? parsed.format(viewDateTimeFormat) : this.const.emptyContent;
            }
            return this.withRenderMethod(renderMethod)
        }
        //якщо юзер не перевизначив метод рендера
        if (this.type === attributeTypes.bool && this.renderMethod === this.defaultRenderMethod) {
            const renderMethod = (value) => {
                if (value === null || value === undefined || value === '') return this.const.emptyContent;

                return value && globals.booleanViewTrue || globals.booleanViewFalse
            }

            return this.withRenderMethod(renderMethod)
        }

        return this;
    }
    /**
     * Функція встановлює енам для вибору значень
     * @param {Array} enumDescr - масив з описом варіантів енама
    */
    withEnum(enumDescr = []) {
        if (Array.isArray(enumDescr) &&
            enumDescr.length &&
            enumDescr.every &&
            enumDescr.every(({ value, title } = {}) => value !== null && value !== undefined && title)) {

            this.enumDescr = [...enumDescr];
        } else {
            delete this.enumDescr;
        }

        return this;
    }
    /**
     * Функція встановлює назву словника, що містить значення з цього поля
     * @param {string} dictionaryName - назва словника
    */
    withDictionaryName(dictionaryName) {
        dictionaryName && this.asDictionaryWithName(dictionaryName) || delete this.dictionaryName;

        // //якщо це словник, і юзер не перевизначив метод рендера - встановлюємо метод рендера словника
        // if (this.dictionaryName && this.renderMethod === this.defaultRenderMethod) {
        //     const renderMethod = (...params) => defaultRenderDictionaryValueByNameLoader(...params, this.dictionaryName);
        //     return this.withRenderMethod(renderMethod)
        // }
        return this;
    }
    /**
     * Функція встановлює номер словника, що містить значення з цього поля
     * @param {number} dictionaryId - номер словника
    */
    withDictionaryId(dictionaryId) {
        dictionaryId && this.asDictionaryWithId(dictionaryId) || delete this.dictionaryId;

        // //якщо це словник, і юзер не перевизначив метод рендера - встановлюємо метод рендера словника
        // if (this.dictionaryId && this.renderMethod === this.defaultRenderMethod) {
        //     const renderMethod = (...params) => defaultRenderDictionaryValueByIdLoader(...params, this.dictionaryId);
        //     return this.withRenderMethod(renderMethod)
        // }
        return this;
    }
    withDictionaryTreeLevels(...dictionaryTreeLevels) {
        if (dictionaryTreeLevels && !Array.isArray(dictionaryTreeLevels) && !Array.isArray(dictionaryTreeLevels.flat(Infinity))) {
            console.warn('Column', `${this.name || 'Not defined name'}`, 'dictionaryTreeLevels is not an Array. Recieved', dictionaryTreeLevels);
            return this;
        }
        dictionaryTreeLevels && (this.dictionaryTreeLevels = [...dictionaryTreeLevels].flat(Infinity)) || delete this.dictionaryTreeLevels;

        return this;
    }
    /**
     * Функція встановлює назву колонки для фільтрації по ній
     * @param {string} mappingName - назва колонки для фільтрації
    */
    withMappingName(mappingName) {
        this.mappingName = mappingName;
        return this;
    }
    /**
     * Функція встановлює назву сутності, якою є це поле
     * @param {number} entityName - номер словника
    */
    withEntityName(entityName) {
        entityName && (this.entityName = entityName) || delete this.entityName;

        //TODO: special render method
        return this;
    }
    /**
     * Функція встановлює параметри пошуку сутності для її вибору
     * 
     * Дефолти:
     * attributesForSearch = ['name'],
     * attributesForSelect = ['id', 'name'],
     * formatData = (data) => defaultFormatData(data),
     * pagingSize = 20
     * 
     * @param {Object} entitySearchParams - параметри пошуку:
     * @param {Array} attributesForSearch - список назв полів, по яким шукаємо
     * @param {Array} attributesForSelect - список назв полів, які вибираємо
     * @param {func} formatData - функція, яка формує текст для виводу
     * @param {number} pagingSize - розмір вибірки пошуку
    */
    withEntitySearchParams(entitySearchParams) {
        entitySearchParams && (this.entitySearchParams) || delete this.entitySearchParams

        return this;
    }
    /**
     * Функція встановлює параметри для колонки AS IS
     * використовуйте лише, якщо знаєте які параметри колонки чому відповідають
     * @param {Object} params - об'єкт з параметрами
    */
    withPrimaryParams(params = {}) {
        for (const key in params) {
            const value = params[key];
            this[key] = value;
        }
        return this;
    }
    /**
     * Функція встановлює параметр "додаткові параметри" для поля. 
     * тут міститься будь-яка інформація, що не повинна перетинатися з набором основних параметрів
     * @param {Object} additionalParams - об'єкт з додатковими параметрами
    */
    withAdditionalParams(additionalParams = {}) {
        if (!additionalParams) return this.withAdditionalParams({});

        this.additionalParams = additionalParams;
        //обробка особливих фільтрів
        const { filter, filterOptions } = this.additionalParams;
        if (filter === filterTypes.boolean && (!filterOptions || !filterOptions.length)) {
            this.additionalParams.filterOptions = globals.booleanSelectOptions;
        }

        return this;
    }

    /**
     * встановлення функції, яка формує текст для пошукового тега
     * @param {function} formatter - функція, яка формує текст для пошукового тега
    */
    withFilterFormatter(formatter) {
        if (formatter && typeof formatter === 'function') {
            this.filterFormatter = formatter;

            return this;
        }

        delete this.filterFormatter;
        return this;
    }

    /**
     * встановлення функції, яка формує умови фільтрації для колонки
     * @param {function} conditionFunction - функція, яка формує умови фільтрації для колонки
    */
    withFilterConditionFunction(conditionFunction) {
        if (conditionFunction && typeof conditionFunction === 'function') {
            this.conditionFunction = conditionFunction;

            return this;
        }

        delete this.conditionFunction;

        return this;
    }

    /**
     * встановлення полів даних, які треба вибрати для цеї колонки
     * @param {Array} attributesToSelect 
     */
    withAttributesToSelect(...attributesToSelect) {
        const attributesToSelectFlat = attributesToSelect.flat(Infinity);
        if (attributesToSelectFlat && Array.isArray(attributesToSelectFlat) && attributesToSelectFlat.length) {
            this.attributesToSelect = attributesToSelectFlat;

            return this;
        }

        delete this.attributesToSelect;

        return this;
    }

    /**
     * Функція встановлює регулярний вираз для валідації значення поля
     * @param {string} regexp - регулярний вираз
    */
    withRegExp(regexp, regexpMessage = null) {
        this.regexp = regexp;
        regexpMessage && (this.regexpMessage = regexpMessage) || delete this.regexpMessage;
        return this;
    }
    /**
     * Функція встановлює мінімальну довжину для значення поля
     * @param {number} minLength - мінімальна довжина
    */
    withMinLength(minLength) {
        this.minLength = minLength;
        return this;
    }
    /**
     * Функція встановлює максимальну довжину для значення поля
     * @param {number} maxLength - максимальна довжина
    */
    withMaxLength(maxLength) {
        this.maxLength = maxLength;
        return this;
    }
    /**
     * Функція встановлює параметр "обовязкове для заповнення" для колонки
     * @param {boolean} isRequired - чи колонка обовязкова
    */
    withIsRequired(isRequired) {
        return isRequired && this.asRequired() || this.asNotRequired();
    }
    /**
     * Функція встановлює параметр "лише для читання" для колонки
     * @param {boolean} isReadonly - чи колонка лише для читання
    */
    withIsReadonly(isReadonly) {
        return isReadonly && this.asReadonly() || this.asNotReadonly();
    }
    /**
     * Функція встановлює параметр видимості для колонки
     * @param {boolean} isVisible - чи колонка видима
    */
    withIsVisible(isVisible) {
        return isVisible && this.asVisible() || this.asNotVisible();
    }
    /**
     * Функція встановлює параметр "системна" для колонки
     * @param {boolean} isVisible - чи колонка є системним полем
    */
    withIsSystem(isSystem) {
        return isSystem && this.asSystem() || this.asNotSystem();
    }
    /**
     * Функція встановлює додаткові параметри для Tooltip'a поля
     * @param {Object} tooltipParams - додаткові параметри для Tooltip
    */
    withTooltipParams(tooltipParams) {
        this.tooltipParams = tooltipParams;
        return this;
    }
    /**
     * Функція прибирає відображення тултіпа
    */
    withNoTooltip() {
        this.hasTooltip = false;
        return this;
    }
    /**
     * Функція додає відображення дефолтного тултіпа
     * @param {func} renderTooltip - функція для рендера тултіпа
    */
    withTooltip(renderTooltip) {
        this.hasTooltip = true;
        if (renderTooltip && typeof renderTooltip === 'function') {
            this.renderTooltip = renderTooltip;
        }
        return this;
    }
    /**
     * Функція встановлює функцію для сортування поля
     * @param {Function} sorterFunction - функція сортування для поля
    */
    withCustomSorter(sorterFunction) {
        this.canSort = sorterFunction;
        return this;
    }
    /**
     * Функція встановлює сортування для поля по замовчуванню
     * @param {string} defaultSortOrder - сортування по замовчуванню
    */
    withDefaultSortOrder(defaultSortOrder) {
        this.defaultSortOrder = defaultSortOrder;
        return this;
    }
    /**
     * Функція встановлює клас для колонки
     * @param {string} className - клас для колонки
    */
    withClassName(className) {
        this.className = className;
        return this;
    }
    /**
     * Функція встановлює ширину для колонки
     * @param {string number} width - ширина для колонки
    */
    withColumnWidth(width) {
        this.width = width;
        return this;
    }
    /**
     * Функція встановлює мінімальну ширину для колонки
     * @param {string number} minWidth - ширина для колонки
    */
    withColumnMinWidth(minWidth) {
        this.minWidth = minWidth;
        return this;
    }

    /**
     * Функція встановлює поле як словник з номером словника
     * @param {string} dictionaryName - номером словника
    */
    asDictionaryWithId(dictionaryId) {
        this.dictionaryId = dictionaryId;
        //для вибору данних
        this.mappingName = this.name + '.value';
        return this.withAttributeType(attributeTypes.dictionary);
    }
    /**
     * Функція встановлює поле як словник з назвою словника
     * @param {string} dictionaryName - назва словника
    */
    asDictionaryWithName(dictionaryName) {
        this.dictionaryName = dictionaryName;
        //для вибору данних
        this.mappingName = this.name + '.value';
        return this.withAttributeType(attributeTypes.dictionary);
    }

    /**
     * Функція позначає поле як "обовязкове для заповнення"
    */
    asRequired() {
        this.isRequired = true;
        return this;
    }
    /**
     * Функція позначає поле як "не обовязкове для заповнення"
    */
    asNotRequired() {
        this.isRequired = false;
        return this;
    }

    /**
     * Функція позначає поле як "лише для читання"
    */
    asReadonly() {
        this.isReadonly = true;
        return this;
    }
    /**
      * Функція позначає поле як "не лише для читання / доступне для зміни юзером"
    */
    asNotReadonly() {
        this.isReadonly = false;
        return this;
    }

    /**
     * Функція позначає поле як "видиме"
    */
    asVisible() {
        this.isVisible = true
        return this;
    }
    /**
    * Функція позначає поле як "невидиме"
    */
    asNotVisible() {
        this.isVisible = false
        return this;
    }

    /**
     * Функція позначає поле як "системне"
    */
    asSystem() {
        this.isSystem = true;
        return this;
    }
    /**
     * Функція позначає поле як "не системне / користувацьке"
    */
    asNotSystem() {
        this.isSystem = false;
        return this;
    }

    /**
     * Функція позначає поле як "доступне для сортування"
    */
    asSortable() {
        this.canSort = true;
        return this;
    }
    /**
     * Функція позначає поле як "не доступне для сортування / без сортування"
    */
    asNotSortable() {
        this.canSort = false;
        return this;
    }

    /**
     * Функція позначає поле як "поле, по якому вибиратимуться дані з джерела даних"
    */
    asForDataFetch() {
        this.forDataFetch = true;
        return this;
    }
    /**
     * Функція позначає поле як "поле, по якому не вибиратимуться дані з джерела даних"
    */
    asNotForDataFetch() {
        this.forDataFetch = false;
        return this;
    }

    /**
     * Функція позначає поле як "багатострокове"
    */
    asMultiline() {
        this.isMultiline = true

        return this;
    }

    /**
     * Функція позначає поле як "однострокове"
    */
    asSingleline() {
        this.isMultiline = false

        return this;
    }

    clone() {
        return new Column().withPrimaryParams(this);
    }
};