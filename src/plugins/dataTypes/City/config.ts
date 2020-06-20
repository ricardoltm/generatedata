import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
	name: 'City',
	fieldGroup: 'geo',
	fieldGroupOrder: 20,
	dependencies: ['Country', 'Region'],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			placeholder: {
				type: 'string'
			}
		},
		required: [
			'placeholder'
		]
	}
};

export default definition;
