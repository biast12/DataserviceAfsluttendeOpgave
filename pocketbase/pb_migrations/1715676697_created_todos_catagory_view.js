/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2dyvwd05vjgstda",
    "created": "2024-05-14 08:51:37.786Z",
    "updated": "2024-05-14 08:51:37.786Z",
    "name": "todos_catagory_view",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tzz6qblo",
        "name": "title",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 50,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "4gi2yyov",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 80,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "k1x5cmfx",
        "name": "done",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "smzqat2i",
        "name": "catagoryID",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "pn13xpta05y0r8l",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "8l7ybllg",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 50,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ndff8qet",
        "name": "icon",
        "type": "file",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [
            "image/png",
            "image/jpeg",
            "image/gif"
          ],
          "thumbs": [
            "50x50"
          ],
          "maxSelect": 1,
          "maxSize": 50000,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT todos.id, todos.title, todos.description, todos.done, catagories.id AS catagoryID, catagories.name, catagories.icon\nFROM todos\n  LEFT JOIN catagories on todos.catagory = catagories.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2dyvwd05vjgstda");

  return dao.deleteCollection(collection);
})
