let test = {

    messagges:{
        loading: 'Loading...',
        noTreeSet: 'JSON Tree is not Set, please click the Button',
        noIdProvide: 'Please insert a node Id'
    },
    json: [],
    loadJson: function(){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
              resolve(JSON.parse(xhr.responseText));
            });
            xhr.addEventListener('error', () => {
              reject(new Error(xhr.statusText));
            })
            xhr.open("GET", "https://nodes-bebfa.firebaseio.com/nodes.json", true);
            xhr.send();
        });            
    },
    search: function(node, term){
       if(node.id == term){
            return node;
       }else if (node.children != null){
            let result = null;
            for(let i=0; result == null && i < node.children.length; i++){
                 result = test.search(node.children[i], term);
            }
            return result;
       }
       return null;
    }
}

async function getData(){
    setMyElementAttr('msg', 'class', '');
    setMyElementAttr('msg', 'innerHTML', test.messagges.loading);
    test.json = await test.loadJson();
    if(typeof test.json == 'object'){
        setMyElementAttr('jsonTree', 'innerHTML', syntaxHighlight(JSON.stringify(test.json, 'undefined', 4)));
        setMyElementAttr('jsonTree', 'class', 'pre');
        setMyElementAttr('msg', 'innerHTML', '');
        unSetMyElementAttr('searchBtn', 'disabled');
    }
}

function searchNode(){
    let term = document.getElementById('objectId').value;

    if(test.json.length == 0){
        setMyElementAttr('msg', 'innerHTML', test.messagges.noTreeSet);
        setMyElementAttr('msg', 'class', 'error');
        return;
    }
    if(term.length == 0){
        setMyElementAttr('searchMsg', 'innerHTML', test.messagges.noIdProvide);
        setMyElementAttr('searchMsg', 'class', 'error');
        return;
    }

    let find = test.search(test.json, term);
    if(find){
        setMyElementAttr('searchMsg', 'innerHTML', `The node with id: <strong>${find.id}</strong> has the label: <strong>${find.label}</strong>`);
        setMyElementAttr('searchMsg', 'class', 'success');
    }else{
        setMyElementAttr('searchMsg', 'innerHTML', `Not exists a node with the id: <strong>${term}</strong>`);
        setMyElementAttr('searchMsg', 'class', 'error');
    }
    
}