var getTagSet = function(tagSet) {
    if(tagSet == undefined)
        return 'default';
    else if(tagSet != '*')
        return tagSet;
    else
        return null;
}

AutoForm.addInputType("tagsTypeahead", {
    template: "afTagsTypeahead",
    valueIn: function(value) {
        if(!value) {
            return '';
        }

        return value.join(',');
    },
    valueOut: function() {
        var inputElt = this[0];
        if(!this.val()) {
            return '';
        }
        var tags = this.val().replace(' ', '').split(',');

        var tagNames = _.map(tags, function(title){
            var ts = getTagSet(inputElt.getAttribute('tag-set'));
            var tag = TagsUtil.findOrCreate(title, ts);
            return tag.title;
        });

        return tagNames;
    }
});

Template.afTagsTypeahead.onRendered(function() {
    var atts = this.data.atts;
    var options = {
        typeahead: {
            displayKey: 'title',
            valueKey: 'title',
            source: function(str) {
                var ts = getTagSet(atts['tag-set']);
                return CloudspiderTags.find(ts ? {set:ts} : {}).map(function(tag){
                    return tag.title;
                });
            }
        }
    };

    //Extend tagsinput options
    if(this.data.atts && this.data.atts.tagsinput) {
        _.extend(options, this.data.atts.tagsinput);
    }

    //Add typeahead options if there are any
    if(this.data.atts && this.data.atts.typeahead) {
        options.typeahead = this.data.atts.typeahead;
    }

    this.$('input').tagsinput(options);
    this.$('input').attr('data-schema-key', this.data.atts['data-schema-key']);
    this.$('input').attr('tag-set', this.data.atts['tag-set']);
});

