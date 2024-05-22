/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "pn13xpta05y0r8l",
    "created": "2024-05-14 08:21:29.728Z",
    "updated": "2024-05-14 08:21:29.728Z",
    "name": "catagories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kobfsxdj",
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
        "id": "6mpqw5pq",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pn13xpta05y0r8l");

  return dao.deleteCollection(collection);
})
