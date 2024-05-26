### API'S

#### Firm

- `GET` /api/firm

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

- `POST` /api/firm

  - Request Body

    ```json
    {
      "firmName": "Narayan Saw Mill",
      "area": "Yelahanka",
      "pincode": 560090
    }
    ```

  - Response
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
        "firmId": 3,
        "firmName": "Narayan Saw Mill",
        "area": "Yelahanka",
        "pincode": 560090
      }
    }
    ```
