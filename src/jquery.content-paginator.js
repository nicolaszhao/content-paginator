/*
 * content-paginator
 * https://github.com/nicolaszhao/content-paginator
 *
 * Copyright (c) 2013 Nicolas Zhao
 * Licensed under the MIT license.
 */

(function($) {
	
	var increments = 0;
	
	$.fn.contentPaginator = function(options) {

		options = $.extend({}, $.fn.contentPaginator.defaults, options);

		return this.each(function() {
			var paginator = $.extend({}, $.fn.contentPaginator.paginator);
			
			paginator.create($(this), options);
		});
	};

	$.fn.contentPaginator.defaults = {
		
		// container height
		pageHeight: 300,
		
		// animation duration
		duration: 800,
		prevText: '&laquo;Prev',
		nextText: 'Next&raquo;',
		
		// page numbers text format, {0}: pageindex, {1}: pagecount
		numbersText: '{0}/{1}'
	};
	
	$.fn.contentPaginator.paginator = {
		create: function($element, options) {
			var containerHeight = options.pageHeight,
				paragraphs = [],
				pageHeight = 0;
			
			if (!this._create) {
				this.options = options;
				this.$element = $element;
				this.$container = this._container();
				
				this._create = true;
			}
			
			$element.children().each(function() {
				var $paragraph = $(this),
					paragraphHeight = $paragraph.outerHeight(true),
					$splitParagraphs;
				
				if (pageHeight + paragraphHeight <= containerHeight) {
					pageHeight += paragraphHeight;
					paragraphs.push(this);
				} else {
					$splitParagraphs = $.fn.contentPaginator.utils.splitParagraph($paragraph, $element, pageHeight, containerHeight);
					if ($splitParagraphs.length) {
						paragraphs.push($splitParagraphs[0]);
						return false;
					} else {
						return false;
					}
				}
			});
			
			$('<div class="content-paginator-page" />').appendTo(this.$container).css({
				width: $element.width(),
				height: containerHeight,
				position: 'absolute'
			}).append(paragraphs);
			
			if ($element.children().length) {
				this.create($element, options);
			} else {
				this._init();
			}
		},
		
		refresh: function() {
			var duration = this._initialized ? this.options.duration : 0,
				numbersText = this.options.numbersText.replace(/\{0\}/, this.pageindex + 1)
					.replace(/\{1\}/, this.pagecount),
					
				$prev = this.$pageNav.find('.content-paginator-button-prev'),
				$next = this.$pageNav.find('.content-paginator-button-next');
			
			$prev.add($next).removeClass('content-paginator-button-disabled');
			
			if (this.pageindex === 0) {
				$prev.addClass('content-paginator-button-disabled');
			}
			
			if (this.pageindex === this.pagecount - 1) {
				$next.addClass('content-paginator-button-disabled');
			}
			
			this.$pages.finish().fadeOut(duration).eq(this.pageindex).fadeIn(duration);
			this.$pageNav.find('.content-paginator-numbers').text(numbersText);
			
			this.$element.data('content-paginator-pageindex', this.pageindex);
			this.$element.data('content-paginator-pagecount', this.pagecount);
			this._initialized = true;
		},
		
		run: function() {
			if (this.pageindex > this.pagecount - 1) {
				this.pageindex = this.pagecount - 1;
			} else if (this.pageindex < 0) {
				this.pageindex = 0;
			}
			
			this.refresh();
		},
		
		_init: function() {
			var that = this;
			
			this.$pages = this.$element.empty().append(this.$container.css('visibility', 'visible')).find('.content-paginator-page');
			this.$pageNav = this._nav();
			this.pagecount = this.$pages.length;
			this.pageindex = 0;
			
			this.$pageNav
				.on('click', '.content-paginator-button-prev', function(event) {
					if (that.pageindex) {
						that.pageindex--;
						that.run();
					}
					
					event.preventDefault();
				})
				.on('click', '.content-paginator-button-next', function(event) {
					if (that.pageindex < that.pagecount - 1) {
						that.pageindex++;
						that.run();
					}
					
					event.preventDefault();
				});
			
			this.refresh();
		},
		
		_container: function() {
			var id = 'content-paginator-' + increments++;
			
			return $('<div />').attr('id', id).css({
				width: this.$element.width(),
				height: this.options.pageHeight,
				visibility: 'hidden',
				overflow: 'hidden',
				position: 'relative'
			}).appendTo('body');
		},
		
		_nav: function() {
			return $('<div class="content-paginator-nav">' + 
					'<span class="content-paginator-button">' + 
					'<a class="content-paginator-button-prev" href="">' + this.options.prevText + '</a>' + 
					'<a class="content-paginator-button-next" href="">' + this.options.nextText + '</a>' + 
					'</span>' + 
					'<span class="content-paginator-numbers"></span>' + 
					'</div>')
					.appendTo(this.$element);
		},
		
	};
	
	$.fn.contentPaginator.utils = {
		_lineHeight: function($paragraph) {
			var html = $paragraph.html(),
				lineHeight;
				
			lineHeight = $paragraph.html('i').height();
			$paragraph.html(html);
			
			return lineHeight;
		},
		
		_singleLineParagraphHeight: function($paragraph) {
			var html = $paragraph.html(),
				height;
				
			height = $paragraph.html('i').outerHeight(true);
			$paragraph.html(html);
			
			return height;
		},
		
		splitParagraph: function($paragraph, $container, curPageHeight, maxPageHeight) {
			var content = $paragraph.text(),
				start = 0,
				end = content.length,
				lineHeight = this._lineHeight($paragraph),
				ret = [],
				$p, middle, paragraphHeight, incrementHeight, prevContent, nextContent;
			
			if (maxPageHeight - curPageHeight < this._singleLineParagraphHeight($paragraph)) {
				return ret;
			}
				
			paragraphHeight = $paragraph.outerHeight(true);
			incrementHeight = curPageHeight + paragraphHeight;
			
			while (incrementHeight > maxPageHeight || maxPageHeight - incrementHeight > lineHeight + 1) {
				middle = Math.ceil((end - start) / 2) + start;
				$p = $('<p />').text(content.substring(0, middle)).appendTo($container);
				
				paragraphHeight = $p.outerHeight(true);
				incrementHeight = curPageHeight + paragraphHeight;
				$p.remove();
				
				if (incrementHeight > maxPageHeight) {
					end = middle;
				} else {
					start = middle;
				}
			}
			
			if (!middle) {
				return ret;
			}
			
			prevContent = content.substring(0, middle);
			nextContent = content.substring(middle);
			
			middle = prevContent.search(/\s+(?:[^\s]+)?$/);
			
			if (middle !== -1) {
				prevContent = content.substring(0, middle);
				nextContent = content.substring(middle + 1);
			}
			
			ret = $('<p />').text(prevContent).insertBefore($paragraph)
					.add($('<p />').text(nextContent).insertBefore($paragraph));
					
			$paragraph.remove();
			
			return ret;
		}
	};

}(jQuery));