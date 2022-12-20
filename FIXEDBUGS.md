# ***@euriklis/sortlib list of bugs***
We detected the following bugs in version 3.0.0: 
1. SortLib.find_elements_in_sorted_array():
The method may returns infinite loops because of the condition 
```js
if (middle === last) ...
```
We change all the code in such a way that the convergence of the method to depends only from the property first.

```js
...
if (first === middle) {
    if (!found) ++middle;
    if (array[middle] === element) found = true;
    break;
}
```


2. SortLib.find_elements_in_sorted_object_array_by_property()
The same bug was fixed here.

```js
...
if (first === middle) {
    if (!found) ++middle;
    if (get_item_value(array[middle], property) === get_item_value(element, property)) {
        found = true;
    }
    break;
}
```