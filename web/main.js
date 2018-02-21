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
    var len = data[neType].objects.length;
    // var len = 12;
    for (var i = 0; i < len; i++) {
        var obj = data[neType].objects[i];
        var angleUnit = 360 / len;
        nodes.push({
            id: obj.title, 
            x: 480 + Math.cos(angleUnit * i) * 300,
            y: 480 + Math.sin(angleUnit * i) * 300
        });
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
        var len = nodes.length;
        // var len = 12;
        for (var i = 0; i < data.objects.length; i++) {
            var obj = data.objects[i];
            // console.log(obj);
            var source = obj.source.split("O")[1] - 1;
            var target = obj.target.split("O")[1] - 1;
            var value = obj.value;
            
            if (source < len && target < len) {
                links.push({
                    source: nodes[source], 
                    target: nodes[target],
                    weight: value.toFixed(3)
                });
            }
        }

        var lastNodeId = 3;
        restart(nodes, links, lastNodeId);
    });
});