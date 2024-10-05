### API'S

#### Firm

- `GET` `/api/firm/inactive`
  - __Description__ : **Returns only Inactive Firms**
  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5

  - Response
    - HTTP Status `200`
    ```json
    {
        "status": "OK",
        "errorMessage": "",
        "data": [
            {
                "firmId": 100,
                "firmName": "TEST",
                "area": "TEST",
                "pincode": 560092,
                "firmType": "Primary",
                "activeFirm": false
            }
        ]
    }
    ```

