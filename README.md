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


//  create an nested object constructor

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


//  instantiate a nested instance

var oak = new Tree({
  species: "Oak",
  trunk: {
    diameter: 10
  },
  rootSystem: {
    systemType: "Tap root"
  },
  branches: [
    {leaves: 10},
    {leaves: 20},
    {leaves: 30},
    {leaves: 40},
    {leaves: 50}
  ]
});


oak.branches[2].leaves // -> 30


//  instantiate an instance with no relations

var birch = new Tree({
  species: "Silver birch",
  trunk: {
    diameter: 5
  }
});


birch.branches[2].leaves // -> undefined


//  instantiating an instance with incorrect types will throw an array
//  of *all* the errors that occured during instantiation

try {

  var elm = new Tree({
    species: 10,
    trunk: {
      diameter: "Elm"
    }
  })

}
catch (e) {

  e.length // => 2

  e[0] instanceof TypeError // => true
  e[1] instanceof TypeError // => true
}



```
