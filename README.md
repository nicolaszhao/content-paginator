# Content Paginator

Content Paginator is a simple jQuery plugin that allows you to page the large text content. Makes limited page space to increase the content of the show, and improve content readability.

**Current version:** 0.2.0

## Usage
Include jQuery and the plugin on your page. Then select a container contains a large text content and call the contentPaginator method on DOM ready.

	<script src="jquery.js"></script>
	<script src="jquery.content-paginator.js"></script>
	<script>
		$(function() {
			$('#content-wrapper').contentPaginator();
		});
	</script>
	<div id="content-wrapper">
		<p></p>
		<p></p>
	</div>

## Settable Options
**pageHeight** (default: 300)   
Type: Number   
The height of content container.

***

**duration** (default: 800)   
Type: Number   
A number determining how long the paging fade animation will run.

***

**prevText** (default: "&laquo;Prev")   
Type: String   
The paging prev button text.

***

**nextText** (default: "Next&raquo;")   
Type: String   
The paging next button text.

***

**numbersText** (default: "{0}/{1}")   
Type: String   
The paging numbers section text. "{0}" instead of the pageindex, and "{1}" instead of the pagecount.

## Theming
If paging button and paging numbers specific styling is needed, the following CSS class names can be used:
* `.content-paginator-nav`: The outer container of the paging button and paging numbers.
	* `.content-paginator-button`: The container of the paging button.
		* `.content-paginator-button-prev`: Prev button link.
		* `.content-paginator-button-next`: Next button link.
		* `.content-paginator-button-disabled`: The paging button status of the first page or the last page.
	* `.content-paginator-numbers`: Paging numbers wrapper.
	
## Dependencies
### Required
[jQuery, tested with 1.10.2](http://jquery.com)

## License
Copyright (c) 2013 Nicolas Zhao; Licensed MIT
