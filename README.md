##tSelect 1.0
-----------
A cross-browser & fully customisable alternative to the form select element

##Contribute
-----------  
If anyone could add something that will get this plugin better, please Feel free to contribute by forking then making a pull request.

#### Dependencies

jQuery : https://github.com/jquery/jquery


##### Optional Dependencies

malihu custom scrollbar plugin : https://github.com/malihu/malihu-custom-scrollbar-plugin



#### Compatibility
recent browsers such as :
IE 8+, Safari, Firefox & Chrome.
  
##Markup
-----------
```html
<select class="custom-select">
	<option value="1">Option 1</option>
	<option value="2">Option 2</option>
	<option value="3">Option 3</option>
	<option value="4">Option 4</option>
	<option value="5">Option 5</option>
</select>
```

```js
$(document).ready(function(){
    $('.custom-select').tSelect();
});
```

##Documentation
-----------

### Parameters

**placeholder:** `default:Select`

Basically it's like a placeholder, a text that shows up when there is no selected option yet (`default`). 


**filter:** `default:false`

To whether activate the Search-based filter or not


**filterNoMatches:** `default:No matches…`
To set a text that shows up when there's not matched results for the typed text


**filterPlaceholder:** `default:Filter…`

Filter input's placeholder


**customScroll:** `default:false`

If you needed to customize scrolling bars within your custom select, set this to `true`, 

**dataAttr:** `default:value`

Set data source attribute
