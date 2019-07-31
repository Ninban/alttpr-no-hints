function redirectToNewSeed(json) {
    var hash = json.hash
    window.location = 'https://alttpr.com/h/' + hash
}

function buildButton() {
    var buttonGroups = document.getElementsByClassName('btn-group btn-flex')
    var raceButtonGroup = buttonGroups[1]

    if (raceButtonGroup === undefined)
        setTimeout(buildButton, 1000)
    else {
        var noHintsJson
        var req = new Request('https://gist.githubusercontent.com/tcprescott/d5de27c773679eb7205688b6e92bfbbf/raw/a64235ed990fa1ec24a6248bb3c6a746c406f603/no_hints.json', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        fetch(req).then(function(res) {
            return res.json()
        }).then(function(json) {
            noHintsJson = json
        }).catch(function(error) {
            console.error(error)
        })

        var noHintsButton = document.createElement('button')
        noHintsButton.textContent = 'No hints race ROM'

        noHintsButton.onclick = function () {
            var req = new Request('https://alttpr.com/seed', {
                method: 'POST',
                body: JSON.stringify(noHintsJson),
                headers: {'Content-Type': 'application/json'},
            });
            fetch(req).then(function(res) {
                return res.json()
            }).then(function(json) {
                redirectToNewSeed(json)
            }).catch(function(error) {
                console.error(error)
            })
        }

        raceButtonGroup.appendChild(noHintsButton)
    }
}

window.onload = buildButton()