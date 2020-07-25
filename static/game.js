function main() {
    current_location = undefined;
    for (let key in json_data.nodes) {
        if (json_data.nodes.hasOwnProperty(key) && json_data.nodes[key].name === "Start") {
            current_location = json_data.nodes[key];
        }
    }
    display_choices()
}

function choice(output) {
    current_location = json_data.nodes[output];
    document.getElementById("location").innerText = current_location.data.name;
    display_choices()
}

function display_choices() {
    let array = current_location.outputs.choices.connections;
    let html = "";
    for (let id in array) {
        html += "<div class='choice' style='width: "+100/array.length+"%' onclick='choice("+json_data.nodes[array[id].node].outputs.output.connections[0].node+")'><div class='choiceInside'>"+json_data.nodes[array[id].node].data.name+"</div></div>";
    }
    document.getElementById("choices").innerHTML = html;
}

window.onload = main;