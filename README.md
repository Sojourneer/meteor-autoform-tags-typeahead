## Autoform Tags Typeahead

Extends autoform with a tags input including typeahead.
Besides providing the input, it also takes care of storing the unique tags for use in the typeahead addition to autofill the input while typing.

Possible tags values are organized into sets. Lookups can specify what set to use, or to use all sets; by default, the 'default' set is used.
The tags themselves do not include a specification of the set.
 
## Installation

In a Meteor app directory, enter:

```
$ meteor add sojourneer:autoform-tags-typeahead
```

## Example usage

```javascript
// The schema for the tagging result
SomeSchema = new SimpleSchema({
    tags: {
        type: [String],
        label: 'Tags',
        autoform: {
            type: 'tagsTypeahead',
            'tag-set': 'mySet'      //optional. Default is 'default'.
        }
    }
});

```

Let's say that you fill in 3 tags: 

```
Amsterdam, Hamburg, Boston
```

### Above results in the following mongo record

```json
{
    "tags": {
        "Amsterdam",
        "Hamburg",
        "Boston"
    }
}
```

### And a separate Collection called cloudspider_tags

This collection is used as source for typeahead to autofill the input when typing
```json
{
    "name": "amsterdam",
    "set": "mySet",
    "title": "Amsterdam"
}
{
    "name": "hamburg",
    "set": "mySet",
    "title": "Hamburg"
}
{
    "name": "boston",
    "set": "mySet",
    "title": "Boston"
}
```

## Internal dependencies / credits
[ajduke:bootstrap-tagsinput](https://atmospherejs.com/ajduke/bootstrap-tagsinput) 

[mrt:bootstrap3-typeahead](https://atmospherejs.com/mrt/bootstrap3-typeahead) 

Forked from [cloudspider:autoform-tags-typeahead](https://atmospherejs.com/cloudspider/autoform-tags-typeahead)