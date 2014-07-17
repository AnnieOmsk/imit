(function() {
  'use strict';

  window.imagePreviewMixinUI = function() {

    this.defaultAttrs({
      fileInputSelector: "input[type='file']",
      imagePreviewSelector: "data-image-preview"
    });

    this.drawPreview = function(e, data) {
      var that = this;
      var input = e.target;
      var imagePreviewSelector = $(input).attr(this.attr.imagePreviewSelector);
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          that.$node.find(imagePreviewSelector)
            .attr('src', e.target.result)
        };

        reader.readAsDataURL(input.files[0]);
      }
      else {
        var img = input.value;
        that.$node.find(imagePreviewSelector).attr('src', img);
      }
    };

    this.after('initialize', function() {
      this.on('change', {
        fileInputSelector: this.drawPreview
      });
    });
  };

}).call(this);
