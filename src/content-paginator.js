/*
 * content-paginator
 * https://github.com/nicolaszhao/content-paginator
 *
 * Copyright (c) 2013 Nicolas Zhao
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.content_paginator = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.content_paginator = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.content_paginator.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.content_paginator.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].content_paginator = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
