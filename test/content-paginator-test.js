(function($) {
	module('content-paginator: options');
	
	test('pageHeight: 300', function() {
		var $element = $('#content-paginator');
		
		expect(1);
		
		$element.contentPaginator({
			pageHeight: 300
		});
		
		equal(300, $element.find('.content-paginator-page').height());
	});
	
	test('numbersText: show {0}/{1}', function() {
		var $element = $('#content-paginator');
		
		expect(1);
		
		$element.contentPaginator();
		
		equal(($element.data('content-paginator-pageindex') + 1) + 
				'\/' + $element.data('content-paginator-pagecount'), 
				
				$element.find('.content-paginator-numbers').text());
	});
	
	module('content-paginator: pages');
	
	test('split pages number', function() {
		var $element = $('#content-paginator');
		
		expect(1);
		
		$element.contentPaginator();
		equal($element.find('.content-paginator-page').size(), $element.data('content-paginator-pagecount'), 'content page numbers is ' + $element.data('content-paginator-pagecount'));
	});
}(jQuery));
