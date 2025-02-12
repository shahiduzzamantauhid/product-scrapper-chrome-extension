chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const hostname = window.location.hostname;

  if (hostname.includes('supersupplys.com')) {
    // Logic for Super Supply website
    if (message.action === 'countProducts' || message.action === 'extractProducts') {
      const productItems = document.querySelectorAll('.item-product'); // Super Supply product selector
      const products = Array.from(productItems).map((item, index) => {
        const title = item.querySelector('.product__title a')?.textContent.trim();
        const link = item.querySelector('.product__title a')?.href;

        // Extract regular price
        const regularPriceElement = item.querySelector('.product-price__price:not(.product-price__sale)');
        const regularPrice = regularPriceElement ? regularPriceElement.textContent.trim() : '0';

        // Extract sale price
        const salePriceElement = item.querySelector('.product-price__price.product-price__sale');
        const salePrice = salePriceElement ? salePriceElement.textContent.trim() : '0';

        return {
          serialNo: index + 1,
          title,
          regularPrice,
          salePrice,
          link,
        };
      });

      if (message.action === 'countProducts') {
        sendResponse({ count: products.length, products });
      } else if (message.action === 'extractProducts') {
        const csv = 'Serial No,Title,Regular Price,Sale Price,Link\n' +
          products.map((p) => `${p.serialNo},"${p.title}","${p.regularPrice}","${p.salePrice}","${p.link}"`).join('\n');
        sendResponse({ csv });
      }
    }
  } else if (hostname.includes('onewholesale.ca')) {
    // Logic for One Wholesale website
    if (message.action === 'countProducts' || message.action === 'extractProducts') {
      const productItems = document.querySelectorAll('.productitem__container'); // One Wholesale product selector
      const products = Array.from(productItems).map((item, index) => {
        const title = item.querySelector('.productitem--title a')?.textContent.trim();
        const link = item.querySelector('.productitem--title a')?.href;

        // Extract regular price
        const regularPriceElement = item.querySelector('.price__current--min');
        const regularPrice = regularPriceElement ? regularPriceElement.textContent.trim() : '0';

        // Extract sale price
        const salePriceElement = item.querySelector('.price__compare-at--min');
        const salePrice = salePriceElement ? salePriceElement.textContent.trim() : '0';

        return {
          serialNo: index + 1,
          title,
          regularPrice,
          salePrice,
          link,
        };
      });

      if (message.action === 'countProducts') {
        sendResponse({ count: products.length, products });
      } else if (message.action === 'extractProducts') {
        const csv = 'Serial No,Title,Regular Price,Sale Price,Link\n' +
          products.map((p) => `${p.serialNo},"${p.title}","${p.regularPrice}","${p.salePrice}","${p.link}"`).join('\n');
        sendResponse({ csv });
      }
    }
  } else if (hostname.includes('skybluewholesale.com')) {
    // Logic for skybluewholesale.com
    if (message.action === 'countProducts' || message.action === 'extractProducts') {
      const productItems = document.querySelectorAll('.item-box.product-grid');
      const products = Array.from(productItems).map((item, index) => {
        // Extract product details
        const titleElement = item.querySelector('.product_title a:nth-of-type(2)') || item.querySelector('.product_title a'); // Fallback to the first <a> if the second doesn't exist
        const title = titleElement?.textContent.trim();
        const regularPrice = item.querySelector('.product_price del')?.textContent.trim() || '0';
        const salePrice = item.querySelector('.product_price .actual-price')?.textContent.trim() || '0'; // Sale price is optional
        const link = titleElement?.href;
  
        return {
          serialNo: index + 1,
          title,
          regularPrice,
          salePrice,
          link,
        };
      });
  
      if (message.action === 'countProducts') {
        sendResponse({ count: products.length, products });
      } else if (message.action === 'extractProducts') {
        const csv = 'Serial No,Title,Regular Price,Sale Price,Link\n' +
          products.map((p) => `${p.serialNo},"${p.title}","${p.regularPrice}","${p.salePrice}","${p.link}"`).join('\n');
        sendResponse({ csv });
      }
    }
  }else if (hostname.includes('ntcashcarry.com')) {
    // Logic for ntcashcarry.com
    if (message.action === 'countProducts' || message.action === 'extractProducts') {
      const productItems = document.querySelectorAll('.content-product');
      const products = Array.from(productItems).map((item, index) => {
        // Extract product details
        const titleElement = item.querySelector('.product-title a');
        const title = titleElement?.textContent.trim();
        const regularPriceElement = item.querySelector('.price del .woocommerce-Price-amount bdi');
        const salePriceElement = item.querySelector('.price ins .woocommerce-Price-amount bdi') || item.querySelector('.price .woocommerce-Price-amount bdi');
        const regularPrice = regularPriceElement?.textContent.trim() || '0'; // Fallback if regular price is missing
        const salePrice = salePriceElement?.textContent.trim() || '0'; // Fallback if sale price is missing
        const link = titleElement?.href;
  
        return {
          serialNo: index + 1,
          title,
          regularPrice,
          salePrice,
          link,
        };
      });
  
      if (message.action === 'countProducts') {
        sendResponse({ count: products.length, products });
      } else if (message.action === 'extractProducts') {
        const csv = 'Serial No,Title,Regular Price,Sale Price,Link\n' +
          products.map((p) => `${p.serialNo},"${p.title}","${p.regularPrice}","${p.salePrice}","${p.link}"`).join('\n');
        sendResponse({ csv });
      }
    }
  }
  
  else {
    // Default response for unsupported websites
    sendResponse({ error: 'Unsupported website' });
  }
});