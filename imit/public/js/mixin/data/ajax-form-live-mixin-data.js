(function() {
  'use strict';

  window.ajaxFormLiveMixinData = function() {

    this.defaultAttrs({
      inputSelector: "input",
      selectSelector: "select",
      textareaSelector: "textarea",
      fieldOut: "_fieldout"
    });

    this.verifyForm = function(e, data) {
      var $form, ajaxUrl, formData, that;
      $form = this.$node.find('form');
      formData = $form.serialize();
      formData += "&" + this.attr.fieldOut + "=" + $(e.target).attr("name");
      ajaxUrl = $form.data('ajax-check-url');
      that = this;
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
      return this.on('focusout', {
        inputSelector: this.verifyForm,
        selectSelector: this.verifyForm,
        textareaSelector: this.verifyForm
    });
    });
  };

}).call(this);
