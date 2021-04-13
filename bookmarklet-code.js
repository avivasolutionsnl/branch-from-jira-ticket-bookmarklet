javascript:(function () {
    const contextEl = document.querySelector("[role='dialog']") || document.querySelector("body");
    const ticketNrEl = contextEl.querySelector("[id='jira-issue-header'] a[target='_blank']");
    const titleEl = contextEl.querySelector("h1");

    function showMessage(message) {
        const el = document.createElement('div');
        el.innerText = message;
        el.style = "position:fixed; top: 0; right: 0; left: 0; padding: 10px; text-align: center; background-color: rgba(0,0,0,0.7); color: white; z-index: 9999;";
        document.body.appendChild(el);
        setTimeout(() => {
            document.body.removeChild(el);
        }, 3000);
    }

    if (!ticketNrEl || !titleEl) {
        showMessage("Something went wrong. Do you have an open Jira ticket on the page?");
        return;
    }

    const titleDashedLowercase = titleEl.innerText.replace(/[\s\(\)\'\"]+/g, '-').toLowerCase();
    const ticketNr = ticketNrEl.innerText;
    const createBranchString =
        `git checkout -b feature/${ticketNr}_${titleDashedLowercase} \ngit push -u origin feature/${ticketNr}_${titleDashedLowercase}\n`;

    navigator.clipboard.writeText(createBranchString)
        .then(() => showMessage(`Copied:\n ${createBranchString}`))
        .catch((error) => {
            alert(`Copying failed. ${error}`)
        })
})();