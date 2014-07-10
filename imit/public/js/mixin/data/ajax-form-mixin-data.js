(function() {
  'use strict';

  /*
     Data mixin for forms which are submitted via ajax.
  
      Component node must have inside form with data-ajax-url attribute with url for submit.
  
      After success loading mixin triggers 'form-submitted' and 'ui-show-messages' events with server response data.
      In case of server error mixin triggers event 'form-submit-error' with text of error.
  */

  window.ajaxFormMixinData = function() {
    this.submitForm = function(e, data) {
      var $form, ajaxUrl, formData, that;
      e.preventDefault();
      $form = this.$node.find('form');
      $form.find('[type=submit]').attr('disabled', true);
      formData = $form.serialize();
      ajaxUrl = $form.data('ajax-url');
      this.trigger('show-loader');
      that = this;
      $(document).trigger('clear-all-form-messages');
      return $.ajax(ajaxUrl, {
        type: 'POST',
        data: formData,
        dataType: 'json',
        error: function(jqXHR, textStatus, errorThrown) {
          that.trigger('form-submit-error', textStatus);
          return $form.find('[type=submit]').removeAttr('disabled');
        },
        success: function(data, textStatus, jqXHR) {
          if (!data.redirectUrl) {
            that.trigger('ui-show-messages', data);
          }
          that.trigger('hide-loader');
          that.trigger('form-submitted', data);
          return $form.find('[type=submit]').removeAttr('disabled');
        }
      });
    };
    return this.after('initialize', function() {
      return this.on('submit', this.submitForm);
    });
  };

}).call(this);
