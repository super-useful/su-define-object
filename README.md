# su-define-object

Build trees of ES5 property objects with hasOne/hasMany relationships.
Properties can have basic types: string|number|boolean etc.
Properties can have custom setters.
Objects extend EventEmitter.


## Dependencies

node v0.11.12

## Tests

`npm install -d`
`npm test`

## Usage

```
var define = require('su-define-object');


var Tree = define('Tree', {

  properties: [
    {
      species: {
        enumerable: true,
        type: 'string'
      }
    }
  ],

  hasOne: {
    trunk: define('Trunk', {
      properties: [
        {
          diameter: {
            enumerable: true,
            type: 'number'
          }
        }
      ]
    }),
    rootSystem: define('RootSystem', {
      properties: [
        {
          systemType: {
            enumerable: true,
            type: 'string'
          }
        }
      ]
    });
  },

  hasMany: {
    branches: define('Branch', {
      properties: [
        {
          leaves: {
            enumerable: true,
            type: 'number'
          }
        }
      ]
    })
  }

})
```
