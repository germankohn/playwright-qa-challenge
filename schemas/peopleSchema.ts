const peopleSchema = {
    type: 'object',
    properties: {
      message: { type: 'string' },
      total_records: { type: 'number' },
      total_pages: { type: 'number' },
      previous: { type: ['string', 'null'] },
      next: { type: ['string', 'null'] },
      results: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            uid: { type: 'string' },
            name: { type: 'string' },
            url: { type: 'string', format: 'uri' },
          },
          required: ['uid', 'name', 'url'],
        },
      },
      apiVersion: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
      support: {
        type: 'object',
        properties: {
          contact: { type: 'string', format: 'email' },
          donate: { type: 'string', format: 'uri' },
          partnerDiscounts: {
            type: 'object',
            properties: {
              saberMasters: {
                type: 'object',
                properties: {
                  link: { type: 'string', format: 'uri' },
                  details: { type: 'string' },
                },
                required: ['link', 'details'],
              },
            },
          },
        },
        required: ['contact', 'donate', 'partnerDiscounts'],
      },
      social: {
        type: 'object',
        properties: {
          discord: { type: 'string', format: 'uri' },
          reddit: { type: 'string', format: 'uri' },
          github: { type: 'string', format: 'uri' },
        },
        required: ['discord', 'reddit', 'github'],
      },
    },
    required: [
      'message',
      'total_records',
      'total_pages',
      'previous',
      'next',
      'results',
      'apiVersion',
      'timestamp',
      'support',
      'social',
    ],
  };
  
  export default peopleSchema;
  