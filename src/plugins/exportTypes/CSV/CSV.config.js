export default {
	exportTypeName: "CSV",
	schema: {
		"title": "CSV",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"delimiter": {
				"type": "string"
			},
			"eol": {
				"enum": ["Windows", "Unix", "Mac"]
			}
		},
		"required": ["delimiter"]
	}
};
