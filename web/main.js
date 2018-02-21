var NE_TYPE = {
    ORGANIZATION: 0,
    PERSON: 1,
    LOCATION: 2,
    DATE: 3,
    TIME: 4,
    MONEY: 5,
    PERCENT: 6,
    FACILITY: 7,
    GPE: 8
};

function retrieveNodes(data, neType) {
    var nodes = [];
    for (var i = 0; i < data[neType].objects.length; i++) {
        var obj = data[neType].objects[i];
        nodes.push({id: obj.title, x: (i+1) * 30, y: (i+1) * 30});
    }
    return nodes;
}

function getData(url) {    
    return $.getJSON(url).then(function(data){
        return data;
    });
}

function getObjectsData() {
    
    return getData(urlObjectClasses).then(function(data){
        return data;
    });
}

var urlObjectClasses = "https://raw.githubusercontent.com/jeongmincha/word_embedding_for_subtitles/master/results/objects_classes.json";
getData(urlObjectClasses).then(function(data){
    
    var nodes = retrieveNodes(data, NE_TYPE.PERSON);

    var urlPersonRelations = "https://raw.githubusercontent.com/jeongmincha/word_embedding_for_subtitles/master/results/person_object_relations.json";
    getData(urlPersonRelations).then(function(data) {

        var links = [];
        for (var i = 0; i < data.objects.length; i++) {
            var obj = data.objects[i];
            // console.log(obj);
            var source = obj.source.split("O")[1] - 1;
            var target = obj.target.split("O")[1] - 1;
            var value = obj.value;

            links.push({
                source: nodes[source], 
                target: nodes[target],
                weight: value});
        }

        var lastNodeId = 3;
        restart(nodes, links, lastNodeId);
    });
});