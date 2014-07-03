'use strict';

window.showFullStoryComponent = flight.component(
function() {
    var prevOpenStoryId;
    var animationSpeed = 400;
    var offsetTop = 200;
    var currentElementTop = 0;

    this.showFullStory = function(event, data) {
        prevOpenStoryId = data['id'];
        this.$node.find(prevOpenStoryId).css('display', 'inline-block');
        this.$node.show();
        this.scrollTop();
    }

    this.hideFullStory = function (event, data) {
        this.$node.hide();
        this.$node.find(prevOpenStoryId).hide();
        this.scrollBack();
    }

    this.scrollTop = function () {
        $('html, body').animate({scrollTop: offsetTop}, animationSpeed);
        currentElementTop = $(document).scrollTop();
    }

    this.scrollBack = function () {
        $('html, body').animate({scrollTop: currentElementTop}, animationSpeed);
    }

    this.after('initialize', function() {
        this.on(document, 'click-preview-story', this.showFullStory);
        this.on('.story-close', 'click', this.hideFullStory);
    });
});