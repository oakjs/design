// Fleshed-out project/index.json file
{

  "project": {
    // theme info
    "theme": {
      // ordered index of theme components, from /theme/index.json
      "components": [
        // from /theme/SUI/index.json
        // standard components -- because these are part of the theme, they're pulled into the global namespace
        { "path":"SUI/", "globalize":true, "components":["Button","Menu","Toolbar","etc"] },
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
      "index": ["explore", "about"],
    },

    // ordered index of global project components, from /project/components/index.json
    "components": [
      // from /project/components/MeteorImages/index.json, a nested npm package of components
      // NOTE: these are NOT accessible from global namespace!  eg: use  `<MeteorImages.ImageThumb/>`
      { "path":"MeteorImages/", "components":["ImageThumb", "ImageListViewer", "FilterSelector", "SortSelector" ] }

      // components which are sitting loose in the /project/components folder, created by the project author
      "ProjectFooter",
      "ProjectHeader"
    ],

    // Project templates
    "templates": [ "main" ]

    // stack index, from /stacks/index.json
    "stacks": {
      // "images" stack data
      "explore": {
        // from /stacks/explore/info.json
        "info": {
          // note: we assume the id
          "title": "Explore",
          "modified": "<date>"
          "index": [ "images", "collaborations" ]
        },
        // components map
        "components": [ "StackHeader" ],
        // card info map
        "cards": {
          // "images" card data
          "images": {
            // derived from /stacks/explore/cards/images/card.jsx
            "info": {
              "template": "main",
              "title": "Explore Images",
              "modified": "<date>"
            }
          },
          // "collaborators" card data
          "collaborations": {
            // from /stacks/explore/cards/collaborations/card.jsx
            "info": {
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
          "modified": "<date>"
        },
        // stack components, from /stacks/about/components/index.json
        "components": [ "StackHeader" ],
        // stack templates
        "templates": [ "about" ]
        // card index, from /stacks/about/index.json
        "index": { "order": [ "mission", "why-join", "products", "team", "join-us" ] },
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
