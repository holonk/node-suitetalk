"use strict";
const _ = require('lodash')
const BaseObject = require("../../../baseObject");

class SearchField extends BaseObject {

    constructor() {
        super();
        this.field = undefined;
        this.operator = undefined;
        this.searchValue = undefined;
    }

    _getSoapType() {
        return `platformCommon:${this.field}`;
    }

    _getAttributes() {
        return {
            "operator": this.operator,
            "xsi:type": `${this._type}:${this._name}`,
        };
    }

    getNode() {

        const attributes = this._getAttributes();
        const type = this._getSoapType();

        if (!type) {
            throw new Error(`Invalid SOAP type ${type}`);
        }

        if (!this.field) {
            throw new Error("search criteria field not set");
        }

        if (!this.operator) {
            throw new Error("search criteria operator not set");
        }

        if (_.isNil(this.searchValue)) {
            throw new Error("search criteria searchValue not set");
        }

        const node = {};

        node[type] = {};

        if (attributes) {
            node[type]["$attributes"] = attributes;
        }

        if (_.isArray(this.searchValue)) {
            node[type] = this.searchValue.map(value => ({ $attributes: attributes, 'platformCore:searchValue': value }))
        } else {
            node[type]['platformCore:searchValue'] = this.searchValue
        }
        // node[type]["platformCore:searchValue"]["$attributes"] = {};
        // node[type]["platformCore:searchValue"]["$attributes"][this.field] = this.searchValue;

        return node;
    }
}

module.exports = SearchField;
