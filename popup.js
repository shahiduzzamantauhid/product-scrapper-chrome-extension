document.addEventListener('DOMContentLoaded', () => {
  const countButton = document.getElementById('count-products');
  const csvButton = document.getElementById('extract-products');
  const xlsxButton = document.getElementById('extract-products-xlsx');
  const productCount = document.getElementById('product-count');
  const productTable = document.getElementById('product-table');
  const loading = document.getElementById('loading');
  const tableBody = productTable.querySelector('tbody');
  const fileNameInput = document.getElementById('file-name');
  const messageArea = document.getElementById('message-area');

  let products = []; // Store products here

  // Function to get the website name from the current tab
  async function getWebsiteName() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      const url = new URL(tab.url);
      return url.hostname; // Extract the hostname (e.g., "supersupplys.com")
    }
    return null;
  }

  // Display the website name when the popup loads
  getWebsiteName().then((websiteName) => {
    if (websiteName) {
      document.getElementById('website-name').textContent = `${websiteName}`;
    } else {
      document.getElementById('website-name').textContent = 'Website name not available';
    }
  });

  async function sendMessageToContentScript(message) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    try {
      const response = await chrome.tabs.sendMessage(tab.id, message);
      return response;
    } catch (error) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
      });
      const response = await chrome.tabs.sendMessage(tab.id, message);
      return response;
    }
  }

  countButton.addEventListener('click', async () => {
    loading.classList.remove('hidden');
    productCount.textContent = '';
    tableBody.innerHTML = '';
    productTable.classList.add('hidden');

    try {
      const response = await sendMessageToContentScript({ action: 'countProducts' });
      loading.classList.add('hidden');
      if (response) {
        const { count, products: extractedProducts } = response;
        productCount.textContent = `Products found: ${count}`;
        products = extractedProducts;

        if (products.length > 0) {
          tableBody.innerHTML = products
            .map(
              (product) =>
                `<tr>
                  <td>${product.serialNo}</td>
                  <td>${product.title}</td>
                  <td>${product.regularPrice}</td>
                  <td>${product.salePrice}</td>
                  <td><a href="${product.link}" target="_blank">View Product</a></td>
                </tr>`
            )
            .join('');
          productTable.classList.remove('hidden');
          csvButton.disabled = false;
          xlsxButton.disabled = false;
        }
      }
    } catch (error) {
      loading.classList.add('hidden');
      console.error('Error counting products:', error);
    }
  });

  csvButton.addEventListener('click', () => {
    const fileName = fileNameInput.value.trim();
    if (!fileName) {
      showMessage('Please enter a file name.');
      return;
    }
    clearMessage();

    const csvContent = `Serial No,Title,Regular Price,Sale Price,Link\n${products
      .map((product) => `${product.serialNo},"${product.title}","${product.regularPrice}","${product.salePrice}","${product.link}"`)
      .join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  xlsxButton.addEventListener('click', () => {
    const fileName = fileNameInput.value.trim();
    if (!fileName) {
      showMessage('Please enter a file name.');
      return;
    }
    clearMessage();

    const worksheetData = products.map((product) => [
      product.serialNo,
      product.title,
      product.regularPrice,
      product.salePrice,
      product.link,
    ]);
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Serial No', 'Title', 'Regular Price', 'Sale Price', 'Link'],
      ...worksheetData,
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  });

  // Helper functions to handle messages
  function showMessage(message) {
    messageArea.textContent = message;
    messageArea.classList.remove('hidden');
  }

  function clearMessage() {
    messageArea.textContent = '';
    messageArea.classList.add('hidden');
  }
});