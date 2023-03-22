async function loadScores() {
    let scores = [];

    // Get scores from API:
    try {
        const response = await fetch('/api/scores');
        scores = await response.json();
        localStorage.setItem('scores', JSON.stringify(scores));
    }
    catch {
        // As backup, just read scores from local storage
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
    }

    // Display Scores
    const tableBodyEl = document.querySelector('#scores');

    if (scores.length) {
        for (const [i, score] of scores.entries()) {
            const positionTdEl = document.createElement('td');
            const nameBodyEl = document.createElement('td');
            const scoreTdEl = document.createElement('td');
            const dateTdEl = document.createElement('td');

            positionTdEl.textContent = i + 1;
            nameBodyEl.textContent = score.name;
            scoreTdEl.textContent = score.score;
            dateTdEl.textContent = score.date;
            
            const rowEl = document.createElement('tr');
            rowEl.appendChild(positionTdEl);
            rowEl.appendChild(nameBodyEl);
            rowEl.appendChild(scoreTdEl);
            rowEl.appendChild(dateTdEl);
            
            tableBodyEl.appendChild(rowEl);
        }
    }
    else {
        tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
    }
}

loadScores();