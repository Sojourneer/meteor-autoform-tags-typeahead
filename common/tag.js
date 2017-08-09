
CloudspiderTags = new Mongo.Collection('cloudspider_tags');

if(Meteor.isClient) {
    Meteor.subscribe('cloudspider_tags');
}


if(Meteor.isServer) {
    CloudspiderTags.allow({
        insert: function () {
            return true;
        }
    });

    Meteor.publish('cloudspider_tags', function() {
        return CloudspiderTags.find({});
    });

}



TagsUtil = {
    findOrCreate: function(title, tagSet) {
        var name = this.toSlug(title); //Sanitized url valid tagname

        var query = {
            name: name
        };
        if(tagSet) query.set= tagSet;
        var tag = CloudspiderTags.findOne(query);

        if(TagsUtil.debug) console.log(tag, tagSet, query);

        if(tag) {
            return tag;
        }
        CloudspiderTags.insert({
            name: name,
            set: (tagSet == null || tagSet == '*') ? 'default': tagSet,
            title: title,
            visitCount: 0
        });

        return CloudspiderTags.findOne(query);
    },

    toSlug: function(str) {
        return str.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^一-龠ぁ-ゔァ-ヴーa-zA-Z0-9ａ-ｚＡ-Ｚ０-９々〆〤-]+/g, '');
    },



};


