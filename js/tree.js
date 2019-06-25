var test = {

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
            var i;
            var result = null;
            for(i=0; result == null && i < node.children.length; i++){
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
    setMyElementAttr('jsonTree', 'innerHTML', syntaxHighlight(JSON.stringify(test.json, 'undefined', 4)));
    setMyElementAttr('jsonTree', 'class', 'pre');
    setMyElementAttr('msg', 'innerHTML', '');
}

function searchNode(){
    var term = document.getElementById('objectId').value;

    if(test.json.length == 0){
        setMyElementAttr('msg', 'innerHTML', test.messagges.noTreeSet);
        setMyElementAttr('msg', 'class', 'error');
        return;
    }
    if(term.length == 0){
        setMyElementAttr('msg', 'innerHTML', test.messagges.noIdProvide);
        setMyElementAttr('msg', 'class', 'error');
        return;
    }

    var find = test.search(test.json, term);
    if(find){
        setMyElementAttr('msg', 'innerHTML', `The node with id: <strong>${find.id}</strong> has the label: <strong>${find.label}</strong>`);
        setMyElementAttr('msg', 'class', 'success');
    }else{
        setMyElementAttr('msg', 'innerHTML', `There's not a node with the id: <strong>${term}</strong>`);
        setMyElementAttr('msg', 'class', 'error');
    }
    
}