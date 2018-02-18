/**
 * Created by thihara on 11/2/16.
 */
/**
 * Created by thihara on 11/1/16.
 */
let xmldoc = require('xmldoc'),
    ScormModel = require('./Model'),
    ScormResource = ScormModel.ScormResource,
    ScormFile= ScormModel.ScormFile,
    ScormDependency = ScormModel.ScormDependency,
    ScormItem = ScormModel.ScormItem,
    ScormOrganization =  ScormModel.ScormOrganization,
    ScormContent = ScormModel.ScormContent;

class ScormContentParser{
    constructor() {
            
    }

    parse(xmlContent) {

        let scormContent = new ScormContent();
        let document = new xmldoc.XmlDocument(xmlContent);
    
        let organizationsElement = document.childNamed("organizations");
        scormContent.defaultOrganization = organizationsElement.attr.default;
    
        let organizationElements = organizationsElement.childrenNamed("organization");
        organizationElements.forEach(function (organizationElement) {
            let organization = new ScormOrganization();
            organization.identifier = organizationElement.attr.identifier;
            organization.title = organizationElement.childNamed("title").val;
    
            let itemElements = organizationElement.childrenNamed("item");
            itemElements.forEach(function (itemElement) {
                let item = new ScormItem();
                item.identifier = itemElement.attr.identifier;
                item.isvisible = itemElement.attr.isvisible == undefined ? true : itemElement.attr.isvisible;
                item.identifierref = itemElement.attr.identifierref;
                item.parameterString = itemElement.attr.parameters;
                item.title = itemElement.childNamed("title").val;
    
                let childItemElements = itemElement.childrenNamed("item");
                childItemElements.forEach(function (childItemElement) {
                    let childItem = new ScormItem();
                    childItem.identifier = childItemElement.attr.identifier;
                    childItem.isvisible = childItemElement.attr.isvisible == undefined ? true : childItemElement.attr.isvisible;
                    childItem.identifierref = childItemElement.attr.identifierref;
                    childItem.parameterString = childItemElement.attr.parameters;
                    childItem.title = childItemElement.childNamed("title").val;
                    childItem.parentItem = item;
    
                    item.childItems.set(childItem.identifier, childItem);
                });
    
                organization.items.set(item.identifier, item);
            });
    
            scormContent.organizations.set(organization.identifier, organization);
        });
    
        let resourceElements = document.childNamed("resources").childrenNamed("resource");
        resourceElements.forEach(function(resourceElement) {
    
            let resource = new ScormResource();
            resource.identifier = resourceElement.attr.identifier;
            resource.type = resourceElement.attr.type;
            resource.scormType = resourceElement.attr["adlcp:scormType"];
            resource.base = resourceElement.attr["xml:base"];
            resource.href = resourceElement.attr.href;
    
    
            let files = resourceElement.childrenNamed("directory");
            files.forEach(function (fileElement) {
                let file = new ScormFile();
                file.href = fileElement.attr.href;
    
                resource.files.push(file);
            });
    
            let dependencies = resourceElement.childrenNamed("dependency");
            dependencies.forEach(function (dependencyElement) {
                let dependency = new ScormDependency();
                dependency.identifierref = dependencyElement.attr.identifierref;
    
                resource.dependencies.push(dependency);
            });
    
            scormContent.resources.set(resource.identifier, resource);
        });
        
        return scormContent;
    }
}

module.exports.ScormContentParser = ScormContentParser;