# Ecommerce Games

Ecommerce Games is an example e-commerce store project built to showcase my skills in integrating AWS S3 for file storage and Stripe for payment processing. The project also focuses on implementing security features to ensure a safe and reliable user experience.

## Project Features

- **AWS S3 Buckets**: Used for efficient and scalable file storage.
- **Stripe Integration**: Secure and seamless payment processing.
- **React**: Frontend built with a modern, component-based JavaScript framework.
- **Node.js & Express**: Backend built using Express.js with Node.js for a scalable and responsive server-side.
- **Security**: Utilized Helmet for enhanced security by setting various HTTP headers.

## Technologies Used

- **React**
- **Node.js**
- **Express.js**
- **AWS S3**
- **Stripe**
- **Helmet**

## Purpose

This project demonstrates my ability to build a full-stack application using industry-standard tools and best practices for e-commerce solutions.

# Stripe Test Cards

Below is a list of test cards that can be used to simulate different payment methods in Stripe. Use any 3-digit CVC (4 digits for American Express) and any future expiration date.

| Card Type                  | Number              | CVC          | Expiry          | Copy                                                                   |
| -------------------------- | ------------------- | ------------ | --------------- | ---------------------------------------------------------------------- |
| **Visa**                   | 4242424242424242    | Any 3 digits | Any future date | <button onclick="copyToClipboard('4242424242424242')">Copy</button>    |
| **Visa (debit)**           | 4000056655665556    | Any 3 digits | Any future date | <button onclick="copyToClipboard('4000056655665556')">Copy</button>    |
| **Mastercard**             | 5555555555554444    | Any 3 digits | Any future date | <button onclick="copyToClipboard('5555555555554444')">Copy</button>    |
| **Mastercard (2-series)**  | 2223003122003222    | Any 3 digits | Any future date | <button onclick="copyToClipboard('2223003122003222')">Copy</button>    |
| **Mastercard (debit)**     | 5200828282828210    | Any 3 digits | Any future date | <button onclick="copyToClipboard('5200828282828210')">Copy</button>    |
| **Mastercard (prepaid)**   | 5105105105105100    | Any 3 digits | Any future date | <button onclick="copyToClipboard('5105105105105100')">Copy</button>    |
| **American Express**       | 378282246310005     | Any 4 digits | Any future date | <button onclick="copyToClipboard('378282246310005')">Copy</button>     |
| **American Express**       | 371449635398431     | Any 4 digits | Any future date | <button onclick="copyToClipboard('371449635398431')">Copy</button>     |
| **Discover**               | 6011111111111117    | Any 3 digits | Any future date | <button onclick="copyToClipboard('6011111111111117')">Copy</button>    |
| **Discover**               | 6011000990139424    | Any 3 digits | Any future date | <button onclick="copyToClipboard('6011000990139424')">Copy</button>    |
| **Discover (debit)**       | 6011981111111113    | Any 3 digits | Any future date | <button onclick="copyToClipboard('6011981111111113')">Copy</button>    |
| **Diners Club**            | 3056930009020004    | Any 3 digits | Any future date | <button onclick="copyToClipboard('3056930009020004')">Copy</button>    |
| **Diners Club (14-digit)** | 36227206271667      | Any 3 digits | Any future date | <button onclick="copyToClipboard('36227206271667')">Copy</button>      |
| **BCcard and DinaCard**    | 6555900000604105    | Any 3 digits | Any future date | <button onclick="copyToClipboard('6555900000604105')">Copy</button>    |
| **JCB**                    | 3566002020360505    | Any 3 digits | Any future date | <button onclick="copyToClipboard('3566002020360505')">Copy</button>    |
| **UnionPay**               | 6200000000000005    | Any 3 digits | Any future date | <button onclick="copyToClipboard('6200000000000005')">Copy</button>    |
| **UnionPay (debit)**       | 6200000000000047    | Any 3 digits | Any future date | <button onclick="copyToClipboard('6200000000000047')">Copy</button>    |
| **UnionPay (19-digit)**    | 6205500000000000004 | Any 3 digits | Any future date | <button onclick="copyToClipboard('6205500000000000004')">Copy</button> |

<script>
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Copied to clipboard: ' + text);
}
</script>
