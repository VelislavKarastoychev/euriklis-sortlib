# ***@euriklis/sortlib list of bugs***
We detected the following bugs in version 3.0.0: 
1. SortLib.find_elements_in_sorted_array():
The method may returns infinite loops because of the condition 
```js
if (middle === last) ...
```
We change all the code in such a way that the convergence of the method to depends only from the property first.
2. SortLib.find_elements_in_sorted_object_array_by_property()
The same bug was fixed here.

