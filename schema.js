export default (schema = {
  schema: [
    {
      name: 'Note',
      primaryKey: 'key',
      properties: {
        key: 'string',
        text: 'string',
        createdAt: 'date',
        report: { type: 'Report', optional: true }
      }
    },
    {
      name: 'Report',
      primaryKey: 'key',
      properties: {
        key: 'string',
        name: 'string',
        notes: { type: 'list', objectType: 'Note' }
      }
    }
  ]
});
