# Product Extractor Chrome Extension

A powerful Chrome extension designed to extract product information from various wholesale websites. This extension helps users collect product data efficiently and export it in their preferred format.

## Features

- **Multi-Website Support**: Works with multiple wholesale websites including:

  - supersupplys.com
  - onewholesale.ca
  - skybluewholesale.com
  - ntcashcarry.com

- **Product Information Extraction**:

  - Product Title
  - Regular Price
  - Sale Price
  - Product Link
  - Automatic Serial Number Assignment

- **Real-Time Product Counting**:

  - Instantly count all products on the current page
  - Display results in an organized table view

- **Export Options**:
  - Export to CSV format
  - Export to XLSX (Excel) format
  - Custom file naming

## How to Use

1. **Installation**:

   - Install the extension from the Chrome Web Store
   - The extension icon will appear in your browser toolbar

2. **Using the Extension**:

   - Navigate to any supported wholesale website
   - Click the extension icon to open the popup interface
   - The current website name will be displayed at the top
   - Click "Count Products" to scan the current page
   - View the extracted products in the table

3. **Exporting Data**:
   - Enter a filename in the input field
   - Choose your preferred export format:
     - Click "Download CSV" for CSV format
     - Click "Download XLSX" for Excel format

## User Interface

- Clean and intuitive interface
- Real-time loading indicators
- Organized product table view
- Error messages for invalid operations
- Responsive design with smooth animations

## Technical Features

- Real-time product scanning
- Automatic content script injection
- Error handling and validation
- Support for different website structures
- Efficient data processing
- Compatible with modern Chrome versions

## File Structure

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.css` - Styling for the popup
- `popup.js` - Popup functionality
- `content.js` - Content script for product extraction
- `xlsx.full.min.js` - Excel export functionality
- Various icon files for extension branding

## Permissions Required

- Access to supported wholesale websites
- File download permissions for exporting data

## Notes

- The extension automatically adapts to different website layouts
- Products must be visible on the page to be extracted
- Internet connection required for proper functionality
