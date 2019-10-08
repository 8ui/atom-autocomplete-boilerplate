'use babel';

// data source is an array of objects
import suggestions from '../data/intermediate';

class IntermediateProvider {
	constructor() {
		// offer suggestions only when editing plain text or HTML files

		this.data = Object.keys(suggestions).map(function(n) {
			return {
				text: n,
				rightLabel: suggestions[n].hex
			}
		})
		this.selector = '.source.js';
	}

	getSuggestions(options) {
		const { prefix } = options;
		// only look for suggestions after 3 characters have been typed

		if (prefix.startsWith('colors')) {
			return this.findMatchingSuggestions(prefix.replace('colors', ''));
		}
	}

	findMatchingSuggestions(prefix) {
		// filter list of suggestions to those matching the prefix, case insensitive
		if (!prefix) return this.data.map(this.inflateSuggestion)

		let prefixLower = prefix.toLowerCase();
		let matchingSuggestions = this.data.filter((suggestion) => {
			let textLower = suggestion.text.toLowerCase();
			return textLower.includes(prefixLower);
		});

		// run each matching suggestion through inflateSuggestion() and return
		return matchingSuggestions.map(this.inflateSuggestion);
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(suggestion) {
		return {
			type: 'value',
			displayText: '.' + suggestion.text,
			snippet: 'colors.' + suggestion.text,
			rightLabel: suggestion.rightLabel,
			leftLabelHTML: '<i class="_label _label-' + suggestion.text + '"></i>'
		};
	}
}
export default new IntermediateProvider();
