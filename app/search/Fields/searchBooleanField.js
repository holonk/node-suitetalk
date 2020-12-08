"use strict";

const SearchField = require("./common/searchField");

class SearchBooleanField extends SearchField {

    constructor() {
        super();
        this._type = "platformCore";
        this._name = "SearchBooleanField";
    }

    _getAttributes() {
        return { "xsi:type": `${this._type}:${this._name}` };
    }

    getNode() {

        const attributes = this._getAttributes();
        const type = this._getSoapType();

        const node = {};

        node[type] = {};

        if (attributes) {
            node[type]["$attributes"] = attributes;
        }

        node[type]["platformCore:searchValue"] = this.searchValue;

        return node;
    }
}

module.exports = SearchBooleanField;
