// Fleshed-out project/index.json file
{

  "project": {
    // theme info
    "theme": {
      // ordered index of theme components, from /theme/index.json
      "components": [
        // from /theme/SUI/index.json
        // standard components -- because these are part of the theme, they're pulled into the global namespace
        { "path":"SUI/",
          "globalize":true,
          "components":{
            "Button": { "modified": "<date>" },
            "Form": { "modified": "<date>" },
            "Menu": { "modified": "<date>" },
            "etc": { "modified": "<date>" },
          }
        },
    },

    // info about the project itself, from /project/info.json
    "info": {
      "id": "ModelSociety",
      // necessary to have title broken out for visual indexes, open dialog, etc
      "title": "Model Society",
      // latest mod date of all project resources (info.json, data.json, project.jsx, etc)
      // NOTE: this does NOT include mod dates of any nested (stack, etc) resources
      "modified": "<date>",
      // ordered index of stacks
      "stacks": ["explore", "about"],

      // Project templates (order doesn't matter)
      "templates": {
        "main" : { "modified": "<date>" }
      }
    },

    // ordered index of global project components, from /project/components/index.json
    "components": [
      // from /project/components/MeteorImages/index.json, a nested npm package of components
      // NOTE: these are NOT accessible from global namespace!  eg: use  `<MeteorImages.ImageThumb/>`
      { "path":"MeteorImages/",
        "components": [
          { "path": "ImageThumb", "modified": "<date>" },
          { "path": "ImageListViewer", "modified": "<date>" }
          { "path": "FilterSelector", "modified": "<date>" }
          { "path": "SortSelector", "modified": "<date>" }
        ]
      },

      // components which are sitting loose in the /project/components folder, created by the project author
      { "path": "ProjectFooter", "modified": "<date>" },
      { "path": "ProjectHeader", "modified": "<date>" }
    ],


    // stack index, from /stacks/index.json
    "stacks": {
      // "images" stack data
      "explore": {
        // from /stacks/explore/info.json
        "info": {
          "id": "explore",
          "title": "Explore",
          "modified": "<date>"
          "cards": [ "images", "collaborations" ]
        },
        // components map
        "components": [
          { "path":"StackHeader", "modified": "<date>" }
        ],
        // card info map
        "cards": {
          // "images" card data
          "images": {
            // derived from /stacks/explore/cards/images/card.jsx
            "info": {
              "id": "images",
              "template": "main",
              "title": "Explore Images",
              "modified": "<date>"
            }
          },
          // "collaborations" card data
          "collaborations": {
            // from /stacks/explore/cards/collaborations/card.jsx
            "info": {
              "id": "collaborations",
              "template": "main",
              "title": "Explore Collaborations",
              "modified": "<date>"
            }
          }
        }
      },

      // "about" stack data
      "about": {
        // from /stacks/about/info.json
        "info": {
          "title": "About Model Society",
          "modified": "<date>",
          // card index, from /stacks/about/index.json
          "cards": [ "mission", "why-join", "products", "team", "join-us" ],
          // stack templates
          "templates": {
            "main" : { "modified": "<date>" }
          },
        },
        // stack components, from /stacks/about/components/index.json
        "components": [
          { "path":"StackHeader", "modified": "<date>" }
        ],
        // card info map
        "cards": {
          "mission": { /* info, components, etc for card */ },
          "why-join": { /* info, components, etc for card */ },
          "products": { /* info, components, etc for card */ },
          "team": { /* info, components, etc for card */ },
          "join-us": { /* info, components, etc for card */ },
        }
      }
    }
  }
}
