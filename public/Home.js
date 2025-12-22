async function createExplorer() {
  await fetch(`/explorer`, {
    method: 'POST',
    body: JSON.stringify({
      place: `${document.getElementById('place').value}`,
      funFact: `${document.getElementById('funFact').value}`,
      language: `${document.getElementById('language').value}`,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((result) => result.json());

  await loadExplorerData();
}

async function loadExplorerData() {
  await fetch('/explorer')
    .then((result) => result.json())
    .then((resultJson) => {
      const table = document.createElement('table');
      table.setAttribute('id', 'explorerInfo');
      const tableRow = document.createElement('tr');

      const tableHeadingplace = document.createElement('th');
      tableHeadingplace.innerHTML = 'place';

      const tableHeadingfunFact = document.createElement('th');
      tableHeadingfunFact.innerHTML = 'Fun Fact';

      const tableHeadinglanguage = document.createElement('th');
      tableHeadinglanguage.innerHTML = 'Language';

      tableRow.appendChild(tableHeadingplace);
      tableRow.appendChild(tableHeadingfunFact);
      tableRow.appendChild(tableHeadinglanguage);

      table.appendChild(tableRow);

      // Adding Data to Table
      resultJson.forEach((explorer) => {
        const explorerTableRow = document.createElement('tr');
        const explorerTableplace = document.createElement('td');
        const explorerTablefunFact = document.createElement('td');
        const explorerTablelanguage = document.createElement('td');

        explorerTableplace.innerHTML = explorer['explorer_place'];
        explorerTablefunFact.innerHTML = explorer['explorer_fun_fact'];
        explorerTablelanguage.innerHTML = explorer['explorer_language'];

        explorerTableRow.appendChild(explorerTableplace);
        explorerTableRow.appendChild(explorerTablefunFact);
        explorerTableRow.appendChild(explorerTablelanguage);

        table.appendChild(explorerTableRow);
      });

      const preExistingTable = document.getElementById('explorerInfo');
      if (preExistingTable) {
        preExistingTable.remove();
      }

      document.body.appendChild(table);
    });
}

window.onload = loadExplorerData;
