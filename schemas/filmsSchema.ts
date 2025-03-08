const filmsSchema = {
    type: "object",
    properties: {
      message: { type: "string" },
      result: {
        type: "array",
        items: {
          type: "object",
          properties: {
            properties: {
              type: "object",
              properties: {
                created: { type: "string", format: "date-time" },
                edited: { type: "string", format: "date-time" },
                starships: {
                  type: "array",
                  items: { type: "string", format: "uri" }
                },
                vehicles: {
                  type: "array",
                  items: { type: "string", format: "uri" }
                },
                planets: {
                  type: "array",
                  items: { type: "string", format: "uri" }
                },
                producer: { type: "string" },
                title: { type: "string" },
                episode_id: { type: "integer" },
                director: { type: "string" },
                release_date: { type: "string", format: "date" },
                opening_crawl: { type: "string" },
                characters: {
                  type: "array",
                  items: { type: "string", format: "uri" }
                },
                species: {
                  type: "array",
                  items: { type: "string", format: "uri" }
                },
                url: { type: "string", format: "uri" }
              },
              required: [
                "created",
                "edited",
                "starships",
                "vehicles",
                "planets",
                "producer",
                "title",
                "episode_id",
                "director",
                "release_date",
                "opening_crawl",
                "characters",
                "species",
                "url"
              ]
            },
            _id: { type: "string" },
            description: { type: "string" },
            uid: { type: "string" },
            __v: { type: "integer" }
          },
          required: ["properties", "_id", "description", "uid", "__v"]
        }
      },
      apiVersion: { type: "string" },
      timestamp: { type: "string", format: "date-time" },
      support: {
        type: "object",
        properties: {
          contact: { type: "string" },
          donate: { type: "string", format: "uri" },
          partnerDiscounts: {
            type: "object",
            properties: {
              saberMasters: {
                type: "object",
                properties: {
                  link: { type: "string", format: "uri" },
                  details: { type: "string" }
                },
                required: ["link", "details"]
              }
            },
            required: ["saberMasters"]
          }
        },
        required: ["contact", "donate", "partnerDiscounts"]
      },
      social: {
        type: "object",
        properties: {
          discord: { type: "string", format: "uri" },
          reddit: { type: "string", format: "uri" },
          github: { type: "string", format: "uri" }
        },
        required: ["discord", "reddit", "github"]
      }
    },
    required: [
      "message",
      "result",
      "apiVersion",
      "timestamp",
      "support",
      "social"
    ]
  };
  
  export default filmsSchema;