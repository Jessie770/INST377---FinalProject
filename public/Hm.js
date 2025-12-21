async function loadExplorerData() {
  await fetch('http://localhost:3000/explorers')
    .then((result) => result.json())
    .then((resultJson) => {
      console.log(resultJson);
    });
}

window.onload = loadExplorerData;



// async function createExplorer() {
//   await fetch(`/explorer`, {
//     method: 'POST',
//     body: JSON.stringify({
//       place: `${document.getElementById('place').value}`,
//       funFact: `${document.getElementById('funFact').value}`,
//       language: `${document.getElementById('language').value}`,
//     }),
//     headers: {
//       'content-type': 'application/json',
//     },
//   }).then((result) => result.json());

//   await loadExplorerData();
// }

// async function loadExplorerData() {
//   await fetch('/explorer')
//     .then((result) => result.json())
//     .then((resultJson) => {
//       const table = document.createElement('table');
//       table.setAttribute('id', 'explorerInfo');
//       const tableRow = document.createElement('tr');

//       const tableHeadingplace = document.createElement('th');
//       tableHeadingplace.innerHTML = 'place';

//       const tableHeadingfunFact = document.createElement('th');
//       tableHeadingfunFact.innerHTML = 'Fun Fact';

//       const tableHeadinglanguage = document.createElement('th');
//       tableHeadinglanguage.innerHTML = 'Language';

//       tableRow.appendChild(tableHeadingplace);
//       tableRow.appendChild(tableHeadingfunFact);
//       tableRow.appendChild(tableHeadinglanguage);

//       table.appendChild(tableRow);

//       // Adding Data to Table
//       resultJson.forEach((customer) => {
//         const customerTableRow = document.createElement('tr');
//         const customerTableplace = document.createElement('td');
//         const customerTablefunFact = document.createElement('td');
//         const customerTablelanguage = document.createElement('td');

//         customerTableplace.innerHTML = customer['explorer_place'];
//         customerTablefunFact.innerHTML = customer['explorer_fun_fact'];
//         customerTablelanguage.innerHTML = customer['explorer_language'];

//         customerTableRow.appendChild(customerTableplace);
//         customerTableRow.appendChild(customerTablefunFact);
//         customerTableRow.appendChild(customerTablelanguage);

//         table.appendChild(customerTableRow);
//       });

//       const preExistingTable = document.getElementById('explorerInfo');
//       if (preExistingTable) {
//         preExistingTable.remove();
//       }

//       document.body.appendChild(table);
//     });
// }

// window.onload = loadExplorerData;
