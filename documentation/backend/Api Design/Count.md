### API'S

#### Firm & Member Count


- `GET` /api/count
  - Request Header
    - `Authorization` - 8752c73cc93b90ecb8f7f7091cdf48b1413a5d2af31445a5227e21b9ce914938

  - Response
    - HTTP Status `200`
    ```json
    {
        "status": "OK",
        "errorMessage": "",
        "data": {
            "firmCount": 11,
            "memberCount": 3,
            "maleMemberCount": 2,
            "femaleMemberCount": 1
        }
    }
    ```
    ```


#### Api Counts by nokh


- `GET` /api/count/nokh
  - Request Header
    - `Authorization` - 8752c73cc93b90ecb8f7f7091cdf48b1413a5d2af31445a5227e21b9ce914938

  - Response
    - HTTP Status `200`
    ```json
    {
  "status": "OK",
  "errorMessage": "",
  "data": [
    {
      "_count": 14,
      "nokh": "BATHANI"
    },
    {
      "_count": 70,
      "nokh": "BHAGAT"
    }
    ]
  }
    ```

   ```

#### Api aggregated counts by dob


- `GET` /api/count/dob
  - Request Header
    - `Authorization` - 8752c73cc93b90ecb8f7f7091cdf48b1413a5d2af31445a5227e21b9ce914938

  - Response
    - HTTP Status `200`
    ```json
    {
  "status": "OK",
  "errorMessage": "",
  "data": [
    {
      "_count": 70,
    }
  ]
  }
  ```