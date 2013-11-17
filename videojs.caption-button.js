videojs.Caption = videojs.Button.extend({
/** @constructor */
    init: function(player, options){
        videojs.Button.call(this, player, options);
        //this.on('click', this.onClick);
    }
});

videojs.Caption.prototype.onClick = function() {
    var track = this.player_.textTracks()[0];

    console.log($(this.el_).toggleClass('active'));

    if (track.mode_ === 0) {
        this.player_.showTextTrack(this.player_.textTracks()[0].id_, this.player_.textTracks()[0].kind());
    } else {
        track.disable();
    }
};

// Note that we're not doing this in prototype.createEl() because
// it won't be called by Component.init (due to name obfuscation).
var createCaptionButton = function() {
    var props = {
            className: 'vjs-caption-button vjs-control',
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + ('Caption') + '</span></div>',
            role: 'button',
            'aria-live': 'polite', // let the screen reader user know that the text of the button may change
            tabIndex: 0
        };
    return videojs.Component.prototype.createEl(null, props);
};

var caption;
videojs.plugin('caption', function() {
    var options = { 'el' : createCaptionButton() };
    caption = new videojs.Caption(this, options);
    this.controlBar.el().appendChild(caption.el());
});

var vid = videojs("example_video_1", {
    plugins : { caption : {} }
});