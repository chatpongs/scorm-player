/**
 * Created by thihara on 11/2/16.
 */

class ScormNavTreeBuilder{
    constructor(){
        
    }

    buildNavigationModel(scormContent, linkNamespace) {
        let navTree = [];
        let defaultOrganization = scormContent.organizations.get(scormContent.defaultOrganization);
    
        scormContent.organizations.forEach(organization => {
            let organizationsTree = {title: organization.title, children:[]};
    
            organization.items.forEach(item => {
                this.buildItemTree(item, organizationsTree, scormContent, linkNamespace);
            });
    
            navTree.push(organizationsTree);
        });
    
        return navTree;
    }

    buildItemTree(item, organizationsTree, scormContent, linkNamespace){
        if(item.identifierref){
            let resource = scormContent.resources.get(item.identifierref);
            let link = `/${linkNamespace}${resource.base? "/"+resource.base : ""}/${resource.href}${item.parameterString 
                ? item.parameterString:""}`;
            organizationsTree.children.push({title:item.title, link: link, isVisible: item.isvisible});
        }
    
        if(item.childItems){
            item.childItems.forEach(childItem => {
                this.buildItemTree(childItem, organizationsTree, scormContent, linkNamespace);
            });
        }
    }
}

module.exports = ScormNavTreeBuilder;