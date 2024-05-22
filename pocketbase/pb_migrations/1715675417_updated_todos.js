/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3z2yn86yoicy4rm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "insnbnl9",
    "name": "catagory",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3z2yn86yoicy4rm")

  // remove
  collection.schema.removeField("insnbnl9")

  return dao.saveCollection(collection)
})
