'use strict';
function TemplateProcessor(template) {
    this.template = template;
}

TemplateProcessor.prototype.fillIn = function(dictionary) {
    var res = this.template;
    var re = /{{[^{]*}}/g;
    var match = this.template.match(re);
    var pre, key, after;
    for (var i = 0; i < match.length; i++) {
        pre = match[i];
        key = pre.replace("{{", "");
        key = key.replace("}}", "");
        after = dictionary[key] ||'';
        res = res.replace(pre, after);
    }
    return res;
}
