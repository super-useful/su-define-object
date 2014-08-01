/**
  @description  detection and comparison
  @note         the parameter signature of type then value might seem a little
                backward; but is done this way to allow easy partial application as js binds
                parameters from left to right
                var isFunc = partial(typeOf, "function")
                isFunc(function() {});
*/



/**
  @description  test to see if a value is a specific type
  @param        {object|string} type
  @param        {any} value
  @return       boolean
*/
function typeOf(type, value) {

  if (eq(type, "null") && eq(value, null)) return true;
  if (eq(typeof value, type)) return true;
  if (eq(type, "array")) type = Array.prototype;
  if (eq(type, "date")) type = Date.prototype;
  if (eq(type, "string")) type = String.prototype;
  if (eq(type, "number")) type = Number.prototype;
  if (type.isPrototypeOf(value)) return true;
  if (eq(type, "generator") && value.constructor.name === 'GeneratorFunction') return true;
  if (typeof type === 'function' &&  value instanceof type) return true;

  return false;

}


/**
  @description  type enforcement throws an error if type is incorrect
  @param        {object|string} type
  @param        {any} value
  @return       value
*/
function enforce(type, value) {

  if (!typeOf(type, value)) throw new TypeError(value + " is not of correct type: " + type);

  return value;
}


function eq(a, b) {
  return a === b;
}

function neq(a, b) {
  return a !== b;
}

function hasOwnKeyOfValue(key, value, object) {
  return hasOwnKey(key, object) && hasKeyOfValue(key, value, object);
}


function hasKeyOfValue(key, value, object) {
  return eq(object[key], value);
}

function hasOwnKey(key, object) {
  return object.hasOwnProperty(key);
}

function hasKey(key, object) {
  return (key in object);
}


exports.enforce          = enforce;
exports.typeOf           = typeOf;
exports.eq               = eq;
exports.neq              = neq;
exports.hasKey           = hasKey;
exports.hasOwnKey        = hasOwnKey;
exports.hasKeyOfValue    = hasKeyOfValue;
exports.hasOwnKeyOfValue = hasOwnKeyOfValue;
