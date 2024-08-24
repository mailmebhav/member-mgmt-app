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