### API'S

#### Firm

- `GET` /api/firm
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
              "firmId": 1,
              "firmName": "Narayan Saw Mill",
              "area": "Yelahanka",
              "pincode": 560090,
              "firmType": null,
              "activeFirm": true
          },
          {
              "firmId": 2,
              "firmName": "Velani Saw Mill",
              "area": "Yelahanka",
              "pincode": 560090,
              "firmType": null,
              "activeFirm": true
          },
          {
              "firmId": 3,
              "firmName": "JK Saw Mill",
              "area": "Yelahanka",
              "pincode": 560090,
              "firmType": null,
              "activeFirm": true
          }
      ]
    }
    ```

- `POST` /api/firm

  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5

  - Request Body
    - HTTP Status `201`
    ```json
    {
      "firmName": "JK Saw Mill",
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
          "firmId": 11,
          "firmName": "JK Saw Mill",
          "area": "Yelahanka",
          "pincode": 560090,
          "firmType": "Primary",
          "activeFirm": true
      }
    }
    ```

- `PUT` /api/firm

  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5

  - Request Body
    - HTTP Status `200`
    ```json
    {
      "firmId": 11,
      "firmName": "JK Saw Mill & Sons",
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
          "firmId": 11,
          "firmName": "JK Saw Mill & Sons",
          "area": "Yelahanka",
          "pincode": 560090,
          "firmType": "Primary",
          "activeFirm": true
      }
    }
    ```

- `DELETE` /api/firm

  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5

  - Request Body
    - HTTP Status `200`
    ```json
    {
      "firmId": 12,
      "firmName": "JK Saw Mill",
      "area": "Yelahanka",
      "pincode": 560090
    }
    ```

  - Response
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": " Firm ID: 12 Firm Name: JK Saw Mill Deleted successfully"
    }
    ```