(function() {
  'use strict';

  window.ajaxFormLiveMixinData = function() {
    var that;

    this.defaultAttrs({
      inputSelector: "input",
      selectSelector: "select",
      textareaSelector: "textarea",
      fieldOut: "_fieldout"
    });

    this.verifyForm = function(e, data) {
      var $form, ajaxUrl, formData;
      $form = that.$node.find('form');
      formData = $form.serialize();
      var inputName = $(e.target).attr("name");
      if (inputName == null) {
        // If it's CKEDITOR, filling input name
        if (e.editor != null) {
          inputName = $("#" + e.editor.name).attr("name");
        }
      }
      formData += "&" + that.attr.fieldOut + "=" + inputName;
      ajaxUrl = $form.data('ajax-check-url');
      $(document).trigger('clear-all-form-messages');
      return $.ajax(ajaxUrl, {
        type: 'POST',
        data: formData,
        dataType: 'json',
        error: function(jqXHR, textStatus, errorThrown) {
          that.trigger('form-submit-error', textStatus);
        },
        success: function(data, textStatus, jqXHR) {
          if(data.errorMessage) {
            that.trigger('ui-show-messages', data);
          }
        }
      });
    };

    return this.after('initialize', function() {
      that = this;
      var textareaId = this.select('textareaSelector').attr('id');
      // CKEDITOR event catching
      CKEDITOR.instances[textareaId].on('blur', this.verifyForm);
      return this.on('focusout', {
        inputSelector: this.verifyForm,
        selectSelector: this.verifyForm,
        textareaSelector: this.verifyForm
    });
    });
  };

}).call(this);
