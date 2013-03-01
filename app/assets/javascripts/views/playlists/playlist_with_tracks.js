Kigendan.Views.PLaylistWithTracks = Backbone.View.extend({

    template: JST['playlists/playlist_with_tracks'],

    el: '.playlist-tracks-wrapper',

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model.tracks, 'add', this.handleAdding);
        this.listenTo(this.model.tracks, 'remove', this.handleRemoval);

        var that = this;
        $('.playlist-form').submit(function(event) {
            event.preventDefault();

            var attrs = {
                title: $('#playlist_title').val()
            };

            var options = { 

                success: function(model, response, options) {
                    window.location = model.url();
                },

                error: function(model, xhr, options) {
                    // TODO show error message
                }

            };

            that.model.save(attrs, options);
        });

        $('.spoiler-link').click(function(event) {
            event.preventDefault();

            $('.spoiler').show();
            $('.spoiler-link').hide();
        })
    },

    handleAdding: function() {
        if (!(this.model.isNew())) {
            this.model.save();
        }

        this.render();
    },

    handleRemoval: function() {
        if (!(this.model.isNew())) {
            this.model.save();
        }
    },

    render: function() {
        this.$el.html(this.template({ playlist: this.model }));

        $.each(this.model.tracks.models, function(index, value) {
            var view = new Kigendan.Views.PlaylistWithTracksItem({
                model: value
            });
            value.trackView = view;
            $('.playlist-tracks-table').append(view.render().$el);
        });

        return this;
    }

});