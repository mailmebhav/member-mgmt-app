### API'S

#### PaymentDetail

- `GET` /api/paymentdetail

  - Response
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": [
        {
          "paymentId": 1,
          "paymentMode": "Cash",
          "paymentFor": "Chitthi",
          "amount": 20000.5,
          "transactionId": "15",
          "receiptNumber": "45"
        }
      ]
    }
    ```

- `POST` /api/paymentdetail

  - Request Body

    ```json
    {
      "paymentMode": "Cash",
      "paymentFor": "Membership Fees",
      "amount": 11000.0,
      "transactionId": "101",
      "receiptNumber": "124"
    }
    ```

  - Response

    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
        "paymentId": 2,
        "paymentMode": "Cash",
        "paymentFor": "Membership Fees",
        "amount": 11000,
        "transactionId": "101",
        "receiptNumber": "124"
      }
    }
    ```
