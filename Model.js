/**
 * Created by thihara on 11/1/16.
 */
class ScormContent {
    constructor(){
        this.defaultOrganization;
        this.organizations = new Map();
        this.resources = new Map();
    }
}

class ScormResource {
    constructor(){
        this.identifier;
        this.type;
        this.scormType;
        this.href;
        this.base;
        this.files = [];
        this.dependencies = [];
    }
}

class ScormFile {
    constructor(){
        this.href;
    }
}

class ScormDependency {
    constructor(){
        this.identifierref;
    }
}

class ScormOrganization {
    constructor(){
        this.identifier;
        this.title;
        this.items = new Map();
    }
}

class ScormItem {
    constructor(){
        this.identifier;
        this.isvisible;
        this.identifierref;
        this.title;
        this.parentItem;
        this.parameterString;
        this.childItems = new Map();
    }
}

module.exports.ScormContent = ScormContent;
module.exports.ScormOrganization = ScormOrganization;
module.exports.ScormFile = ScormFile;
module.exports.ScormResource = ScormResource;
module.exports.ScormDependency = ScormDependency;
module.exports.ScormItem = ScormItem;
