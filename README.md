webhose.io client in ES7
============================

An adaptation to the latest JS features of the official node client from [https://github.com/Webhose/webhoseio-nodejs](https://github.com/Webhose/webhoseio-nodejs) Credits to them for the original source and examples.

As a tangent, I have some thoughts about the overall process.



## Things I learned adapting a module to ES7

- Change upper-cased "functions" that create objects...

  ```javascript
  function Coord(x, y) {
  	this.x = x
    	this.y = y
  }
  ```

  ```javascript
  class Coord {
      constructor(x, y) {
          this.x = x
        	this.y = y
      }
  }
  ```

  ...to ES6 class constructors.

  ​

- Refactor anything you see as a `Whatever.protype.foo`  as a method `foo` in the class `Whatever`. See the presence of function prototypes as a hint to refactor it to a class that is easier to grok.

  ```javascript
  NumClass.prototoype.double = function(a) {
      return a * a
  }
  ```

  Change to:

  ```javascript
  class NumClass {
      double(a) {
          return a * a
      }
  }
  ```

  ​

- Try to transform `then` and `catch` to the ES7 async/await syntax. Remember to handle the errors in a try/catch block or by registering an error handler. Example:

  ```javascript
  const a = await getThis().catch(getErrorHandler)
  ...
  const getErrorHandler(err) =>
      console.log(err)
  ```

- Create and use default function params, this will clean up many `||` 's  in your code that no language apart from JavaScript abuses. Furthermore, the function signatures alone will offer more info to the users of your API or interface. Before:

  ```javascript
  function changeObjProp(obj, prop) {
      obj.prop = prop || 'default'
  }
  ```

  After:

  ```javascript
  function changeObjProp(obj, prop = 'default') {
      obj.prop = prop
  }
  ```



The overall experience of JavaScript has improved leaps and bounds in the latest releases. I find the code a lot clearer and it feels lighter to read. ES6/7 is proving to be one of my top languages.